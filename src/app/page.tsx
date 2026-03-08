"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../presentation/layouts/Sidebar/Sidebar";
import Header from "../presentation/layouts/Header/Header";
import UnifiedTimeline from "../presentation/components/Timeline/UnifiedTimeline";
import ActionModals from "../presentation/components/ActionModals/ActionModals";
import SubscriberCard from "../presentation/components/SubscriberProfile/SubscriberCard";
import DTHServiceCard from "../presentation/components/ServiceCards/DTHServiceCard";
import WatchoServiceCard from "../presentation/components/ServiceCards/WatchoServiceCard";
import DisambiguationModal from "../presentation/components/DisambiguationModal/DisambiguationModal";
import GoMultiPanel from "../presentation/components/GoMultiPanel/GoMultiPanel";
import { Interaction, ServiceRequest } from "../domain/interaction/Interaction";
import { OutboundCampaignEntry } from "../domain/call/CallHandlingTypes";
import {
  SearchType,
  SearchSubsDetails,
  GoMultiResult,
} from "../domain/customer/SubscriberSearchTypes";
import BottomToolbar from "../presentation/components/QuickActions/BottomToolbar";
import RechargeWorkflowPanel from "../presentation/components/Recharge/RechargeWorkflowPanel";
import ChurnAlertBanner from "../presentation/components/Recharge/ChurnAlertBanner";
import AgentGlobalToolbar from "../presentation/components/CallHandling/AgentGlobalToolbar";
import MOTDBanner from "../presentation/components/SubscriberProfile/MOTDBanner";
import { useAgentStore } from "../store/useAgentStore";
import ActionDrawer from "../presentation/components/Drawers/ActionDrawer";
import RightIconBar from "../presentation/layouts/UtilityBar/RightIconBar";
import { Zap, LayoutGrid, ListFilter, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

export default function Customer360Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRecharge, setShowRecharge] = useState(false);

  // Zustand Store
  const { 
    activeCustomer, 
    setActiveCustomer, 
    isCallerVerified, 
    setCallerVerified,
    isRightPanelOpen,
    isDrawerExpanded,
    theme
  } = useAgentStore();

  const [goMulti, setGoMulti] = useState<GoMultiResult | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [outboundCampaigns, setOutboundCampaigns] = useState<OutboundCampaignEntry[]>([]);

  const [multiMatchCandidates, setMultiMatchCandidates] = useState<SearchSubsDetails[] | null>(null);
  const [multiMatchSearchValue, setMultiMatchSearchValue] = useState("");

  const handleSearch = async (searchType: SearchType, searchBy: string) => {
    setLoading(true);
    setError("");
    setMultiMatchCandidates(null);
    setActiveCustomer(null);
    setGoMulti(null);

    try {
      const params = new URLSearchParams({ searchType, searchBy, agentId: "AGENT_001" });
      const res = await fetch(`/api/customer?${params}`);

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Customer not found");
      }

      const data = await res.json();

      if (data.type === "multi_match") {
        setMultiMatchCandidates(data.candidates);
        setMultiMatchSearchValue(searchBy);
        return;
      }

      setActiveCustomer(data.subscriber);
      setCallerVerified(data.subscriber.callerContext?.callerMobType === "RMN");
      setGoMulti(data.goMulti ?? null);
      setInteractions(data.history?.interactions ?? []);
      setServiceRequests(data.history?.serviceRequests ?? []);
      setOutboundCampaigns(data.history?.outboundCampaigns ?? []);

      await fetch("/api/agent/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: "AGENT_001", vcNo: data.subscriber.vcNumber })
      });
    } catch (err: any) {
      setError(err.message ?? "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleDisambiguationSelect = (vcNumber: string) => {
    setMultiMatchCandidates(null);
    handleSearch("VC", vcNumber);
  };

  // Sync theme to document for portals
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    handleSearch("VC", "02563029393");
  }, []);

  return (
    <div 
      className={cn(
        "h-screen overflow-hidden grid transition-all duration-500 ease-in-out",
        theme === 'dark' ? "bg-[#0B0F1A] text-slate-200" : "bg-slate-50 text-slate-900"
      )}
      style={{
        gridTemplateColumns: `64px 1fr ${isRightPanelOpen ? (isDrawerExpanded ? '500px' : '320px') : '0px'} 44px`
      }}
    >
      {/* PANEL 1: SLIM NAV */}
      <Sidebar onRecharge={() => setShowRecharge(true)} />

      {/* PANEL 2: CENTER CANVAS */}
      <main className="crm-main relative border-r border-white/5 flex flex-col h-full overflow-hidden">
        <AgentGlobalToolbar />
        <Header
          onSearch={handleSearch}
          isLoading={loading}
          callerVerified={isCallerVerified}
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {error && (
            <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {activeCustomer && !loading && (
            <div className="flex flex-col gap-6 p-6 pb-32">
              {/* Contextual Awareness Layer */}
              <div className="flex flex-col gap-3">
                <MOTDBanner smsId={activeCustomer.smsId} />
                <ChurnAlertBanner smsId={activeCustomer.smsId} />
              </div>

              {/* Action Triggers Layer */}
              <ActionModals />

              {/* Subscriber 360 Core Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-5 h-full">
                  <SubscriberCard customer={activeCustomer} />
                </div>
                <div className="lg:col-span-4 h-full">
                  <DTHServiceCard customer={activeCustomer} />
                </div>
                <div className="lg:col-span-3 h-full">
                  <WatchoServiceCard customer={activeCustomer} />
                </div>
              </div>

              {/* Hierarchy Layer */}
              {goMulti && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <GoMultiPanel goMulti={goMulti} currentVCNo={activeCustomer.vcNumber} />
                </div>
              )}

              {/* Interaction Intelligence Layer */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase flex items-center gap-2">
                    <ListFilter size={14} className="text-orange-500" /> UNIFIED HISTORY
                  </h3>
                  <div className="flex gap-2">
                    <button className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase">Expand All</button>
                    <div className="w-px h-3 bg-white/10" />
                    <button className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase">Export Audit</button>
                  </div>
                </div>
                
                <div className="glass-card rounded-2xl overflow-hidden border-white/5 shadow-2xl min-h-[500px]">
                  <UnifiedTimeline 
                    interactions={interactions} 
                    serviceRequests={serviceRequests} 
                    outboundCampaigns={outboundCampaigns}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="fixed bottom-6 left-[60%] -translate-x-1/2 z-40 transition-all duration-300 hover:scale-105">
           <BottomToolbar />
        </div>
      </main>

      {/* PANEL 3: ACTION DRAWER (AI + TOOLS) */}
      <aside className={cn(
        "flex flex-col transition-all duration-500 border-l border-white/5",
        theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white",
        !isRightPanelOpen && "opacity-0 overflow-hidden"
      )}>
        <ActionDrawer />
      </aside>

      {/* MODALS & OVERLAYS */}
      {multiMatchCandidates && (
        <DisambiguationModal
          candidates={multiMatchCandidates}
          searchValue={multiMatchSearchValue}
          onSelect={handleDisambiguationSelect}
          onClose={() => setMultiMatchCandidates(null)}
        />
      )}

      {showRecharge && activeCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <RechargeWorkflowPanel 
            vcNumber={activeCustomer.vcNumber} 
            smsId={activeCustomer.smsId} 
            onClose={() => setShowRecharge(false)} 
          />
        </div>
      )}

      <RightIconBar />
    </div>
  );
}
