"use client";

import React, { useState, useEffect } from "react";
import { 
  Coins, 
  Gift, 
  ChevronRight, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "../../../lib/utils";

export default function KittyRedemptionPanel({ vcNumber }: { vcNumber: string }) {
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [selectedIds, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKitty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/mod/kitty?vcNumber=${vcNumber}`);
        const data = await res.json();
        setBalance(data.balance);
        setItems(data.redeemableItems || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchKitty();
  }, [vcNumber]);

  const toggleSelect = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalRequired = items
    .filter(i => selectedIds.includes(i.id))
    .reduce((sum, i) => sum + i.pointsRequired, 0);

  const canRedeem = selectedIds.length > 0 && totalRequired <= balance;

  if (loading) return null;

  return (
    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
      {/* Balance Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Coins size={16} className="text-amber-500" />
           </div>
           <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500">Kitty Loyalty Balance</div>
              <div className="text-sm font-bold text-slate-200">{balance} Points</div>
           </div>
        </div>
        {selectedIds.length > 0 && (
           <div className={cn(
             "text-right",
             totalRequired > balance ? "text-rose-500" : "text-emerald-500"
           )}>
              <div className="text-[8px] font-bold uppercase tracking-tighter">Required</div>
              <div className="text-xs font-black">{totalRequired} Pts</div>
           </div>
        )}
      </div>

      {/* Redemption List */}
      <div className="space-y-1.5 max-h-[200px] overflow-y-auto scrollbar-hide pr-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={cn(
              "w-full p-2 rounded-xl border flex items-center justify-between transition-all",
              selectedIds.includes(item.id)
                ? "bg-orange-600/10 border-orange-500/30 text-orange-500"
                : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10"
            )}
          >
            <div className="flex items-center gap-2">
               <div className={cn(
                 "w-5 h-5 rounded-full flex items-center justify-center border",
                 selectedIds.includes(item.id) ? "border-orange-500 bg-orange-500 text-white" : "border-slate-700"
               )}>
                  {selectedIds.includes(item.id) && <CheckCircle2 size={12} />}
               </div>
               <span className="text-[11px] font-medium">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold">{item.pointsRequired} Pts</span>
          </button>
        ))}
      </div>

      <button
        disabled={!canRedeem}
        className={cn(
          "w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
          canRedeem 
            ? "bg-amber-600 text-white shadow-lg shadow-amber-900/20 hover:bg-amber-500" 
            : "bg-slate-800 text-slate-600 cursor-not-allowed"
        )}
      >
        {totalRequired > balance ? "Insufficient Balance" : "Redeem Now"}
      </button>
    </div>
  );
}
