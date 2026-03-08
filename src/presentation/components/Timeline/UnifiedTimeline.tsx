"use client";

import React, { useState, useMemo } from "react";
import { 
  PhoneIncoming, 
  PhoneOutgoing, 
  MessageSquare, 
  Wrench, 
  CreditCard, 
  Package, 
  Tv, 
  Info,
  Filter,
  Search,
  ChevronRight
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";
import { motion, AnimatePresence } from "framer-motion";

type EventKind = "ALL" | "CALLS" | "PAYMENTS" | "TICKETS" | "PACKAGES" | "HARDWARE" | "OTT";

interface UnifiedTimelineProps {
  interactions: any[];
  serviceRequests: any[];
  outboundCampaigns?: any[];
}

const FILTER_CHIPS: { id: EventKind; label: string; icon: any; color: string }[] = [
  { id: "ALL", label: "All Events", icon: Info, color: "text-slate-400" },
  { id: "CALLS", label: "Calls", icon: PhoneIncoming, color: "text-blue-400" },
  { id: "PAYMENTS", label: "Payments", icon: CreditCard, color: "text-emerald-400" },
  { id: "TICKETS", label: "Tickets", icon: Wrench, color: "text-amber-400" },
  { id: "PACKAGES", label: "Packages", icon: Package, color: "text-purple-400" },
  { id: "OTT", label: "OTT", icon: Tv, color: "text-rose-400" },
];

export default function UnifiedTimeline({
  interactions,
  serviceRequests,
  outboundCampaigns = [],
}: UnifiedTimelineProps) {
  const { theme } = useAgentStore();
  const [activeFilter, setActiveFilter] = useState<EventKind>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const allEvents = useMemo(() => {
    const combined = [
      ...interactions.map(i => ({ 
        ...i, 
        sortDate: new Date(i.date), 
        kind: i.type === "SMS" ? "OTT" : "CALLS", // SMS maps to OTT/Notifications for now
        icon: i.type === "SMS" ? MessageSquare : (i.type === "INBOUND" ? PhoneIncoming : PhoneOutgoing)
      })),
      ...serviceRequests.map(s => ({ 
        ...s, 
        sortDate: new Date(s.date), 
        kind: "TICKETS",
        icon: Wrench 
      })),
      ...outboundCampaigns.map(c => ({ 
        id: c.id, 
        type: "OUTBOUND", 
        date: c.callDate, 
        category: c.campaignName, 
        notes: c.feedback, 
        status: c.status, 
        agentName: c.agentName,
        sortDate: new Date(c.callDate), 
        kind: "CALLS",
        icon: PhoneOutgoing
      }))
    ].sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());

    return combined.filter(event => {
      const matchesFilter = activeFilter === "ALL" || event.kind === activeFilter;
      const matchesSearch = !searchQuery || 
        event.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.id?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [interactions, serviceRequests, outboundCampaigns, activeFilter, searchQuery]);

  return (
    <div className={cn(
      "flex flex-col h-full",
      theme === 'dark' ? "bg-[#0F172A]/30" : "bg-white"
    )}>
      {/* Filter Header */}
      <div className={cn(
        "p-4 border-b space-y-4 glass sticky top-0 z-20",
        theme === 'dark' ? "border-white/5" : "border-slate-100"
      )}>
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase flex items-center gap-2">
            <HistoryIcon className="w-4 h-4" /> INTERACTION TIMELINE
          </h3>
          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
            <input 
              className={cn(
                "border rounded-full py-1.5 pl-8 pr-4 text-xs w-48 outline-none focus:border-orange-500/30 focus:ring-1 focus:ring-orange-500/10 transition-all",
                theme === 'dark' ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
              )}
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xxs font-bold border transition-all whitespace-nowrap",
                activeFilter === chip.id 
                  ? "bg-orange-500/10 border-orange-500/50 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.1)]" 
                  : (theme === 'dark' ? "bg-white/5 border-white/5 text-slate-500" : "bg-slate-50 border-slate-100 text-slate-500") + " hover:border-white/10 hover:text-slate-300"
              )}
            >
              <chip.icon size={12} className={cn(activeFilter === chip.id ? "text-orange-500" : chip.color)} />
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto p-4 relative scrollbar-hide">
        {/* Vertical Line */}
        <div className={cn(
          "absolute left-[31px] top-0 bottom-0 w-px",
          theme === 'dark' 
            ? "bg-gradient-to-b from-white/10 via-white/5 to-transparent" 
            : "bg-gradient-to-b from-slate-200 via-slate-100 to-transparent"
        )} />

        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {allEvents.map((event, idx) => (
              <TimelineItem key={event.id + idx} event={event} />
            ))}
          </AnimatePresence>

          {allEvents.length === 0 && (
            <div className="text-center py-20 opacity-40">
              <HistoryIcon size={48} className="mx-auto mb-4 text-slate-600" />
              <p className="text-xs font-medium">No records match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ event }: { event: any }) {
  const { theme } = useAgentStore();
  const isService = event.kind === "TICKETS";
  const Icon = event.icon || Info;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative pl-10 group"
    >
      {/* Node Dot */}
      <div className={cn(
        "absolute left-[24px] top-1 w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center transition-transform group-hover:scale-125",
        theme === 'dark' ? "border-[#0B0F1A]" : "border-white",
        isService ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-slate-700"
      )}>
        <Icon size={8} className="text-white" />
      </div>

      {/* Date & Time Float */}
      <div className="absolute -left-2 top-0 text-[9px] font-bold text-slate-600 uppercase w-20 -translate-x-full text-right pr-6 pt-1">
        {new Date(event.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
        <div className="opacity-50 font-normal">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>

      {/* Content Card */}
      <div className={cn(
        "p-3 rounded-xl border transition-all group-hover:border-white/10",
        theme === 'dark' 
          ? (isService ? "bg-amber-500/5 border-amber-500/10" : "bg-white/5 border-white/5")
          : (isService ? "bg-amber-500/5 border-amber-500/20" : "bg-slate-50 border-slate-200")
      )}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter",
              isService ? "bg-amber-500/20 text-amber-500" : (theme === 'dark' ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-600")
            )}>
              {event.type}
            </span>
            <span className="text-[10px] font-mono text-slate-500">#{event.id}</span>
          </div>
          <div className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            event.status === "CLOSED" || event.status === "RESOLVED" || event.status === "CONNECTED"
              ? "text-emerald-500 bg-emerald-500/10"
              : "text-amber-500 bg-amber-500/10"
          )}>
            {event.status}
          </div>
        </div>

        <h4 className={cn(
          "text-[11px] font-bold mb-1 leading-tight",
          theme === 'dark' ? "text-slate-200" : "text-slate-900"
        )}>
          {event.category || (isService ? "Service Visit Required" : "Account Inquiry")}
        </h4>
        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 group-hover:line-clamp-none transition-all">
          {event.notes || event.resolutionRemarks}
        </p>

        {(event.agentName || event.technicianId) && (
          <div className={cn(
            "mt-3 pt-2 border-t flex items-center justify-between text-[9px] font-bold text-slate-600 uppercase",
            theme === 'dark' ? "border-white/5" : "border-slate-100"
          )}>
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-4 h-4 rounded-full border overflow-hidden",
                theme === 'dark' ? "bg-slate-800 border-white/10" : "bg-slate-200 border-slate-300"
              )}>
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.agentName || event.technicianId}`} alt="avatar" />
              </div>
              {event.agentName || "System Auto"}
            </div>
            {event.technicianId && (
               <span className="text-amber-500/70 italic">Assigned: {event.technicianId}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function HistoryIcon({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  );
}
