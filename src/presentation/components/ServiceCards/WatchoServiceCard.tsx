"use client";

import React from "react";
import { Customer } from "../../../domain/customer/Customer";
import { 
  Tv, 
  Smartphone, 
  PlayCircle, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Zap
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface WatchoServiceCardProps {
  customer: Customer;
}

export default function WatchoServiceCard({ customer }: WatchoServiceCardProps) {
  // In a real app, this would come from a specific Watcho useCase
  // Using flags from Customer domain as a proxy for the prototype
  const hasWatcho = customer.isGoMulti || customer.flags.isHDSubs; // Proxy logic

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border-white/5 shadow-xl group">
      {/* Header */}
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center">
             <Smartphone size={16} className="text-emerald-500" />
           </div>
           <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Watcho OTT</span>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
          hasWatcho ? "text-emerald-500 bg-emerald-500/10" : "text-slate-500 bg-white/5"
        )}>
          {hasWatcho ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
          {hasWatcho ? "ACTIVE" : "INACTIVE"}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Active Plan */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 relative overflow-hidden">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Current OTT Plan</div>
          {hasWatcho ? (
            <>
              <div className="text-sm font-bold text-slate-100 mb-1">Watcho Max Multi-App</div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-emerald-500 font-bold">12 Apps Bundled</span>
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-[10px] text-slate-500">Auto-Renewal: ON</span>
              </div>
            </>
          ) : (
            <div className="text-xs text-slate-600 italic py-1">No active subscription found.</div>
          )}
        </div>

        {/* App Logos (Simulated) */}
        <div className="space-y-2">
           <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Included Premium Apps</div>
           <div className="flex gap-2 flex-wrap opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <AppIcon label="Disney+" />
              <AppIcon label="Zee5" />
              <AppIcon label="SonyLIV" />
              <AppIcon label="Lionsgate" />
           </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-auto p-2 border-t border-white/5">
        <button className={cn(
          "w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-bold transition-all uppercase",
          hasWatcho 
            ? "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5" 
            : "bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/20"
        )}>
          {hasWatcho ? (
            <><PlayCircle size={12} className="text-emerald-500" /> Manage Apps</>
          ) : (
            <><Zap size={12} fill="white" strokeWidth={0} /> Upgrade to Watcho Max</>
          )}
        </button>
      </div>
    </div>
  );
}

function AppIcon({ label }: { label: string }) {
  return (
    <div className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400">
      {label}
    </div>
  );
}
