"use client";

import React, { useState, useEffect } from "react";
import { VIPStatus, VIPBenefit } from "../../../domain/loyalty/LoyaltyTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { Star, ShieldCheck, X, Crown, Zap, Gift, Trophy } from "lucide-react";

interface VIPStatusBadgeProps {
  vcNumber: string;
}

export default function VIPStatusBadge({ vcNumber }: VIPStatusBadgeProps) {
  const [data, setData] = useState<{ status: VIPStatus | null; benefits: VIPBenefit[] }>({ status: null, benefits: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const { theme } = useAgentStore();

  useEffect(() => {
    fetchData();
  }, [vcNumber]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/loyalty/vip?vcNumber=${vcNumber}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    const res = await fetch("/api/loyalty/vip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vcNumber })
    });
    if (res.ok) {
      alert("Subscriber successfully enrolled in DishVIP!");
      setShowModal(false);
      fetchData();
    } else {
      const err = await res.json();
      alert(err.error);
    }
    setEnrolling(false);
  };

  if (loading || !data.status) return null;

  const { status, benefits } = data;
  const isDark = theme === 'dark';

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className={cn(
          "px-2 py-1 rounded flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
          status.isVIP 
            ? "bg-amber-500/20 text-amber-500 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]" 
            : (isDark ? "bg-white/5 text-slate-500 border border-white/5" : "bg-slate-100 text-slate-500 border border-slate-200")
        )}
      >
        {status.isVIP ? <Star size={10} fill="currentColor" /> : <ShieldCheck size={10} />}
        {status.isVIP ? "DishVIP Member" : "Check VIP Eligibility"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={cn(
            "w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500",
            isDark ? "bg-[#0B0F1A] border-white/10" : "bg-white border-slate-200"
          )}>
            {/* Modal Header */}
            <div className={cn(
              "px-6 py-4 border-b flex items-center justify-between",
              isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
            )}>
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-amber-500" />
                <h3 className={cn(
                  "text-xs font-black uppercase tracking-widest",
                  isDark ? "text-slate-200" : "text-slate-800"
                )}>
                  DishVIP Premium Program
                </h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-white/5 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {status.isVIP ? (
                <div className="text-center space-y-3 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                  <Trophy size={48} className="text-amber-500 mx-auto" />
                  <div className="space-y-1">
                    <h4 className={cn("text-sm font-bold uppercase", isDark ? "text-slate-100" : "text-slate-900")}>
                      Premium Member Since {new Date(status.enrolledOn!).toLocaleDateString()}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">Full benefits active for this elite subscriber.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {status.isEligible ? (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                      <div className="flex items-center gap-2 text-emerald-500 font-black text-[11px] uppercase tracking-widest">
                        <Star size={14} fill="currentColor" /> Subscriber is Eligible!
                      </div>
                      <p className="text-xs text-emerald-600/80 font-medium pl-6">{status.eligibilityReason}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                      <div className="flex items-center gap-2 text-rose-500 font-black text-[11px] uppercase tracking-widest">
                        <X size={14} /> Not Eligible for VIP
                      </div>
                      <p className="text-xs text-rose-600/80 font-medium pl-6">{status.eligibilityReason}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Benefits Grid */}
              <div className="space-y-3">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Active Privileges</div>
                <div className="grid grid-cols-1 gap-2">
                  {benefits.map(b => (
                    <div key={b.id} className={cn(
                      "p-3 rounded-xl border flex items-center gap-3 transition-all",
                      isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
                    )}>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-lg">{b.icon}</div>
                      <div>
                        <div className={cn("text-[11px] font-bold", isDark ? "text-slate-200" : "text-slate-800")}>{b.name}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{b.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {!status.isVIP && status.isEligible && (
                <button 
                  onClick={handleEnroll} 
                  disabled={enrolling}
                  className="w-full py-4 rounded-2xl bg-amber-600 text-white text-sm font-black uppercase tracking-tighter shadow-xl shadow-amber-900/20 hover:bg-amber-500 active:scale-95 transition-all disabled:opacity-50"
                >
                  {enrolling ? "Enrolling..." : "Enroll in DishVIP Now 🚀"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
