"use client";

import React from "react";
import { useAgentStore } from "../../../store/useAgentStore";
import { 
  Clock, 
  Wrench, 
  Zap, 
  FileText, 
  Lock,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { cn } from "../../../lib/utils";

export default function ActionModals() {
  const { 
    activeCustomer, 
    kycStatus, 
    setActiveActionDrawer, 
    isCallerVerified 
  } = useAgentStore();

  if (!activeCustomer) return null;

  const isWobLocked = kycStatus === "WOB";

  const handleAction = (drawer: any) => {
    if (isWobLocked) {
      alert("Account is WOB Locked. Physical verification required.");
      return;
    }
    setActiveActionDrawer(drawer);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <ActionBtn 
        icon={Clock} 
        label="Temp Deactivation" 
        color="bg-rose-600/10 text-rose-500 border-rose-500/20"
        locked={isWobLocked}
        onClick={() => handleAction('KYC')} // Or specific deact tool if built
      />
      <ActionBtn 
        icon={Wrench} 
        label="Raise Tech Call" 
        color="bg-orange-600/10 text-orange-500 border-orange-500/20"
        locked={isWobLocked}
        onClick={() => handleAction('TROUBLESHOOTING')}
      />
      <ActionBtn 
        icon={Zap} 
        label="Recharge Account" 
        color="bg-emerald-600/10 text-emerald-500 border-emerald-500/20"
        locked={isWobLocked}
        onClick={() => handleAction('KYC')}
      />
      <ActionBtn 
        icon={FileText} 
        label="Add Interaction Note" 
        color="bg-slate-600/10 text-slate-400 border-slate-500/20"
        onClick={() => handleAction('COMPLAINTS')}
      />

      {isWobLocked && (
        <div className="w-full mt-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs font-bold text-rose-500 animate-pulse">
          <ShieldCheck size={16} /> 
          SECURITY ALERT: WRITE-OFF BLOCK (WOB) ACTIVE. ALL SENSITIVE OPERATIONS SUSPENDED.
        </div>
      )}
    </div>
  );
}

function ActionBtn({ icon: Icon, label, color, onClick, locked }: any) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[11px] font-black uppercase tracking-tighter transition-all",
        locked ? "bg-slate-800 border-slate-700 text-slate-600 cursor-not-allowed" : color,
        !locked && "hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
      )}
    >
      {locked ? <Lock size={14} /> : <Icon size={14} />}
      {label}
    </button>
  );
}
