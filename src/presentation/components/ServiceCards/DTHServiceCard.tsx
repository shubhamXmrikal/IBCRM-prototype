"use client";

import React from "react";
import { Customer } from "../../../domain/customer/Customer";
import { 
  Tv, 
  Cpu, 
  Box, 
  Zap, 
  Clock, 
  AlertCircle,
  ArrowUpCircle,
  Signal,
  Package
} from "lucide-react";
import { cn } from "../../../lib/utils";

import { useAgentStore } from "../../../store/useAgentStore";

interface DTHServiceCardProps {
  customer: Customer;
}

export default function DTHServiceCard({ customer }: DTHServiceCardProps) {
  const { setActiveActionDrawer } = useAgentStore();
  const isWarrantyActive = customer.technical.warrantyStatus === "Y";

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full border-white/5 shadow-xl group">
      {/* Header */}
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-orange-600/10 flex items-center justify-center">
             <Tv size={16} className="text-orange-500" />
           </div>
           <span className="text-xs font-bold tracking-widest text-slate-300">DTH SERVICE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setActiveActionDrawer('PACKAGE_TOOL')}
            className="text-[9px] font-black text-orange-500 hover:text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded transition-colors uppercase tracking-tighter"
          >
            Manage
          </button>
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            <Signal size={10} />
            STRENGTH: 92%
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Main Package */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 relative overflow-hidden group-hover:border-orange-500/20 transition-all">
          <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
            <Package size={80} />
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Base Pack</div>
          <div className="text-sm font-bold text-slate-100 mb-1">{customer.metrics.packageName || "N/A"}</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-orange-500">₹{customer.financial.fmrValue || 0}/mo</span>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-[10px] text-slate-500">Next Recharge: {new Date(customer.metrics.rechargeDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-2 gap-3">
          <TechItem 
            icon={Cpu} 
            label="STB Model" 
            value={customer.technical.stbModel} 
            subValue={customer.technical.modelType}
          />
          <TechItem 
            icon={Box} 
            label="STB Number" 
            value={customer.technical.stbNumber} 
            isCopyable
          />
          <TechItem 
            icon={Clock} 
            label="Warranty" 
            value={isWarrantyActive ? "Active" : "Expired"} 
            status={isWarrantyActive ? "success" : "danger"}
          />
          <TechItem 
            icon={ArrowUpCircle} 
            label="Box Category" 
            value={customer.technical.boxCategory || "Standard"} 
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-auto p-2 border-t border-white/5 grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-300 transition-colors uppercase">
          <Zap size={12} className="text-amber-500" /> Refresh Signal
        </button>
        <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-300 transition-colors uppercase">
          <AlertCircle size={12} className="text-orange-500" /> Raise Ticket
        </button>
      </div>
    </div>
  );
}

function TechItem({ icon: Icon, label, value, subValue, status, isCopyable }: any) {
  return (
    <div className="p-2 rounded-xl border border-white/5 bg-white/[0.01]">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={12} className="text-slate-500" />
        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 overflow-hidden">
        <span className={cn(
          "text-[11px] font-bold truncate",
          status === 'success' ? "text-emerald-500" : status === 'danger' ? "text-rose-500" : "text-slate-300"
        )}>
          {value}
        </span>
        {isCopyable && <Box size={10} className="text-slate-700 flex-shrink-0" />}
      </div>
      {subValue && <div className="text-[9px] text-slate-500 font-medium">{subValue}</div>}
    </div>
  );
}
