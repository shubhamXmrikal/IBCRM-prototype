"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "../../../domain/customer/Customer";
import { WatchoSubscriber, OTTPlan } from "../../../domain/watcho/WatchoTypes";
import { 
  Tv, 
  Smartphone, 
  PlayCircle, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Zap,
  Activity
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface WatchoServiceCardProps {
  customer: Customer;
}

export default function WatchoServiceCard({ customer }: WatchoServiceCardProps) {
  const { setActiveActionDrawer, toggleRightPanel, theme } = useAgentStore();
  const [sub, setSub] = useState<WatchoSubscriber | null>(null);
  const [plans, setPlans] = useState<OTTPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [subRes, planRes] = await Promise.all([
          fetch(`/api/watcho/subscriber?vcNumber=${customer.vcNumber}`),
          fetch("/api/watcho/plans")
        ]);

        if (subRes.ok) setSub(await subRes.json());
        if (planRes.ok) setPlans(await planRes.json());
      } catch (e) {
        console.error("Error fetching watcho summary", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [customer.vcNumber]);

  const handleManage = () => {
    setActiveActionDrawer('WATCHO');
    toggleRightPanel(true);
  };

  const isActive = sub?.status === "ACTIVE";
  const currentPlan = plans.find(p => p.id === sub?.currentPlanId);
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "glass-card rounded-2xl overflow-hidden flex flex-col h-full border shadow-xl group transition-all duration-500",
      isDark ? "border-white/5" : "bg-white border-slate-200"
    )}>
      {/* Header */}
      <div className={cn(
        "p-3 border-b flex items-center justify-between",
        isDark ? "border-white/5 bg-white/[0.02]" : "bg-slate-50 border-slate-100"
      )}>
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center">
             <Smartphone size={16} className="text-emerald-500" />
           </div>
           <span className={cn(
             "text-xs font-bold tracking-widest uppercase",
             isDark ? "text-slate-300" : "text-slate-700"
           )}>Watcho OTT</span>
        </div>
        
        {loading ? (
          <Activity size={12} className="text-slate-500 animate-spin" />
        ) : (
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
            isActive 
              ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
              : "text-slate-500 bg-white/5 border-white/10"
          )}>
            {isActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
            {isActive ? "ACTIVE" : "INACTIVE"}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Active Plan */}
        <div className={cn(
          "rounded-xl p-3 border relative overflow-hidden",
          isDark ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100 shadow-inner"
        )}>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current OTT Plan</div>
          {loading ? (
            <div className="h-10 animate-pulse bg-white/5 rounded-lg" />
          ) : isActive && currentPlan ? (
            <>
              <div className={cn("text-sm font-bold mb-1", isDark ? "text-slate-100" : "text-slate-900")}>
                {currentPlan.name}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-500 font-bold">{currentPlan.bundledApps.length} Apps Bundled</span>
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-[10px] text-slate-500">Auto-Renewal: {sub.isAutoRenewalEnabled ? "ON" : "OFF"}</span>
              </div>
            </>
          ) : (
            <div className="text-xs text-slate-600 italic py-1">No active subscription found.</div>
          )}
        </div>

        {/* App Logos (Simulated) */}
        <div className="space-y-2">
           <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-1">Included Premium Apps</div>
           <div className={cn(
             "flex gap-2 flex-wrap transition-all duration-500",
             isActive ? "opacity-100 grayscale-0" : "opacity-40 grayscale"
           )}>
              {isActive && currentPlan ? (
                currentPlan.bundledApps.slice(0, 4).map(app => (
                  <AppIcon key={app} label={app} theme={theme} />
                ))
              ) : (
                <>
                  <AppIcon label="Disney+" theme={theme} />
                  <AppIcon label="Zee5" theme={theme} />
                  <AppIcon label="SonyLIV" theme={theme} />
                  <AppIcon label="Hotstar" theme={theme} />
                </>
              )}
           </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className={cn(
        "mt-auto p-2 border-t",
        isDark ? "border-white/5" : "border-slate-100"
      )}>
        <button 
          onClick={handleManage}
          disabled={loading}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest shadow-lg active:scale-95",
            isActive 
              ? (isDark ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200")
              : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20"
          )}
        >
          {isActive ? (
            <><PlayCircle size={12} className="text-emerald-500" /> Manage Apps</>
          ) : (
            <><Zap size={12} fill="white" strokeWidth={0} /> Upgrade to Watcho Max</>
          )}
        </button>
      </div>
    </div>
  );
}

function AppIcon({ label, theme }: { label: string, theme: string }) {
  const isDark = theme === 'dark';
  return (
    <div className={cn(
      "px-2 py-1 rounded text-[9px] font-bold",
      isDark ? "bg-white/5 border border-white/5 text-slate-400" : "bg-white border border-slate-200 text-slate-600 shadow-sm"
    )}>
      {label}
    </div>
  );
}
