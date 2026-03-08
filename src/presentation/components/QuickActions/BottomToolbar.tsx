"use client";

import React, { useState } from "react";
import TempDeactivationModal from "./TempDeactivationModal";
import { 
  ChevronUp, 
  Tag, 
  FileText, 
  MessageSquare, 
  Search, 
  ShieldOff, 
  PackagePlus, 
  Disc, 
  MoreHorizontal,
  Layers,
  Settings2,
  Lock
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

type DropdownItem = {
  label: string;
  onClick?: () => void;
};

interface DropdownButtonProps {
  label: string;
  icon: any;
  items: DropdownItem[];
}

function DropdownButton({ label, icon: Icon, items }: DropdownButtonProps) {
  const [open, setOpen] = useState(false);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) {
      item.onClick();
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={cn(
          "h-8 px-3 flex items-center gap-2 rounded-lg transition-all text-xxs font-bold uppercase tracking-wider border",
          open 
            ? "bg-orange-600/20 border-orange-500/40 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]" 
            : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10"
        )}
      >
        <Icon size={12} className={open ? "text-orange-500" : "text-slate-500"} />
        <span>{label}</span>
        <ChevronUp size={10} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute bottom-full left-0 mb-2 min-w-[200px] glass-card rounded-xl border border-white/10 p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="max-h-[240px] overflow-y-auto scrollbar-hide py-1">
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleItemClick(item)}
                className="w-full text-left px-3 py-2 rounded-lg text-[11px] font-medium text-slate-400 hover:bg-orange-600/10 hover:text-orange-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BottomToolbar() {
  const [isTempDeactivationOpen, setIsTempDeactivationOpen] = useState(false);
  const { activeCustomer } = useAgentStore();

  const mockSubscriber = {
    vcNo: activeCustomer?.vcNumber || "123456789012",
    toc: activeCustomer?.metrics.customerTypeId.toString() || "1001",
    status: activeCustomer?.metrics.status || "Active",
  };

  return (
    <div className="flex items-center gap-2 p-1.5 glass border border-white/10 rounded-2xl shadow-2xl shadow-black/50 pointer-events-auto">
      {/* Quick Action Group */}
      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 mr-2">
        <QuickButton icon={Tag} label="Tagging" />
        <QuickButton icon={FileText} label="SOA" />
        <QuickButton icon={MessageSquare} label="SMS" />
      </div>

      {/* Categorized Dropdowns */}
      <div className="flex items-center gap-1.5">
        <DropdownButton
          label="Search"
          icon={Search}
          items={[
            { label: "Pincode Master" },
            { label: "Service Hierarchy" },
            { label: "Parent-Child Map" },
            { label: "Audit Email Log" },
          ]}
        />

        <DropdownButton
          label="Packs"
          icon={PackagePlus}
          items={[
            { label: "Opt-Out Window" },
            { label: "Advance Add-on" },
            { label: "HD Sampler Pack" },
            { label: "Sports Bundles" },
            { label: "Channel Rollback" },
          ]}
        />

        <DropdownButton
          label="System"
          icon={Settings2}
          items={[
            { label: "DNC Management" },
            { label: "STB/VC Pairing" },
            { label: "DVR Authorization" },
            { label: "Manager Escalation" },
            { label: "Temp Deactivation", onClick: () => setIsTempDeactivationOpen(true) },
          ]}
        />

        <DropdownButton
          label="More"
          icon={MoreHorizontal}
          items={[
            { label: "LCO Alignment" },
            { label: "OYC Conversion" },
            { label: "Dish VIP Enrollment" },
            { label: "Price Protection" },
            { label: "Loyalty Cashback" },
          ]}
        />
      </div>

      <TempDeactivationModal
        isOpen={isTempDeactivationOpen}
        onClose={() => setIsTempDeactivationOpen(false)}
        subscriberInfo={mockSubscriber}
      />
    </div>
  );
}

function QuickButton({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="h-7 px-3 flex items-center gap-2 rounded-lg text-xxs font-black uppercase tracking-tighter text-slate-500 hover:bg-white/5 hover:text-slate-200 transition-all">
      <Icon size={12} />
      {label}
    </button>
  );
}
