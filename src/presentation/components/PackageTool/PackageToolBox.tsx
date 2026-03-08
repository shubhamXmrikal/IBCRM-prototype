"use client";

import React, { useState, useEffect } from "react";
import {
  PackageItem,
  SubscriberSubscription,
  RollbackHistory,
} from "../../../domain/package/PackageTypes";
import CatalogueGrid from "./CatalogueGrid";
import OptInModal from "./OptInModal";
import OptOutModal from "./OptOutModal";
import RollbackPanel from "./RollbackPanel";
import ChannelEntitlementModal from "./ChannelEntitlementModal";
import SummerTicketBanner from "./SummerTicketBanner";
import FestiveOffersTab from "./FestiveOffersTab";
import KittyRedemptionPanel from "./KittyRedemptionPanel";
import { 
  Package, 
  Layers, 
  LayoutGrid, 
  History, 
  ArrowLeftRight,
  Sparkles
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface PackageToolBoxProps {
  vcNumber: string;
  smsId: string;
}

export default function PackageToolBox({
  vcNumber,
  smsId,
}: PackageToolBoxProps) {
  const { theme } = useAgentStore();
  const [catalogue, setCatalogue] = useState<PackageItem[]>([]);
  const [activeSubs, setActiveSubs] = useState<SubscriberSubscription[]>([]);
  const [rollbackEligible, setRollbackEligible] = useState<RollbackHistory | null>(null);
  const [loading, setLoading] = useState(true);

  const [optInPkg, setOptInPkg] = useState<PackageItem | null>(null);
  const [optOutSub, setOptOutSub] = useState<SubscriberSubscription | null>(null);
  const [showChannels, setShowChannels] = useState(false);
  const [activeSection, setActiveSection] = useState<'CATALOGUE' | 'HISTORY' | 'OFFERS'>('CATALOGUE');

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/packages/catalogue?vcNumber=${vcNumber}`);
      const data = await res.json();
      if (res.ok) {
        setCatalogue(data.catalogue);
        setActiveSubs(data.active);
        setRollbackEligible(data.rollbackEligibility);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vcNumber) fetchPackages();
  }, [vcNumber]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4 animate-pulse">
      <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
        <Package className="text-slate-700" />
      </div>
      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Scanning Catalogue...</p>
    </div>
  );

  return (
    <div className={cn(
      "flex flex-col h-full",
      theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      {/* High-Impact Top Banner */}
      <SummerTicketBanner smsId={smsId} />

      {/* Tabs / Selector */}
      <div className="px-4 py-3 border-b border-white/5 flex gap-1 bg-white/[0.01]">
        <TabButton 
          active={activeSection === 'CATALOGUE'} 
          onClick={() => setActiveSection('CATALOGUE')}
          icon={LayoutGrid}
          label="Catalogue"
        />
        <TabButton 
          active={activeSection === 'OFFERS'} 
          onClick={() => setActiveSection('OFFERS')}
          icon={Sparkles}
          label="Offers"
        />
        <TabButton 
          active={activeSection === 'HISTORY'} 
          onClick={() => setActiveSection('HISTORY')}
          icon={History}
          label="History"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide pb-20">
        {/* Section 1: Active Subscriptions (Always Visible Header) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Layers size={14} className="text-orange-500" /> Active Subscriptions
            </h3>
            <button 
              onClick={() => setShowChannels(true)}
              className="text-[9px] font-bold text-orange-500 hover:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded transition-all uppercase tracking-tighter"
            >
              View Channels 📺
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {activeSubs.map((sub) => {
              const pkgDetails = [...catalogue].find(p => p.id === sub.packageId);
              const isPending = sub.status.includes('PENDING');
              
              return (
                <div key={sub.id} className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center border",
                      isPending ? "bg-amber-500/10 border-amber-500/20" : "bg-emerald-500/10 border-emerald-500/20"
                    )}>
                      <Package size={16} className={isPending ? "text-amber-500" : "text-emerald-500"} />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-200">{pkgDetails?.name || sub.packageId}</div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[9px] font-bold px-1 rounded uppercase tracking-tighter",
                          isPending ? "text-amber-500" : "text-emerald-500"
                        )}>
                          {sub.status}
                        </span>
                        {sub.scheduledOptOutDate && (
                          <span className="text-[9px] text-slate-500 italic">Ends: {new Date(sub.scheduledOptOutDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setOptOutSub(sub)}
                    disabled={sub.status === "PENDING_DEACTIVATION"}
                    className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-600 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  >
                    <ArrowLeftRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          {rollbackEligible && (
            <div className="animate-in slide-in-from-top-2">
              <RollbackPanel vcNumber={vcNumber} rollbackEligible={rollbackEligible} onRollbackSuccess={fetchPackages} />
            </div>
          )}
        </div>

        {/* Section 2: Catalogue Grid */}
        {activeSection === 'CATALOGUE' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="px-1">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available Plans</h3>
            </div>
            <CatalogueGrid catalogue={catalogue} onOptIn={(pkg) => setOptInPkg(pkg)} />
          </div>
        )}

        {/* Section 3: Offers & Loyalty (Module 07 Integration) */}
        {activeSection === 'OFFERS' && (
          <div className="space-y-6 animate-in fade-in duration-500">
             <KittyRedemptionPanel vcNumber={vcNumber} />
             <FestiveOffersTab vcNumber={vcNumber} />
          </div>
        )}
      </div>

      {/* Modals Layer */}
      {optInPkg && (
        <OptInModal
          pkg={optInPkg}
          vcNumber={vcNumber}
          smsId={smsId}
          onClose={() => setOptInPkg(null)}
          onSuccess={() => {
            setOptInPkg(null);
            fetchPackages();
          }}
        />
      )}

      {optOutSub && (
        <OptOutModal
          sub={optOutSub}
          onClose={() => setOptOutSub(null)}
          onSuccess={() => {
            setOptOutSub(null);
            fetchPackages();
          }}
        />
      )}

      {showChannels && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
           <ChannelEntitlementModal onClose={() => setShowChannels(false)} />
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest border",
        active 
          ? "bg-orange-600/10 border-orange-500/20 text-orange-500 shadow-lg shadow-orange-600/5" 
          : "bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10"
      )}
    >
      <Icon size={12} className={active ? "text-orange-500" : "text-slate-600"} />
      {label}
    </button>
  );
}
