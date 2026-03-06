"use client";

import React, { useState, useEffect } from "react";
import { KittyAlacarte } from "../../../domain/package/AlacarteTypes";

interface KittyRedemptionPanelProps {
  smsId: string;
}

export default function KittyRedemptionPanel({ smsId }: KittyRedemptionPanelProps) {
  const [balance, setBalance] = useState(0);
  const [options, setOptions] = useState<KittyAlacarte[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setLoadingSubmit] = useState(false);

  useEffect(() => {
    fetchKitty();
  }, [smsId]);

  const fetchKitty = async () => {
    setLoading(true);
    const res = await fetch(`/api/packages/kitty?smsId=${smsId}`);
    if (res.ok) {
      const data = await res.json();
      setBalance(data.balance);
      setOptions(data.options);
    }
    setLoading(false);
  };

  const handleToggle = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalRequired = options
    .filter(o => selected.includes(o.packageId))
    .reduce((sum, o) => sum + o.pointsRequired, 0);

  const handleRedeem = async () => {
    if (totalRequired > balance) {
      alert("Insufficient kitty balance!");
      return;
    }

    setLoadingSubmit(true);
    const res = await fetch("/api/packages/kitty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ smsId, packageIds: selected })
    });

    if (res.ok) {
      const data = await res.json();
      alert(`Redemption successful! Form No: ${data.formNo}`);
      setSelected([]);
      fetchKitty();
    }
    setLoadingSubmit(false);
  };

  if (loading) return <div>Loading Kitty details...</div>;
  if (options.length === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={{ margin: 0 }}>Kitty Alacarte (Loyalty)</h4>
        <div style={styles.balanceBadge}>Balance: <strong>{balance} pts</strong></div>
      </div>

      <div style={styles.list}>
        {options.map(opt => (
          <div key={opt.packageId} style={styles.item}>
            <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input 
                type="checkbox" 
                checked={selected.includes(opt.packageId)} 
                onChange={() => handleToggle(opt.packageId)}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>{opt.packageName}</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Points Required: {opt.pointsRequired}</div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <div style={{ fontSize: "12px" }}>
          Selected: <strong>{selected.length}</strong> | Required: <strong style={{ color: totalRequired > balance ? "#ef4444" : "inherit" }}>{totalRequired} pts</strong>
        </div>
        <button 
          onClick={handleRedeem} 
          disabled={selected.length === 0 || totalRequired > balance || submitting}
          style={{ ...styles.redeemBtn, opacity: (selected.length === 0 || totalRequired > balance || submitting) ? 0.5 : 1 }}
        >
          {submitting ? "Processing..." : "Redeem Now"}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    background: "#fff7ed",
    border: "1px solid #ffedd5",
    borderRadius: "8px",
    marginTop: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  balanceBadge: {
    background: "#ffedd5",
    color: "#9a3412",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  item: {
    padding: "8px",
    background: "white",
    borderRadius: "4px",
    border: "1px solid #fed7aa",
  },
  footer: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: "1px solid #fed7aa",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  redeemBtn: {
    padding: "6px 12px",
    background: "#ea580c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  }
};
