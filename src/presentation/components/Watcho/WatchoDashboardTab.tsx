"use client";

import React, { useState, useEffect } from "react";
import { WatchoSubscriber, OTTPlan } from "../../../domain/watcho/WatchoTypes";
import OTTPlanWizard from "./OTTPlanWizard";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { Smartphone, PlayCircle, CheckCircle2, XCircle, Zap, ShieldCheck, Clock, ArrowRight } from "lucide-react";

interface WatchoDashboardTabProps {
  vcNumber: string;
}

export default function WatchoDashboardTab({ vcNumber }: WatchoDashboardTabProps) {
  const [sub, setSub] = useState<WatchoSubscriber | null>(null);
  const [plans, setPlans] = useState<OTTPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const { theme } = useAgentStore();

  useEffect(() => {
    fetchData();
  }, [vcNumber]);

  const fetchData = async () => {
    setLoading(true);
    const [subRes, planRes] = await Promise.all([
      fetch(`/api/watcho/subscriber?vcNumber=${vcNumber}`),
      fetch("/api/watcho/plans")
    ]);

    if (subRes.ok) setSub(await subRes.json());
    if (planRes.ok) setPlans(await planRes.json());
    setLoading(false);
  };

  const handleToggleAutoRenewal = async () => {
    if (!sub) return;
    const res = await fetch("/api/watcho/subscriber", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        action: "toggleAutoRenewal", 
        vcNumber, 
        enabled: !sub.isAutoRenewalEnabled 
      })
    });
    if (res.ok) fetchData();
  };

  if (loading) return (
    <div className="p-8 text-center animate-pulse space-y-3">
      <Smartphone className="mx-auto text-slate-700 w-10 h-10" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Loading Watcho Experience...</p>
    </div>
  );

  const currentPlan = plans.find(p => p.id === sub?.currentPlanId);
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      isDark ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 border-b flex items-center justify-between",
        isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center border border-emerald-500/20">
            <Smartphone size={20} className="text-emerald-500" />
          </div>
          <div>
            <h3 className={cn("text-xs font-black uppercase tracking-widest", isDark ? "text-slate-200" : "text-slate-800")}>
              Watcho OTT Management
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              Watcho SMSID: {sub?.ottSmsId || "Not Registered"}
            </p>
          </div>
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase",
          sub?.status === "ACTIVE" 
            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
            : "bg-slate-500/10 text-slate-500 border border-slate-500/20"
        )}>
          {sub?.status || "INACTIVE"}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Subscription Detail Card */}
          <div className={cn(
            "p-5 rounded-2xl border space-y-4",
            isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h4 className={cn("text-[10px] font-black text-slate-500 uppercase tracking-widest px-1", isDark ? "text-slate-500" : "text-slate-400")}>
              Subscription Details
            </h4>
            
            {sub?.status === "ACTIVE" && currentPlan ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className={cn("text-lg font-black tracking-tight", isDark ? "text-slate-100" : "text-slate-900")}>
                      {currentPlan.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
                      {currentPlan.description}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
                    <Zap size={24} fill="currentColor" />
                  </div>
                </div>

                <div className={cn(
                  "p-3 rounded-xl border flex items-center justify-between",
                  isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
                )}>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    <Clock size={12} /> Valid Until
                  </div>
                  <div className={cn("text-xs font-black font-mono", isDark ? "text-slate-200" : "text-slate-800")}>
                    {new Date(sub.expiryDate!).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Bundled Ecosystem</div>
                  <div className="flex flex-wrap gap-2">
                    {currentPlan.bundledApps.map(app => (
                      <span key={app} className={cn(
                        "px-2 py-1 rounded text-[9px] font-black uppercase tracking-tighter",
                        isDark ? "bg-white/5 text-slate-400 border border-white/5" : "bg-slate-50 text-slate-600 border border-slate-100"
                      )}>
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto border border-white/5">
                  <PlayCircle className="text-slate-700" size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500">No active Watcho subscription found.</p>
                  <p className="text-[10px] text-slate-600 max-w-[200px] mx-auto">Explore multi-app bundles and premium OTT content.</p>
                </div>
                <button 
                  onClick={() => setShowWizard(true)}
                  className="px-6 py-2.5 rounded-xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/20"
                >
                  Explore Plans 🚀
                </button>
              </div>
            )}
          </div>

          {/* Auto-Renewal / SI Card */}
          <div className={cn(
            "p-5 rounded-2xl border space-y-4",
            isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h4 className={cn("text-[10px] font-black text-slate-500 uppercase tracking-widest px-1", isDark ? "text-slate-500" : "text-slate-400")}>
              Payment Control
            </h4>
            
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              Enable Standing Instruction for seamless monthly renewals via your linked payment method.
            </p>

            <div className={cn(
              "p-4 rounded-xl border flex items-center justify-between",
              isDark ? "bg-white/[0.01] border-white/5" : "bg-slate-50 border-slate-100"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center border",
                  sub?.isAutoRenewalEnabled 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                    : "bg-slate-500/10 border-slate-500/20 text-slate-500"
                )}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className={cn("text-[11px] font-black uppercase tracking-tight", isDark ? "text-slate-200" : "text-slate-800")}>
                    Standing Instruction
                  </div>
                  <div className={cn(
                    "text-[9px] font-bold uppercase",
                    sub?.isAutoRenewalEnabled ? "text-emerald-500" : "text-slate-500"
                  )}>
                    {sub?.isAutoRenewalEnabled ? "ENABLED" : "DISABLED"}
                  </div>
                </div>
              </div>

              <button 
                onClick={handleToggleAutoRenewal}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-all duration-300 relative",
                  sub?.isAutoRenewalEnabled ? "bg-emerald-600" : "bg-slate-700"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-white transition-all duration-300",
                  sub?.isAutoRenewalEnabled ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>
            
            <div className={cn(
              "p-3 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest",
              sub?.isAutoRenewalEnabled ? "text-emerald-500/70" : "text-slate-600"
            )}>
              {sub?.isAutoRenewalEnabled 
                ? "● Active: Monthly recurring billing enabled." 
                : "○ Inactive: Manual renewal required."}
            </div>
          </div>
        </div>
      </div>

      {showWizard && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="h-full ml-auto w-full max-w-md animate-in slide-in-from-right duration-300">
            <OTTPlanWizard 
              vcNumber={vcNumber}
              plans={plans}
              onClose={() => setShowWizard(false)}
              onSuccess={() => {
                setShowWizard(false);
                fetchData();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
