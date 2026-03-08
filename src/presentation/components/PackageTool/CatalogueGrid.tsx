"use client";

import React from "react";
import { PackageItem } from "../../../domain/package/PackageTypes";
import { Plus, Zap, Star, ShieldCheck } from "lucide-react";
import { cn } from "../../../lib/utils";

interface CatalogueGridProps {
  catalogue: PackageItem[];
  onOptIn: (pkg: PackageItem) => void;
}

export default function CatalogueGrid({ catalogue, onOptIn }: CatalogueGridProps) {
  const categories = ["BASE", "ADDON", "ALACARTE", "VAS", "PROMO"];

  return (
    <div className="space-y-6 pb-10">
      {categories.map((cat) => {
        const items = catalogue.filter((p) => p.category === cat);
        if (items.length === 0) return null;

        return (
          <div key={cat} className="space-y-2">
            <div className="flex items-center gap-2 px-1 mb-3">
               <div className="h-px flex-1 bg-white/5" />
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">{cat}</span>
               <div className="h-px flex-1 bg-white/5" />
            </div>
            
            <div className="grid grid-cols-1 gap-1.5">
              {items.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className="group p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 hover:bg-orange-500/[0.02] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors",
                      pkg.isHD ? "bg-blue-500/10 border-blue-500/20 text-blue-500" : "bg-slate-800 border-white/5 text-slate-500"
                    )}>
                      {pkg.isHD ? <Zap size={14} fill="currentColor" /> : <Plus size={14} />}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-300 group-hover:text-slate-100 transition-colors flex items-center gap-2">
                        {pkg.name}
                        {pkg.requiresConsent && <ShieldCheck size={10} className="text-amber-500" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono font-bold text-orange-500">₹{pkg.price}</span>
                        <span className="text-[9px] text-slate-600 uppercase font-medium">{pkg.isHD ? "High Definition" : "Standard"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onOptIn(pkg)}
                    className="opacity-0 group-hover:opacity-100 h-7 px-3 rounded-lg bg-orange-600 text-white text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-orange-600/20 hover:bg-orange-500 transition-all"
                  >
                    Activate
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
