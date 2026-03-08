"use client";

import React, { useState } from "react";
import { useAgentStore } from "../../../store/useAgentStore";
import { 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  HelpCircle,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface KycVerificationProps {
  onSuccess?: () => void;
}

export default function KycVerification({ onSuccess }: KycVerificationProps) {
  const { activeCustomer, setKycStatus, kycStatus, theme } = useAgentStore();
  const [pinCode, setPinCode] = useState("");
  const [lastRecharge, setLastRecharge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verification/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber: activeCustomer?.vcNumber,
          answers: {
            pinCode,
            lastRechargeAmount: lastRecharge ? Number(lastRecharge) : undefined,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.status === "WOB") {
          setKycStatus("WOB");
        } else {
          setError(data.error || "Verification failed.");
        }
      } else {
        if (data.status === "VERIFIED") {
          setKycStatus("VERIFIED");
          onSuccess?.();
        } else {
          setError("Verification failed.");
        }
      }
    } catch (err: any) {
      setError("Communication error.");
    } finally {
      setLoading(false);
    }
  };

  if (kycStatus === "WOB") {
    return (
      <div className={cn(
        "p-6 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-300",
        theme === 'dark' ? "text-slate-200" : "text-slate-800"
      )}>
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
          <ShieldAlert size={32} className="text-rose-500" />
        </div>
        <div className="space-y-2">
          <h2 className={cn(
            "text-sm font-bold uppercase tracking-tight",
            theme === 'dark' ? "text-slate-100" : "text-slate-900"
          )}>Security Lock (WOB)</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
            This account has exceeded KYC attempts. <span className="text-rose-400 font-bold underline">Physical verification</span> is now mandatory.
          </p>
        </div>
        <div className={cn(
          "w-full p-3 rounded-xl border text-[10px] font-bold text-slate-400 text-left",
          theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200"
        )}>
          <div className="flex items-center gap-2 mb-1 text-rose-500">
            <Lock size={12} /> RESTRICTED ACTIONS:
          </div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Package Modification</li>
            <li>Address Update</li>
            <li>Financial Transfers</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "p-6 flex flex-col h-full transition-colors duration-500",
      theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      <div className="mb-6 space-y-2 text-center">
        <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center mx-auto border border-orange-500/20">
          <ShieldCheck size={24} className="text-orange-500" />
        </div>
        <h2 className={cn(
          "text-xs font-black uppercase tracking-widest",
          theme === 'dark' ? "text-slate-200" : "text-slate-800"
        )}>Security Challenge</h2>
        <p className="text-[10px] text-slate-500">Verify two data points with the caller</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-500 flex items-center gap-2 animate-in slide-in-from-top-2">
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-1">
            Registered PIN Code <HelpCircle size={10} />
          </label>
          <input 
            type="text"
            className={cn(
              "w-full border rounded-xl py-2.5 px-4 text-xs outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-700",
              theme === 'dark' ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
            )}
            placeholder="e.g. 110017"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-1 flex items-center gap-1">
            Last Recharge Amount <HelpCircle size={10} />
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-bold">₹</span>
            <input 
              type="number"
              className={cn(
                "w-full border rounded-xl py-2.5 pl-8 pr-4 text-xs outline-none focus:border-orange-500/50 transition-all placeholder:text-slate-700",
                theme === 'dark' ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
              )}
              placeholder="0.00"
              value={lastRecharge}
              onChange={(e) => setLastRecharge(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading || (!pinCode && !lastRecharge)}
          className={cn(
            "w-full py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-tighter transition-all group",
            loading || (!pinCode && !lastRecharge)
              ? (theme === 'dark' ? "bg-slate-800 text-slate-600 cursor-not-allowed" : "bg-slate-200 text-slate-400 cursor-not-allowed")
              : "bg-orange-600 text-white shadow-lg shadow-orange-600/20 hover:bg-orange-500"
          )}
        >
          {loading ? "Verifying..." : "Confirm Verification"}
          {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className={cn(
          "p-3 rounded-xl border space-y-2",
          theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
        )}>
          <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Why is this required?</div>
          <p className="text-[10px] text-slate-500 leading-snug">
            Security policy <span className="text-slate-400 italic underline">KYC-2026</span> requires verbal verification for all high-risk account operations.
          </p>
        </div>
      </div>
    </div>
  );
}
