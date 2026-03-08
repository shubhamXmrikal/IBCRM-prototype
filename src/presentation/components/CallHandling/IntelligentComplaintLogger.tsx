"use client";

import React, { useState } from "react";
import { 
  Ticket, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Info,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "../../../lib/utils";
import { useAgentStore } from "../../../store/useAgentStore";

interface IntelligentComplaintLoggerProps {
  onSuccess: () => void;
}

export default function IntelligentComplaintLogger({ onSuccess }: IntelligentComplaintLoggerProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { theme } = useAgentStore();

  const handleLog = async () => {
    setLoading(true);
    try {
      // Mock log
      setSuccessId("TKT-2026-99321");
    } finally {
      setLoading(false);
    }
  };

  const isTech = category === "TECHNICAL_ERROR";

  if (successId) {
    return (
      <div className={cn(
        "p-6 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in duration-300",
        theme === 'dark' ? "text-slate-200" : "text-slate-800"
      )}>
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h2 className={cn(
            "text-sm font-bold uppercase",
            theme === 'dark' ? "text-slate-100" : "text-slate-900"
          )}>Ticket Logged Successfully</h2>
          <p className="text-xl font-black text-emerald-500 font-mono">{successId}</p>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed max-w-[240px]">
          The customer has been notified via SMS. {isTech && "Technician appointment has been scheduled."}
        </p>
        <button 
          onClick={onSuccess}
          className={cn(
            "w-full py-3 rounded-xl border text-xs font-bold transition-all",
            theme === 'dark' ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
          )}
        >
          Return to History
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      theme === 'dark' ? "bg-[#0B0F1A]" : "bg-white"
    )}>
      {/* Stepper Header */}
      <div className={cn(
        "p-4 border-b flex items-center justify-between",
        theme === 'dark' ? "border-white/5 bg-white/[0.01]" : "border-slate-100 bg-slate-50"
      )}>
         <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className={cn(
                "h-1 rounded-full transition-all duration-500",
                step >= i ? "w-8 bg-orange-500" : (theme === 'dark' ? "w-4 bg-slate-800" : "w-4 bg-slate-200")
              )} />
            ))}
         </div>
         <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Step {step} of 3</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="space-y-1">
               <h3 className={cn(
                 "text-xs font-bold uppercase tracking-tight",
                 theme === 'dark' ? "text-slate-200" : "text-slate-800"
               )}>Select Category</h3>
               <p className="text-[10px] text-slate-500">What is the primary reason for this ticket?</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
               <CategoryButton 
                 active={category === 'TECHNICAL_ERROR'} 
                 onClick={() => setCategory('TECHNICAL_ERROR')}
                 label="Technical Error / No Signal"
                 theme={theme}
               />
               <CategoryButton 
                 active={category === 'BILLING_ISSUE'} 
                 onClick={() => setCategory('BILLING_ISSUE')}
                 label="Billing & Payment Dispute"
                 theme={theme}
               />
               <CategoryButton 
                 active={category === 'PACKAGE_MOD'} 
                 onClick={() => setCategory('PACKAGE_MOD')}
                 label="Package Modification Inquiry"
                 theme={theme}
               />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="space-y-1">
               <h3 className={cn(
                 "text-xs font-bold uppercase tracking-tight",
                 theme === 'dark' ? "text-slate-200" : "text-slate-800"
               )}>Describe Issue</h3>
               <p className="text-[10px] text-slate-500">Add operational remarks for the fulfillment team</p>
            </div>
            <textarea 
              className={cn(
                "w-full h-32 border rounded-xl py-3 px-4 text-xs outline-none focus:border-orange-500/50 transition-all",
                theme === 'dark' ? "bg-white/5 border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-900"
              )}
              placeholder="Enter detailed description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="space-y-1">
               <h3 className={cn(
                 "text-xs font-bold uppercase tracking-tight",
                 theme === 'dark' ? "text-slate-200" : "text-slate-800"
               )}>Confirmation</h3>
               <p className="text-[10px] text-slate-500">Review ticket details before logging</p>
            </div>
            <div className={cn(
              "p-4 rounded-2xl border space-y-4",
              theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"
            )}>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Category</span>
                  <span className={cn("text-[10px] font-black uppercase", theme === 'dark' ? "text-slate-200" : "text-slate-900")}>{category}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Priority</span>
                  <span className="text-[10px] font-black uppercase text-orange-500">High (P1)</span>
               </div>
               <div className="pt-3 border-t border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Remarks</span>
                  <p className={cn("text-[11px] leading-relaxed", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>{description || "No remarks provided"}</p>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className={cn(
        "p-6 border-t flex gap-3",
        theme === 'dark' ? "border-white/5 bg-white/[0.01]" : "border-slate-100 bg-slate-50"
      )}>
        {step > 1 && (
          <button 
            onClick={() => setStep(step - 1)}
            className={cn(
              "flex-1 py-3.5 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border",
              theme === 'dark' ? "bg-white/5 border-white/5 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
            )}
          >
            Back
          </button>
        )}
        <button 
          onClick={() => step < 3 ? setStep(step + 1) : handleLog()}
          disabled={step === 1 && !category}
          className={cn(
            "flex-[2] py-3.5 rounded-2xl bg-orange-600 text-white text-xs font-black uppercase tracking-tighter shadow-lg shadow-orange-900/20 hover:bg-orange-500 active:scale-95 transition-all disabled:opacity-50",
            step === 1 && !category ? "cursor-not-allowed" : ""
          )}
        >
          {loading ? "Processing..." : (step === 3 ? "Log Ticket" : "Continue")}
        </button>
      </div>
    </div>
  );
}

function CategoryButton({ active, onClick, label, theme }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-2xl border flex items-center justify-between transition-all group",
        active 
          ? "bg-orange-600/10 border-orange-500/50 text-orange-500" 
          : (theme === 'dark' ? "bg-white/[0.02] border-white/5 text-slate-500 hover:bg-white/[0.04]" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50")
      )}
    >
      <span className="text-[11px] font-bold uppercase tracking-tight">{label}</span>
      <ChevronRight size={14} className={cn("transition-transform", active ? "translate-x-1" : "opacity-0 group-hover:opacity-100")} />
    </button>
  );
}
