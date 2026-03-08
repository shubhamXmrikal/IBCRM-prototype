"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAgentStore } from "../../../store/useAgentStore";
import { 
  Brain, 
  Send, 
  Sparkles, 
  User, 
  Zap, 
  AlertCircle,
  Copy,
  ThumbsUp
} from "lucide-react";
import { cn } from "../../../lib/utils";

interface Message {
  id: string;
  role: "assistant" | "user" | "system";
  content: string;
  timestamp: Date;
}

export default function DishtvBrain() {
  const { activeCustomer, sentiment, setSentiment, theme } = useAgentStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm DISHTV Brain. Load a subscriber profile to see contextual insights and recommendations.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (activeCustomer) {
      setMessages([
        {
          id: "sys-1",
          role: "system",
          content: `Context: Loaded VC ${activeCustomer.vcNumber}. Plan: ${activeCustomer.metrics.packageName}. Status: ${activeCustomer.metrics.status}.`,
          timestamp: new Date(),
        },
        {
          id: "2",
          role: "assistant",
          content: `Profile loaded for ${activeCustomer.name}. I've detected a possible signal issue based on recent weather in ${activeCustomer.address.city}. Would you like me to run a remote dish diagnostic?`,
          timestamp: new Date(),
        },
      ]);
      setSentiment("NEUTRAL");
    }
  }, [activeCustomer, setSentiment]);

  return (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      {/* Header */}
      <div className={cn(
        "p-4 border-b flex items-center justify-between glass",
        theme === 'dark' ? "border-white/10" : "border-slate-100"
      )}>
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-orange-500">
          <Brain size={16} /> DISHTV BRAIN
        </div>
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px]",
          theme === 'dark' ? "bg-white/5 border-white/10 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
        )}>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full shadow-[0_0_8px]",
            sentiment === 'CALM' ? "bg-emerald-500 shadow-emerald-500/50" :
            sentiment === 'NEUTRAL' ? "bg-blue-500 shadow-blue-500/50" :
            sentiment === 'FRUSTRATED' ? "bg-amber-500 shadow-amber-500/50" :
            "bg-rose-500 shadow-rose-500/50"
          )} />
          {sentiment}
        </div>
      </div>

      {/* Chat History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
      >
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={cn(
              "flex flex-col gap-1.5",
              m.role === "user" ? "ml-auto items-end pl-8" : "mr-auto items-start pr-8",
              m.role === "system" && "items-center px-4 w-full"
            )}
          >
            {m.role === "system" ? (
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                {m.content}
              </div>
            ) : (
              <>
                <div className={cn(
                  "p-3 rounded-2xl text-xs leading-relaxed transition-all",
                  m.role === "user" 
                    ? "bg-orange-600/20 border border-orange-500/20 text-slate-100" 
                    : (theme === 'dark' ? "bg-white/5 border border-white/5 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700")
                )}>
                  {m.content}
                </div>
                <div className="text-[9px] text-slate-600 font-medium px-1 flex gap-2">
                   {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   {m.role === "assistant" && (
                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy size={10} className="cursor-pointer hover:text-orange-500" />
                        <ThumbsUp size={10} className="cursor-pointer hover:text-orange-500" />
                     </div>
                   )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Actions */}
      {activeCustomer && (
        <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5">
           <SuggestedAction label="Run Signal Refresh" icon={Zap} />
           <SuggestedAction label="Check Billing" icon={AlertCircle} />
        </div>
      )}

      {/* Input Area */}
      <div className={cn(
        "p-4 border-t",
        theme === 'dark' ? "border-white/10 bg-white/[0.01]" : "border-slate-100 bg-slate-50"
      )}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              setMessages([...messages, { id: Date.now().toString(), role: "user", content: input, timestamp: new Date() }]);
              setInput("");
            }
          }}
          className="relative group"
        >
          <input 
            type="text" 
            className={cn(
              "w-full border rounded-xl py-3 pl-4 pr-12 text-xs outline-none focus:ring-1 focus:ring-orange-500/30 transition-all",
              theme === 'dark' ? "bg-white/5 border-white/10 text-white placeholder:text-slate-600" : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            )}
            placeholder="Ask DISHTV Brain anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-orange-600 text-white hover:bg-orange-500 shadow-lg shadow-orange-900/20 transition-all active:scale-95"
          >
            <Send size={14} />
          </button>
        </form>
        <p className="text-[9px] text-center mt-3 text-slate-600 font-bold uppercase tracking-tighter">
          <Sparkles size={8} className="inline mr-1 text-orange-500" /> AI recommendations based on CRM context
        </p>
      </div>
    </div>
  );
}

function SuggestedAction({ label, icon: Icon }: { label: string, icon: any }) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-all whitespace-nowrap">
      <Icon size={10} />
      {label}
    </button>
  );
}
