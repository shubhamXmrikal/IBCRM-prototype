"use client";

import React, { useState, useEffect } from "react";
import { ChannelDetail } from "../../../domain/package/FinancialTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { Search, X, Monitor, Shield, Satellite } from "lucide-react";

interface ChannelEntitlementModalProps {
  onClose: () => void;
}

export default function ChannelEntitlementModal({ onClose }: ChannelEntitlementModalProps) {
  const [channels, setChannels] = useState<ChannelDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { theme } = useAgentStore();

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/master/channels");
      if (res.ok) {
        const data = await res.json();
        setChannels(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filteredChannels = channels.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.includes(searchTerm) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className={cn(
        "w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border transition-all duration-500",
        theme === 'dark' ? "bg-[#0B0F1A] border-white/10" : "bg-white border-slate-200"
      )}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className={cn(
              "text-sm font-black uppercase tracking-widest",
              theme === 'dark' ? "text-slate-200" : "text-slate-800"
            )}>
              Entitled Channel List
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              Authorized Content for Subscriber
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-orange-500 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className={cn(
          "px-6 py-4 border-b border-white/5 flex items-center gap-3",
          theme === 'dark' ? "bg-white/[0.02]" : "bg-slate-50"
        )}>
          <Search size={16} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by name, code, or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full placeholder:text-slate-600 font-medium"
            autoFocus
          />
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <Monitor size={32} className="text-slate-700 mb-4" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Fetching Entitlements...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className={cn(
                  "text-[10px] font-black uppercase tracking-widest border-b border-white/5",
                  theme === 'dark' ? "bg-[#0B0F1A] text-slate-500" : "bg-white text-slate-400"
                )}>
                  <th className="py-3 px-2">Code</th>
                  <th className="py-3 px-2">Channel Name</th>
                  <th className="py-3 px-2">Category</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Security</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredChannels.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-xs font-bold text-slate-600 uppercase tracking-widest">
                      No matching channels found
                    </td>
                  </tr>
                ) : (
                  filteredChannels.map((c) => (
                    <tr key={c.code} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-2 font-mono text-[11px] text-slate-500">{c.code}</td>
                      <td className="py-4 px-2">
                        <div className={cn(
                          "text-xs font-bold",
                          theme === 'dark' ? "text-slate-200" : "text-slate-800"
                        )}>
                          {c.name}
                        </div>
                        {c.requiresThreeSatellite && (
                          <div className="flex items-center gap-1 text-[9px] font-bold text-orange-500 uppercase tracking-tighter mt-0.5">
                            <Satellite size={10} /> 3-SATELLITE REQ
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-2 text-[11px] font-medium text-slate-500">{c.category}</td>
                      <td className="py-4 px-2">
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-black tracking-tighter",
                          c.isHD 
                            ? "bg-orange-500/10 text-orange-500" 
                            : "bg-slate-500/10 text-slate-500"
                        )}>
                          {c.isHD ? "HD" : "SD"}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        {c.isHighSecurity && (
                          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center" title="High Security Encryption">
                            <Shield size={12} className="text-emerald-500" />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer */}
        <div className={cn(
          "px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest",
          theme === 'dark' ? "bg-white/[0.01] text-slate-600" : "bg-slate-50 text-slate-400"
        )}>
          <div>Total Entitled: <span className="text-orange-500">{channels.length}</span></div>
          <div>Showing: <span className="text-orange-500">{filteredChannels.length}</span></div>
        </div>
      </div>
    </div>
  );
}
