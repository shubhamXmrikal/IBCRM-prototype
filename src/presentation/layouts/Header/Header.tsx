"use client";

import React, { useState } from "react";
import { SearchType } from "../../../domain/customer/SubscriberSearchTypes";
import {
  Search,
  ShieldCheck,
  Mic2,
  Mail,
  PhoneForwarded,
  Network,
  MonitorDot,
  Command as CommandIcon,
  ChevronDown,
} from "lucide-react";
import { useAgentStore } from "../../../store/useAgentStore";
import { CommandPalette } from "../../components/CommandPalette/CommandPalette";
import { cn } from "../../../lib/utils";

interface HeaderProps {
  onSearch: (searchType: SearchType, searchBy: string) => void;
  isLoading: boolean;
  callerVerified?: boolean;
}

const SEARCH_OPTIONS: { value: SearchType; label: string }[] = [
  { value: "VC", label: "VC No" },
  { value: "RMN", label: "RMN" },
  { value: "MOBILE", label: "Mobile" },
  { value: "SMSID", label: "SMS ID" },
  { value: "STB", label: "STB No" },
  { value: "EMAIL", label: "Email ID" },
];

export default function Header({
  onSearch,
  isLoading,
  callerVerified,
}: HeaderProps) {
  const [searchType, setSearchType] = useState<SearchType>("VC");
  const [searchTerm, setSearchTerm] = useState("09100000001");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const { agentName, center, ipAddress, routingMode, theme } = useAgentStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchType, searchTerm.trim());
    }
  };

  return (
    <header className="crm-header h-14 glass border-b border-white/10 flex items-center px-4 justify-between sticky top-0 z-50">
      {/* Search & Command Trigger */}
      <div className="flex items-center gap-3">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white/5 border border-white/10 rounded-lg h-9 overflow-hidden focus-within:ring-1 focus-within:ring-orange-500/50 transition-all"
        >
          <div className="relative border-r border-white/10 bg-transparent group">
            <select
              className="bg-transparent text-xxs font-semibold px-2 pr-6 h-full outline-none appearance-none text-slate-400 cursor-pointer"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as SearchType)}
            >
              {SEARCH_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className={theme === "dark" ? "bg-[#0B0F1A]" : "bg-white"}
                >
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={10}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
            />
          </div>

          <input
            type="text"
            className="bg-transparent px-3 text-xs w-48 outline-none placeholder:text-slate-600"
            placeholder={`Search ${searchType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-3 text-slate-400 hover:text-white transition-colors border-l border-white/10"
          >
            <Search size={14} className={isLoading ? "animate-pulse" : ""} />
          </button>
        </form>

        <button
          onClick={() => setIsCommandOpen(true)}
          className="flex items-center gap-2 px-3 h-9 rounded-lg bg-orange-600/10 border border-orange-500/20 text-orange-500 text-xxs font-bold hover:bg-orange-600/20 transition-all"
        >
          <CommandIcon size={12} />
          COMMANDS
          <span className="opacity-40 font-mono">⌘K</span>
        </button>

        {callerVerified && (
          <div className="flex items-center gap-1.5 px-2.5 h-7 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <ShieldCheck size={12} />
            VERIFIED CALLER
          </div>
        )}
      </div>

      {/* Center: HUD Info */}
      <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-medium text-slate-400">
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-4">
          <MonitorDot size={12} className="text-orange-500" />
          AGENT: <span className="text-slate-200">{agentName}</span>
        </div>
        <div className="flex items-center gap-1.5 border-r border-white/10 pr-4">
          <Network size={12} className="text-blue-500" />
          CENTER: <span className="text-slate-200">{center}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full animate-pulse",
              routingMode === "PRIMARY" ? "bg-emerald-500" : "bg-amber-500",
            )}
          />
          MODE: <span className="text-slate-200 uppercase">{routingMode}</span>
          <span className="opacity-40">({ipAddress})</span>
        </div>
      </div>

      {/* Right: Quick Call Actions */}
      <div className="flex items-center gap-2">
        <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
          <ActionButton icon={Mic2} label="REC" color="text-rose-500" />
          <ActionButton icon={Mail} label="EMAIL" color="text-blue-400" />
          <ActionButton
            icon={PhoneForwarded}
            label="VZY"
            color="text-purple-400"
          />
        </div>
      </div>

      <CommandPalette open={isCommandOpen} setOpen={setIsCommandOpen} />
    </header>
  );
}

function ActionButton({
  icon: Icon,
  label,
  color,
}: {
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors group">
      <Icon size={14} className={color} />
      <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-200 transition-colors uppercase">
        {label}
      </span>
    </button>
  );
}
