"use client";

import React, { useState, useEffect } from "react";
import { ComplaintEntry } from "../../../domain/call/CallHandlingTypes";
import { Ticket, Search, Plus, Calendar, Clock, ArrowRight, User } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface ComplaintHistoryTabProps {
  vcNumber: string;
  onLogNew?: () => void;
}

export default function ComplaintHistoryTab({ vcNumber, onLogNew }: ComplaintHistoryTabProps) {
  const [history, setHistory] = useState<ComplaintEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useAgentStore();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/complaints/history?vcNumber=${vcNumber}`);
        const data = await res.json();
        if (res.ok) setHistory(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (vcNumber) fetchHistory();
  }, [vcNumber]);

  const filteredHistory = history.filter(h => 
    h.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.status.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());

  if (loading) return (
    <div className="p-8 text-center animate-pulse space-y-3">
      <Ticket className="mx-auto text-slate-700 w-10 h-10" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Retrieving Tickets...</p>
    </div>
  );

  return (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      {/* Search & Actions Header */}
      <div className={cn(
        "p-4 border-b space-y-4",
        theme === 'dark' ? "border-white/5 bg-white/[0.01]" : "border-slate-100 bg-slate-50"
      )}>
        <div className="flex items-center justify-between">
           <div className="relative group flex-1 mr-4">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input 
                className={cn(
                  "w-full border rounded-xl py-2 pl-8 pr-4 text-xs outline-none focus:border-orange-500/30 focus:ring-1 focus:ring-orange-500/10 transition-all",
                  theme === 'dark' ? "bg-white/5 border-white/10 text-slate-200" : "bg-white border-slate-200 text-slate-900"
                )}
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           {onLogNew && (
             <button 
               onClick={onLogNew}
               className="h-9 px-4 rounded-xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-orange-900/20 hover:bg-orange-500 transition-all flex items-center gap-2"
             >
               <Plus size={14} /> New Ticket
             </button>
           )}
        </div>
      </div>

      {/* Ticket List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide pb-20">
        {filteredHistory.map((item) => (
          <div key={item.id} className={cn(
            "p-3 rounded-2xl border hover:border-white/10 transition-all space-y-3 group",
            theme === 'dark' ? "bg-white/[0.03] border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <div className="flex items-start justify-between">
               <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center border",
                    item.status === 'OPEN' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                    item.status === 'RESOLVED' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                    (theme === 'dark' ? "bg-slate-800 border-white/5 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-400")
                  )}>
                    <Ticket size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <span className={cn(
                         "text-xs font-black",
                         theme === 'dark' ? "text-slate-200" : "text-slate-900"
                       )}>{item.id}</span>
                       <span className={cn(
                         "text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest",
                         item.status === 'OPEN' ? "bg-blue-500/10 text-blue-500" :
                         item.status === 'RESOLVED' ? "bg-emerald-500/10 text-emerald-500" :
                         "bg-slate-500/10 text-slate-500"
                       )}>{item.status}</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">{item.subject}</div>
                  </div>
               </div>
               <button className="p-2 rounded-lg hover:bg-white/5 text-slate-600 transition-all opacity-0 group-hover:opacity-100">
                  <ArrowRight size={14} />
               </button>
            </div>

            <div className={cn(
              "p-2.5 rounded-xl text-[10px] leading-relaxed font-medium",
              theme === 'dark' ? "bg-white/[0.02] text-slate-400" : "bg-slate-50 text-slate-600"
            )}>
               {item.description}
            </div>

            <div className="flex items-center justify-between pt-1">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                     <Calendar size={10} /> {new Date(item.createdOn).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                     <User size={10} /> {item.createdBy}
                  </div>
               </div>
               <div className="text-[9px] font-black text-orange-500 uppercase tracking-tighter cursor-pointer hover:underline">
                  View Timeline
               </div>
            </div>
          </div>
        ))}

        {filteredHistory.length === 0 && (
          <div className="text-center py-20 opacity-40">
             <Ticket size={48} className="mx-auto mb-4 text-slate-700" />
             <p className="text-xs font-bold uppercase tracking-widest">No tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
}
