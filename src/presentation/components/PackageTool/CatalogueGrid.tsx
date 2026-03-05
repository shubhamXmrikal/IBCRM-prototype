"use client";

import React, { useState } from "react";
import { PackageItem, PackageCategory } from "../../../domain/package/PackageTypes";

interface CatalogueGridProps {
  catalogue: PackageItem[];
  onOptIn: (pkg: PackageItem) => void;
}

export default function CatalogueGrid({ catalogue, onOptIn }: CatalogueGridProps) {
  const [filter, setFilter] = useState<PackageCategory | "ALL">("ALL");

  const filtered = filter === "ALL" ? catalogue : catalogue.filter(p => p.category === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["ALL", "BASE", "ALACARTE", "ADDON", "VAS", "PROMO"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            style={{
              padding: "4px 12px",
              borderRadius: "16px",
              border: "1px solid var(--border-subtle)",
              backgroundColor: filter === f ? "var(--brand-primary)" : "#f8fafc",
              color: filter === f ? "#fff" : "var(--text-secondary)",
              fontSize: "12px",
              cursor: "pointer"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", overflowY: "auto", paddingBottom: "24px" }}>
        {filtered.map(pkg => (
          <div key={pkg.id} className="card" style={{ padding: "16px", marginBottom: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <strong style={{ fontSize: "14px" }}>{pkg.name}</strong>
              {pkg.isHD && <span style={{ backgroundColor: "#3b82f6", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold" }}>HD</span>}
            </div>
            
            <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              Category: {pkg.category}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <strong style={{ fontSize: "16px", color: "#10b981" }}>₹{pkg.price}</strong>
              <button 
                className="btn-primary" 
                style={{ padding: "6px 12px", fontSize: "12px" }}
                onClick={() => onOptIn(pkg)}
              >
                Add Pack
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}