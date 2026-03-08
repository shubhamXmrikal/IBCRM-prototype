"use client";

import React, { useState, useEffect } from "react";
import { LoyaltyWallet, LoyaltyTransaction } from "../../../domain/loyalty/LoyaltyTypes";
import { useAgentStore } from "../../../store/useAgentStore";
import { cn } from "../../../lib/utils";
import { Trophy, Coins, Tv, CreditCard, Calendar, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface LoyaltyOverviewCardProps {
  vcNumber: string;
}

export default function LoyaltyOverviewCard({ vcNumber }: LoyaltyOverviewCardProps) {
  const [data, setData] = useState<{ wallet: LoyaltyWallet | null; history: LoyaltyTransaction[] }>({ wallet: null, history: [] });
  const [loading, setLoading] = useState(true);
  const { theme } = useAgentStore();

  useEffect(() => {
    fetch(`/api/loyalty/balance?vcNumber=${vcNumber}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [vcNumber]);

  if (loading) return (
    <div className="p-8 text-center animate-pulse space-y-3">
      <Trophy className="mx-auto text-slate-700 w-10 h-10" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Syncing Rewards...</p>
    </div>
  );
  
  if (!data.wallet) return null;

  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "rounded-3xl overflow-hidden border transition-all duration-500",
      isDark ? "bg-white/[0.02] border-white/5 shadow-2xl" : "bg-white border-slate-200 shadow-xl"
    )}>
      {/* Header */}
      <div className={cn(
        "px-6 py-4 border-b flex items-center justify-between",
        isDark ? "bg-white/[0.02] border-white/5" : "bg-slate-50 border-slate-100"
      )}>
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-orange-500" />
          <h3 className={cn(
            "text-xs font-black uppercase tracking-widest",
            isDark ? "text-slate-200" : "text-slate-800"
          )}>
            Unified Loyalty Rewards
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[9px] font-black uppercase tracking-tighter">
          <Calendar size={10} /> Exp: {new Date(data.wallet.expiryDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Wallet Grid */}
        <div className="grid grid-cols-3 gap-4">
          <WalletItem 
            icon={Coins} 
            label="DTH Points" 
            value={data.wallet.dthPoints.toString()} 
            sub="Pack Credits"
            color="text-orange-500"
            theme={theme}
          />
          <WalletItem 
            icon={Tv} 
            label="Movie Credits" 
            value={data.wallet.movieCredits.toString()} 
            sub="MOD Access"
            color="text-emerald-500"
            theme={theme}
          />
          <WalletItem 
            icon={CreditCard} 
            label="DishFlix Amt" 
            value={`₹${data.wallet.dishFlixAmount}`} 
            sub="Voucher Bal"
            color="text-blue-500"
            theme={theme}
          />
        </div>

        {/* Recent Activity */}
        {data.history.length > 0 && (
          <div className="space-y-3">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Recent Activity</div>
            <div className="space-y-2">
              {data.history.map(t => (
                <div key={t.id} className={cn(
                  "p-3 rounded-xl border flex items-center justify-between group transition-all",
                  isDark ? "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]" : "bg-slate-50/50 border-slate-100 hover:bg-slate-50"
                )}>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      t.type === "EARNED" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                    )}>
                      {t.type === "EARNED" ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                    </div>
                    <div>
                      <div className={cn("text-[11px] font-bold", isDark ? "text-slate-300" : "text-slate-700")}>{t.description}</div>
                      <div className="text-[9px] text-slate-500 font-medium">#{t.id}</div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-xs font-black font-mono",
                    t.type === "EARNED" ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {t.points > 0 ? "+" : ""}{t.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WalletItem({ icon: Icon, label, value, sub, color, theme }: any) {
  const isDark = theme === 'dark';
  return (
    <div className={cn(
      "p-4 rounded-2xl border text-center transition-all group hover:scale-105",
      isDark ? "bg-white/[0.02] border-white/5 hover:border-white/10" : "bg-white border-slate-100 hover:border-slate-200"
    )}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:rotate-12", isDark ? "bg-white/5" : "bg-slate-50")}>
        <Icon size={20} className={color} />
      </div>
      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</div>
      <div className={cn("text-xl font-black font-mono tracking-tighter", color)}>{value}</div>
      <div className="text-[9px] text-slate-600 font-bold uppercase mt-1 opacity-60">{sub}</div>
    </div>
  );
}
