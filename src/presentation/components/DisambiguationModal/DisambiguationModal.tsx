"use client";

import React from "react";
import { SearchSubsDetails } from "../../../domain/customer/SubscriberSearchTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { Users, X, MapPin, Hash, Info, ChevronRight } from "lucide-react";

interface DisambiguationModalProps {
  candidates: SearchSubsDetails[];
  searchValue: string;
  onSelect: (vcNumber: string) => void;
  onClose: () => void;
}

export default function DisambiguationModal({
  candidates,
  searchValue,
  onSelect,
  onClose,
}: DisambiguationModalProps) {
  const { theme } = useAgentStore();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={cn(
        "w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col max-h-[85vh]",
        isDark ? "bg-[#0B0F1A] border-white/10" : "bg-white border-slate-200"
      )}>
        {/* Header */}
        <div className={cn(
          "px-6 py-5 border-b flex items-center justify-between",
          isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
        )}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20">
              <Users size={24} className="text-blue-500" />
            </div>
            <div>
              <h3 className={cn(
                "text-base font-black uppercase tracking-widest",
                isDark ? "text-slate-200" : "text-slate-800"
              )}>
                Multiple Accounts Found
              </h3>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                The identifier <span className="text-orange-500 font-bold">{searchValue}</span> is linked to {candidates.length} records.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-rose-500 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Candidate list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-hide">
          {candidates.map((c) => (
            <button
              key={c.vcNumber}
              onClick={() => onSelect(c.vcNumber)}
              className={cn(
                "w-full text-left p-4 rounded-2xl border transition-all group flex items-center justify-between",
                isDark 
                  ? "bg-white/[0.03] border-white/5 hover:bg-white/10 hover:border-blue-500/30" 
                  : "bg-white border-slate-100 shadow-sm hover:border-blue-500/30 hover:bg-blue-50/30"
              )}
            >
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-sm font-bold truncate",
                    isDark ? "text-slate-200" : "text-slate-900"
                  )}>
                    {c.subscriberName}
                  </span>
                  <span className={cn(
                    "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                    c.mobileType === "RMN" 
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                      : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                  )}>
                    {c.mobileType}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Hash size={12} className="text-slate-600" />
                    <span className="text-[11px] font-mono font-bold text-orange-500">{c.vcNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-600 uppercase">SMSID:</span>
                    <span className="text-[11px] font-mono font-bold text-slate-400">{c.smsId}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin size={12} className="text-slate-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-500 font-medium line-clamp-1">
                    {c.address} — {c.city}, {c.state}
                  </span>
                </div>
              </div>
              
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1",
                isDark ? "bg-white/5" : "bg-slate-100"
              )}>
                <ChevronRight size={20} className="text-blue-500" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={cn(
          "px-6 py-4 border-t flex items-center gap-3",
          isDark ? "bg-white/[0.01] border-white/5" : "bg-slate-50 border-slate-100"
        )}>
          <Info size={14} className="text-slate-600" />
          <p className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            isDark ? "text-slate-600" : "text-slate-400"
          )}>
            Equivalent to usp_CUSTOMERSERVICE_SearchSubsDetailByMobnEmail in legacy
          </p>
        </div>
      </div>
    </div>
  );
}
