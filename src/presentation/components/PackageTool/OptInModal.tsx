"use client";

import React, { useState } from "react";
import { PackageItem } from "../../../domain/package/PackageTypes";
import FMRBenefitWidget from "./FMRBenefitWidget";
import { 
  X, 
  Calendar, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Info
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface OptInModalProps {
  pkg: PackageItem;
  vcNumber: string;
  smsId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OptInModal({
  pkg,
  vcNumber,
  smsId,
  onClose,
  onSuccess,
}: OptInModalProps) {
  const { theme } = useAgentStore();
  const [consentGiven, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/packages/opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          packageId: pkg.id,
          scheduledDate: startDate,
          consentGiven,
        }),
      });
      if (res.ok) {
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const isConsentRequired = pkg.requiresConsent;
  const canConfirm = !isConsentRequired || consentGiven;

  return (
    <div className={cn(
      "absolute inset-0 z-[100] backdrop-blur-md animate-in fade-in slide-in-from-right duration-300 flex flex-col",
      theme === 'dark' ? "bg-[#0B0F1A]/95 text-slate-200" : "bg-white/95 text-slate-900"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 border-b border-white/10 flex items-center justify-between",
        theme === 'dark' ? "bg-white/[0.02]" : "bg-slate-50"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center border border-orange-500/20">
            <Zap size={20} className="text-orange-500" />
          </div>
          <div>
            <h2 className={cn(
              "text-sm font-bold uppercase tracking-tight",
              theme === 'dark' ? "text-slate-100" : "text-slate-900"
            )}>Activate Package</h2>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{pkg.name}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-slate-500 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {/* Pricing Summary */}
        <div className={cn(
          "p-4 rounded-2xl border flex items-center justify-between",
          theme === 'dark' ? "bg-white/[0.03] border-white/5" : "bg-slate-50 border-slate-200"
        )}>
           <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Monthly Cost</div>
              <div className="text-xl font-mono font-bold text-orange-500">₹{pkg.price}.00</div>
           </div>
           <div className="text-right space-y-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Plan Type</div>
              <div className={cn(
                "text-xs font-bold uppercase",
                theme === 'dark' ? "text-slate-300" : "text-slate-700"
              )}>{pkg.category}</div>
           </div>
        </div>

        {/* FMR Projections (Module 15 Upsell) */}
        <div className="space-y-2">
           <div className="flex items-center gap-2 px-1">
              <Info size={12} className="text-blue-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">FMR Benefits Projection</span>
           </div>
           <FMRBenefitWidget smsId={smsId} schemeId={pkg.id} />
        </div>

        {/* Configuration */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Activation Date</label>
            <div className="relative">
              <input 
                type="date" 
                className={cn(
                  "w-full border rounded-xl py-3 px-4 text-xs outline-none focus:border-orange-500/50 transition-all",
                  theme === 'dark' ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
                )}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {isConsentRequired && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 animate-in shake-1 duration-500">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-amber-500 shrink-0" size={18} />
                <p className="text-[11px] text-amber-600 leading-relaxed font-medium">
                  This plan requires <span className="font-bold underline uppercase">mandatory verbal consent</span> from the subscriber before activation.
                </p>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="accent-orange-500 w-4 h-4 rounded border-white/20 bg-transparent"
                  checked={consentGiven}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span className={cn(
                  "text-xs transition-colors",
                  theme === 'dark' ? "text-slate-200 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"
                )}>I confirm verbal consent has been captured</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className={cn(
        "p-6 border-t border-white/10",
        theme === 'dark' ? "bg-white/[0.01]" : "bg-slate-50"
      )}>
        <button 
          onClick={handleConfirm}
          disabled={!canConfirm || loading}
          className={cn(
            "w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-tighter transition-all shadow-2xl",
            !canConfirm || loading
              ? (theme === 'dark' ? "bg-slate-800 text-slate-600 cursor-not-allowed" : "bg-slate-200 text-slate-400 cursor-not-allowed")
              : "bg-orange-600 text-white shadow-orange-600/20 hover:bg-orange-500 active:scale-95"
          )}
        >
          {loading ? "Processing..." : "Authorize Activation"}
          {!loading && <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
}
