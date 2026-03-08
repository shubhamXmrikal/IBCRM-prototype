"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Clock,
  ShieldAlert
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface TempDeactivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberInfo: {
    vcNo: string;
    toc: string;
    status: string;
  };
}

export default function TempDeactivationModal({
  isOpen,
  onClose,
  subscriberInfo,
}: TempDeactivationModalProps) {
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("15");
  const [endDate, setEndDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [agreed, setAgreed] = useState(false);
  const { theme } = useAgentStore();

  // Auto-calculate end date
  useEffect(() => {
    if (startDate && duration) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + parseInt(duration));
      setEndDate(date.toISOString().split("T")[0]);
    }
  }, [startDate, duration]);

  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isAirportSub = subscriberInfo.toc === "10026";
  const canSubmit = agreed && startDate && remarks.length >= 5;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className={cn(
        "w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500",
        isDark ? "bg-[#0B0F1A] border-white/10" : "bg-white border-slate-200"
      )}>
        {/* Header */}
        <div className={cn(
          "p-6 border-b flex items-center justify-between",
          isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
        )}>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
               <Clock size={20} className="text-amber-500" />
             </div>
             <div>
               <h2 className={cn(
                 "text-sm font-bold tracking-tight uppercase tracking-widest",
                 isDark ? "text-slate-100" : "text-slate-900"
               )}>
                 Temporary Deactivation
               </h2>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">VC: {subscriberInfo.vcNo}</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-rose-500 transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Eligibility Alert */}
          {isAirportSub ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
              <ShieldAlert className="text-rose-500 shrink-0" size={18} />
              <div className="text-xs text-rose-600 leading-relaxed font-medium">
                <span className="font-bold uppercase">Access Denied:</span> This subscriber is flagged as an "Airport Account". 
                Policy <span className="underline italic">#CS-2024-X</span> prevents temporary deactivation for this category.
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
              <Info className="text-amber-500 shrink-0" size={18} />
              <div className="text-xs text-amber-600/80 leading-relaxed font-medium">
                Minimum deactivation period is <span className="font-black underline">5 days</span>. Billing will be suspended during this period.
              </div>
            </div>
          )}

          {/* Form Fields */}
          {!isAirportSub && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Start Date</label>
                   <div className="relative">
                     <input 
                       type="date" 
                       className={cn(
                         "w-full border rounded-xl py-2.5 px-4 text-xs outline-none focus:border-amber-500/50 transition-all",
                         isDark ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
                       )}
                       value={startDate}
                       onChange={(e) => setStartDate(e.target.value)}
                       min={new Date().toISOString().split("T")[0]}
                     />
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Duration (Days)</label>
                   <div className="relative">
                     <select 
                       className={cn(
                         "w-full border rounded-xl py-2.5 px-4 text-xs outline-none focus:border-amber-500/50 transition-all appearance-none",
                         isDark ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
                       )}
                       value={duration}
                       onChange={(e) => setDuration(e.target.value)}
                     >
                       <option value="5" className={isDark ? "bg-slate-900" : "bg-white"}>5 Days (Min)</option>
                       <option value="15" className={isDark ? "bg-slate-900" : "bg-white"}>15 Days</option>
                       <option value="30" className={isDark ? "bg-slate-900" : "bg-white"}>30 Days</option>
                       <option value="60" className={isDark ? "bg-slate-900" : "bg-white"}>60 Days</option>
                       <option value="90" className={isDark ? "bg-slate-900" : "bg-white"}>90 Days</option>
                     </select>
                   </div>
                </div>
              </div>

              {startDate && (
                 <div className={cn(
                   "p-3 rounded-xl border flex items-center justify-between",
                   isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
                 )}>
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Estimated Reactivation</div>
                    <div className="text-xs font-mono font-bold text-emerald-500">{new Date(endDate).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                 </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Agent Remarks</label>
                <textarea 
                  className={cn(
                    "w-full border rounded-xl py-3 px-4 text-xs outline-none focus:border-amber-500/50 transition-all h-20 resize-none",
                    isDark ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                  placeholder="Enter mandatory remarks for audit trail..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              {/* Policy Check */}
              <label className={cn(
                "flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-colors group",
                isDark ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
              )}>
                <input 
                  type="checkbox" 
                  className="mt-1 accent-amber-500 w-4 h-4 rounded border-white/20 bg-transparent"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className={cn(
                  "text-xs transition-colors",
                  isDark ? "text-slate-400 group-hover:text-slate-300" : "text-slate-600 group-hover:text-slate-900"
                )}>
                  I confirm the customer has provided verbal consent and understands the <span className="text-amber-500 font-bold uppercase">5-day minimum</span> policy.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={cn(
          "p-6 border-t flex items-center justify-end gap-3",
          isDark ? "bg-white/[0.01] border-white/5" : "bg-slate-50 border-slate-100"
        )}>
          <button 
            onClick={onClose}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors",
              isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-900"
            )}
          >
            Cancel
          </button>
          {!isAirportSub && (
            <button 
              disabled={!canSubmit}
              className={cn(
                "px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg",
                canSubmit 
                  ? "bg-amber-600 text-white shadow-amber-600/20 hover:bg-amber-500" 
                  : (isDark ? "bg-slate-800 text-slate-600 cursor-not-allowed" : "bg-slate-200 text-slate-400 cursor-not-allowed")
              )}
            >
              Confirm Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
