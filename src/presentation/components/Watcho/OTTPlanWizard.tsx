"use client";

import React, { useState, useEffect } from "react";
import { OTTPlan, WatchoCoupon } from "../../../domain/watcho/WatchoTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { X, CheckCircle2, Ticket, Zap, ArrowRight, ArrowLeft, Smartphone, ShieldCheck } from "lucide-react";

interface OTTPlanWizardProps {
  vcNumber: string;
  plans: OTTPlan[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function OTTPlanWizard({ vcNumber, plans, onClose, onSuccess }: OTTPlanWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState<WatchoCoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<WatchoCoupon | null>(null);
  const { theme } = useAgentStore();

  useEffect(() => {
    fetch("/api/watcho/coupons")
      .then(res => res.json())
      .then(data => setCoupons(data));
  }, []);

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode && !c.isRedeemed);
    if (coupon) {
      setAppliedCoupon(coupon);
    } else {
      alert("Invalid or expired coupon code.");
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/watcho/subscriber", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "subscribe", 
          vcNumber, 
          planId: selectedPlan,
          couponCode: appliedCoupon?.code
        })
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Plan activated! Form No: ${data.formNo}`);
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const plan = plans.find(p => p.id === selectedPlan);
  const finalPrice = plan ? Math.max(0, plan.price - (appliedCoupon?.discountAmount || 0)) : 0;
  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "flex flex-col h-full transition-colors duration-500",
      isDark ? "bg-[#0B0F1A]" : "bg-white"
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
            <h3 className={cn("text-sm font-black uppercase tracking-widest", isDark ? "text-slate-200" : "text-slate-800")}>
              Watcho Plan Wizard
            </h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">New Subscription</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-white/5 text-slate-500 hover:text-rose-500 transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-8 relative px-4">
          <div className={cn("absolute left-10 right-10 top-[15px] h-0.5 -z-0", isDark ? "bg-slate-800" : "bg-slate-100")} />
          <StepNode active={step >= 1} current={step === 1} label="Select Plan" target={1} theme={theme} />
          <StepNode active={step >= 2} current={step === 2} label="Review" target={2} theme={theme} />
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <div className="grid grid-cols-1 gap-3">
              {plans.map(p => (
                <button 
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={cn(
                    "text-left p-4 rounded-2xl border transition-all flex items-center justify-between group",
                    selectedPlan === p.id 
                      ? "bg-orange-600/10 border-orange-500/50" 
                      : (isDark ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]" : "bg-white border-slate-200 hover:bg-slate-50")
                  )}
                >
                  <div className="space-y-1">
                    <div className={cn("text-[11px] font-black uppercase tracking-widest", selectedPlan === p.id ? "text-orange-500" : "text-slate-500")}>
                      {p.name}
                    </div>
                    <div className={cn("text-xs font-medium", isDark ? "text-slate-400" : "text-slate-600")}>
                      {p.description}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-lg font-black font-mono text-orange-500">₹{p.price}</span>
                       <span className="text-[10px] text-slate-600 font-bold uppercase">/ Month</span>
                    </div>
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                    selectedPlan === p.id ? "bg-orange-500 border-orange-500" : "border-slate-800"
                  )}>
                    {selectedPlan === p.id && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && plan && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className={cn(
              "p-5 rounded-2xl border space-y-4",
              isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-200 shadow-inner"
            )}>
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Plan Summary</span>
                <span className="text-orange-500">#{plan.id}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={cn("text-xs font-bold", isDark ? "text-slate-300" : "text-slate-700")}>Monthly Subscription</span>
                  <span className={cn("text-sm font-black font-mono", isDark ? "text-slate-100" : "text-slate-900")}>₹{plan.price}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-emerald-500 animate-in slide-in-from-top-2">
                    <span className="text-xs font-bold flex items-center gap-1.5"><Ticket size={12} /> Promo: {appliedCoupon.code}</span>
                    <span className="text-sm font-black font-mono">- ₹{appliedCoupon.discountAmount}</span>
                  </div>
                )}

                <div className={cn("pt-3 border-t mt-2 flex justify-between items-center", isDark ? "border-white/5" : "border-slate-200")}>
                  <span className={cn("text-xs font-black uppercase", isDark ? "text-slate-100" : "text-slate-900")}>Total Payable</span>
                  <span className="text-xl font-black font-mono text-orange-500 tracking-tighter">₹{finalPrice}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Apply Coupon</label>
              <div className="flex gap-2">
                <input 
                  className={cn(
                    "flex-1 border rounded-xl px-4 py-3 text-xs outline-none focus:border-orange-500/50 transition-all uppercase font-black tracking-widest",
                    isDark ? "bg-white/5 border-white/10 text-slate-200 placeholder:text-slate-700" : "bg-white border-slate-200 text-slate-900"
                  )}
                  placeholder="CODE2026"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />
                <button 
                  onClick={handleApplyCoupon}
                  className={cn(
                    "px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-900 text-white hover:bg-slate-800"
                  )}
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] text-blue-600/80 leading-relaxed font-medium">
                The plan will be activated immediately. Prorated charges will be applied to the next billing cycle.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className={cn(
        "p-6 border-t mt-auto flex gap-3",
        isDark ? "bg-white/[0.01] border-white/5" : "bg-slate-50 border-slate-100"
      )}>
        {step === 2 && (
          <button 
            onClick={() => setStep(1)}
            className={cn(
              "flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
              isDark ? "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
            )}
          >
            Back
          </button>
        )}
        <button 
          onClick={() => step === 1 ? setStep(2) : handleSubscribe()}
          disabled={step === 1 && !selectedPlan}
          className={cn(
            "flex-[2] py-3.5 rounded-2xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-900/20 hover:bg-orange-500 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50",
            step === 1 && !selectedPlan ? "cursor-not-allowed" : ""
          )}
        >
          {loading ? "Processing..." : (step === 1 ? "Continue to Review" : "Confirm Subscription")}
          {!loading && <ArrowRight size={14} />}
        </button>
      </div>
    </div>
  );
}

function StepNode({ active, current, label, target, theme }: any) {
  const isDark = theme === 'dark';
  return (
    <div className="flex flex-col items-center gap-2 z-10">
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-500 border-2",
        active 
          ? "bg-orange-600 border-orange-500 text-white shadow-[0_0_15px_rgba(234,88,12,0.3)] scale-110" 
          : (isDark ? "bg-[#0B0F1A] border-slate-800 text-slate-700" : "bg-white border-slate-200 text-slate-300")
      )}>
        {target}
      </div>
      <span className={cn(
        "text-[9px] font-black uppercase tracking-widest transition-colors duration-500",
        active ? "text-orange-500" : "text-slate-700"
      )}>{label}</span>
    </div>
  );
}
