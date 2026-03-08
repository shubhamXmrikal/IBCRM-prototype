"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Gift, 
  Zap, 
  ArrowUpCircle,
  Coins,
  ChevronRight,
  Info
} from "lucide-react";
import { cn } from "../../../lib/utils";

export default function FestiveOffersTab({ vcNumber }: { vcNumber: string }) {
  const [offers, setOffers] = useState<any[]>([]);
  const [cashback, setCashback] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/campaigns/festive?vcNumber=${vcNumber}`);
        const data = await res.json();
        setOffers(data.offers || []);
        setCashback(data.cashback);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, [vcNumber]);

  if (loading) return <div className="p-8 text-center animate-pulse text-slate-600 font-bold uppercase text-[10px]">Checking Eligibility...</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Cashback Hero */}
      {cashback?.isEligible && (
        <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 shadow-xl shadow-orange-900/20">
          <div className="absolute -right-4 -top-4 opacity-20">
             <Coins size={100} />
          </div>
          <div className="relative z-10 flex flex-col gap-1">
             <div className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-100">Festive Cashback Active</div>
             <div className="text-2xl font-black text-white">₹{cashback.amount}.00 <span className="text-sm font-medium opacity-80 underline">Credit Available</span></div>
             <p className="text-[10px] text-orange-100/80 mt-1 max-w-[200px]">Applicable on recharges above ₹500 before {new Date(cashback.expiryDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      {/* Campaigns & Upgrades */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
           <Gift size={14} className="text-orange-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Available Promotions</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {offers.map((offer) => (
            <div key={offer.id} className="group p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-orange-500/20 transition-all flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                     {offer.type === 'UPGRADE' ? <ArrowUpCircle className="text-blue-400" /> : <Sparkles className="text-amber-400" />}
                  </div>
                  <div>
                     <div className="text-[11px] font-bold text-slate-200">{offer.title}</div>
                     <div className="text-[9px] text-slate-500 font-medium">{offer.description}</div>
                  </div>
               </div>
               <button className="p-2 rounded-full bg-orange-600/10 text-orange-500 hover:bg-orange-600 hover:text-white transition-all">
                  <ChevronRight size={14} />
               </button>
            </div>
          ))}

          {offers.length === 0 && (
            <div className="p-8 text-center bg-white/[0.01] border border-dashed border-white/5 rounded-2xl">
               <Info size={24} className="mx-auto mb-2 text-slate-700" />
               <p className="text-[10px] font-bold text-slate-600 uppercase">No active campaigns for this zone</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
