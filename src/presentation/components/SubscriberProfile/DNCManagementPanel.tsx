"use client";

import React, { useState } from "react";
import { ShieldOff, CheckCircle2, AlertTriangle, Smartphone, BellOff } from "lucide-react";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";

export default function DNCManagementPanel() {
  const { activeCustomer, theme } = useAgentStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const isDark = theme === 'dark';

  if (!activeCustomer) return null;

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className={cn(
      "p-6 flex flex-col gap-6 transition-colors duration-500",
      isDark ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      <div className="space-y-2">
        <h3 className={cn("text-sm font-black uppercase tracking-widest", isDark ? "text-slate-200" : "text-slate-800")}>
          Do Not Call (DNC) Registry
        </h3>
        <p className="text-[11px] text-slate-500 font-medium">
          Manage subscriber communication preferences and TRAI DNC status.
        </p>
      </div>

      <div className="space-y-4">
        <DNCItem 
          label="Primary Mobile (RMN)" 
          value={activeCustomer.vcNumber} 
          isDNC={activeCustomer.contact.isDNCMob1} 
          theme={theme}
        />
        <DNCItem 
          label="Alternate Mobile 1" 
          value="9999900001" 
          isDNC={activeCustomer.contact.isDNCMob2} 
          theme={theme}
        />
      </div>

      <div className={cn(
        "p-4 rounded-2xl border space-y-3",
        isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
      )}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
          <div className="space-y-1">
            <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Compliance Notice</div>
            <p className="text-[11px] text-amber-600/80 leading-relaxed font-medium">
              Updating DNC status takes up to 7 days to propagate across all service providers as per TRAI regulations.
            </p>
          </div>
        </div>
      </div>

      {success ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-500 animate-in zoom-in duration-300">
          <CheckCircle2 size={20} />
          <div className="text-xs font-bold uppercase tracking-tight">Request Logged Successfully</div>
        </div>
      ) : (
        <button 
          onClick={handleUpdate}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 disabled:opacity-50"
        >
          {loading ? "Syncing with TRAI..." : "Update Preference"}
        </button>
      )}
    </div>
  );
}

function DNCItem({ label, value, isDNC, theme }: any) {
  const isDark = theme === 'dark';
  return (
    <div className={cn(
      "p-4 rounded-2xl border flex items-center justify-between transition-all",
      isDark ? "bg-white/[0.01] border-white/5" : "bg-white border-slate-100 shadow-sm"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center border",
          isDNC ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
        )}>
          {isDNC ? <BellOff size={20} /> : <Smartphone size={20} />}
        </div>
        <div>
          <div className={cn("text-[11px] font-black uppercase tracking-tight", isDark ? "text-slate-200" : "text-slate-800")}>{label}</div>
          <div className="text-[10px] font-mono text-slate-500">{value}</div>
        </div>
      </div>
      <div className={cn(
        "px-2 py-0.5 rounded-full text-[9px] font-black tracking-widest",
        isDNC ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
      )}>
        {isDNC ? "DNC ACTIVE" : "MARKETABLE"}
      </div>
    </div>
  );
}
