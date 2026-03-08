"use client";

import React, { useState, useEffect } from "react";
import { RechargeValidation, RechargeDueInfo } from "../../../domain/recharge/RechargeTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  X,
  CreditCard,
  History,
  Activity
} from "lucide-react";

interface RechargeWorkflowPanelProps {
  vcNumber: string;
  smsId: string;
  onClose: () => void;
}

export default function RechargeWorkflowPanel({ vcNumber, smsId, onClose }: RechargeWorkflowPanelProps) {
  const [step, setStep] = useState(1);
  const [validation, setValidation] = useState<RechargeValidation | null>(null);
  const [dueInfo, setDueInfo] = useState<RechargeDueInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useAgentStore();

  useEffect(() => {
    if (step === 1) validateSystem();
  }, [vcNumber, step]);

  const validateSystem = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/recharge/validate?vcNumber=${vcNumber}`);
      if (res.ok) {
        const data = await res.json();
        setValidation(data);
      } else {
        setError("System validation failed. Please check VC/STB status.");
      }
    } catch (e) {
      setError("Network error during validation.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDueAmount = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recharge/due?smsId=${smsId}`);
      if (res.ok) {
        const data = await res.json();
        setDueInfo(data);
        setStep(2);
      }
    } catch (e) {
      setError("Failed to calculate due amount.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setStep(3);
      setLoading(false);
    }, 1500);
  };

  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 flex flex-col",
      isDark ? "bg-[#0B0F1A] border-white/10" : "bg-white border-slate-200"
    )}>
      {/* Header */}
      <div className={cn(
        "px-6 py-4 border-b flex items-center justify-between",
        isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-600/10 flex items-center justify-center border border-orange-500/20">
            <Zap size={20} className="text-orange-500" />
          </div>
          <div>
            <h3 className={cn(
              "text-sm font-black uppercase tracking-widest",
              isDark ? "text-slate-200" : "text-slate-800"
            )}>
              Recharge Workflow
            </h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              VC: {vcNumber}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-rose-500 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-8">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 -z-0 mx-10" />
          <StepIndicator current={step} target={1} label="Validate" theme={theme} />
          <StepIndicator current={step} target={2} label="Due Amount" theme={theme} />
          <StepIndicator current={step} target={3} label="Finish" theme={theme} />
        </div>

        <div className="min-h-[300px] flex flex-col">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-1">
                <h4 className={cn("text-xs font-black uppercase tracking-widest", isDark ? "text-slate-400" : "text-slate-500")}>
                  Step 1: System Validation (CheckVCSTB)
                </h4>
                <p className="text-[10px] text-slate-500">Running 45+ eligibility checks across legacy and ZT systems...</p>
              </div>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-4">
                  <Activity className="text-orange-500 animate-spin" size={32} />
                  <p className="text-xs font-bold text-slate-500 animate-pulse uppercase tracking-widest">Validating Ecosystem Status...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {validation ? (
                    <>
                      <div className={cn(
                        "grid grid-cols-2 gap-3 p-4 rounded-2xl border",
                        isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200"
                      )}>
                        <DetailRow label="Subscriber Status" value={validation.statusName} theme={theme} />
                        <DetailRow label="HD Enabled" value={validation.isHD ? "Yes" : "No"} theme={theme} />
                        <DetailRow label="Amnesty Eligible" value={validation.isAmnestyAllowed ? "✅ YES" : "No"} theme={theme} />
                        <DetailRow label="Migration Policy" value={validation.isPkgMigAllowed ? "ALLOWED" : "RESTRICTED"} theme={theme} />
                      </div>
                      
                      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                        <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-blue-600/80 leading-relaxed font-medium">
                          System readiness confirmed. This subscriber is eligible for instant top-up via standard gateway protocols.
                        </p>
                      </div>

                      <button 
                        onClick={fetchDueAmount}
                        className="w-full py-4 rounded-2xl bg-orange-600 text-white text-sm font-black uppercase tracking-tighter shadow-xl shadow-orange-900/20 hover:bg-orange-500 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        Proceed to Due Amount <ArrowRight size={18} />
                      </button>
                    </>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-500">
                      <AlertTriangle size={18} />
                      <p className="text-xs font-bold uppercase tracking-widest">{error || "Validation Pending"}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-1">
                <h4 className={cn("text-xs font-black uppercase tracking-widest", isDark ? "text-slate-400" : "text-slate-500")}>
                  Step 2: Recharge Due Calculation
                </h4>
                <p className="text-[10px] text-slate-500">Consolidating monthly plan, pending arrears, and service fees.</p>
              </div>

              <div className={cn(
                "p-8 rounded-3xl border text-center space-y-2 relative overflow-hidden",
                isDark ? "bg-orange-500/5 border-orange-500/20" : "bg-orange-50 border-orange-100"
              )}>
                <div className="absolute -right-4 -top-4 opacity-5 text-orange-500">
                  <CreditCard size={120} />
                </div>
                <div className="text-[10px] font-black text-orange-500/80 uppercase tracking-[0.2em]">Total Amount Payable</div>
                <div className={cn("text-5xl font-black font-mono tracking-tighter", isDark ? "text-slate-100" : "text-slate-900")}>
                  ₹{dueInfo?.dueAmount.toFixed(2)}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase">Includes GST + Arrears</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={cn("p-4 rounded-2xl border", isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100")}>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Overdue Days</div>
                  <div className={cn("text-lg font-black", isDark ? "text-slate-200" : "text-slate-800")}>{dueInfo?.overdueDays}</div>
                </div>
                <div className={cn(
                  "p-4 rounded-2xl border",
                  (dueInfo?.daysBeforeChurn || 0) < 30 ? "bg-rose-500/5 border-rose-500/20" : (isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100")
                )}>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Days Before Churn</div>
                  <div className={cn(
                    "text-lg font-black",
                    (dueInfo?.daysBeforeChurn || 0) < 30 ? "text-rose-500" : (isDark ? "text-slate-200" : "text-slate-800")
                  )}>{dueInfo?.daysBeforeChurn}</div>
                </div>
              </div>

              <button 
                onClick={handleSimulatePayment} 
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-emerald-600 text-white text-sm font-black uppercase tracking-tighter shadow-xl shadow-emerald-900/20 hover:bg-emerald-500 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Processing via PG..." : "Process Simulated Payment"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border-2 border-emerald-500/20">
                <CheckCircle2 size={48} className="text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h4 className={cn("text-2xl font-black tracking-tight", isDark ? "text-slate-100" : "text-slate-900")}>
                  Recharge Successful!
                </h4>
                <p className="text-sm text-slate-500 max-w-[320px] mx-auto leading-relaxed">
                  The ecosystem has been updated. A confirmation SMS with transaction ID <span className="font-mono font-bold text-orange-500">TXN_992211</span> has been dispatched to the RMN.
                </p>
              </div>
              <button 
                onClick={onClose}
                className={cn(
                  "px-8 py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all",
                  isDark ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                )}
              >
                Close Recharge Workflow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ current, target, label, theme }: any) {
  const active = current >= target;
  const isDark = theme === 'dark';
  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 border-2",
        active 
          ? "bg-orange-600 border-orange-500 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)] scale-110" 
          : (isDark ? "bg-[#0B0F1A] border-slate-800 text-slate-700" : "bg-white border-slate-200 text-slate-300")
      )}>
        {current > target ? <CheckCircle2 size={16} /> : target}
      </div>
      <span className={cn(
        "text-[9px] font-black uppercase tracking-widest transition-colors duration-500",
        active ? "text-orange-500" : "text-slate-700"
      )}>{label}</span>
    </div>
  );
}

function DetailRow({ label, value, theme }: any) {
  const isDark = theme === 'dark';
  return (
    <div className="space-y-0.5">
      <div className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">{label}</div>
      <div className={cn("text-xs font-black", isDark ? "text-slate-200" : "text-slate-800")}>{value}</div>
    </div>
  );
}
