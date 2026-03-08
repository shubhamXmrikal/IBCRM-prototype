"use client";

import React, { useState } from "react";
import { SubscriberSubscription } from "../../../domain/package/PackageTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { AlertTriangle, X, ArrowLeftRight } from "lucide-react";

interface OptOutModalProps {
  sub: SubscriberSubscription;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OptOutModal({ sub, onClose, onSuccess }: OptOutModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useAgentStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/packages/opt-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subId: sub.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className={cn(
        "w-full max-w-md rounded-3xl overflow-hidden flex flex-col shadow-2xl border transition-all duration-500",
        theme === 'dark' ? "bg-[#0B0F1A] border-white/10" : "bg-white border-slate-200"
      )}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
               <ArrowLeftRight size={20} className="text-rose-500" />
             </div>
             <div>
               <h3 className={cn(
                 "text-sm font-black uppercase tracking-widest",
                 theme === 'dark' ? "text-slate-200" : "text-slate-800"
               )}>
                 Opt Out Request
               </h3>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                 Package Deactivation
               </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-rose-500 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2 text-center">
             <p className={cn(
               "text-xs font-medium leading-relaxed",
               theme === 'dark' ? "text-slate-400" : "text-slate-600"
             )}>
               Are you sure you want to deactivate package <br/>
               <span className={cn(
                 "font-black uppercase tracking-wider text-sm",
                 theme === 'dark' ? "text-slate-100" : "text-slate-900"
               )}>{sub.packageId}</span>?
             </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[11px] font-bold flex items-center gap-2 animate-in shake-1 duration-500">
               <AlertTriangle size={14} /> {error}
            </div>
          )}
          
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
            <div className="space-y-1">
              <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Billing Impact Notice</div>
              <p className="text-[11px] text-amber-600/80 leading-relaxed font-medium">
                Deactivation will be scheduled for the end of the current billing cycle if outside the allowed window.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose}
              className={cn(
                "flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border",
                theme === 'dark' 
                  ? "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white" 
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="flex-1 py-3.5 rounded-2xl bg-rose-600 text-white text-xs font-black uppercase tracking-tighter shadow-lg shadow-rose-900/20 hover:bg-rose-500 active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Opt Out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
