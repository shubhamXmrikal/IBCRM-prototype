"use client";

import React, { useState, useEffect } from "react";
import { LoyaltyWallet, LoyaltyTransaction } from "../../../domain/loyalty/LoyaltyTypes";

interface LoyaltyOverviewCardProps {
  vcNumber: string;
}

export default function LoyaltyOverviewCard({ vcNumber }: LoyaltyOverviewCardProps) {
  const [data, setData] = useState<{ wallet: LoyaltyWallet | null; history: LoyaltyTransaction[] }>({ wallet: null, history: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/loyalty/balance?vcNumber=${vcNumber}`)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [vcNumber]);

  if (loading) return <div>Loading loyalty balances...</div>;
  if (!data.wallet) return null;

  return (
    <div className="card" style={{ padding: "16px" }}>
      <h4 style={{ margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "8px" }}>
        <span>🏆</span> Unified Loyalty Rewards
      </h4>

      <div style={styles.walletGrid}>
        <div style={styles.walletItem}>
          <div style={styles.label}>DTH Points</div>
          <div style={{ ...styles.value, color: "var(--brand-primary)" }}>{data.wallet.dthPoints}</div>
          <div style={styles.subtext}>For Pack/Alacarte</div>
        </div>
        <div style={styles.walletItem}>
          <div style={styles.label}>Movie Credits</div>
          <div style={{ ...styles.value, color: "#ea580c" }}>{data.wallet.movieCredits}</div>
          <div style={styles.subtext}>Free MOD Access</div>
        </div>
        <div style={styles.walletItem}>
          <div style={styles.label}>DishFlix Amt</div>
          <div style={{ ...styles.value, color: "#8b5cf6" }}>₹{data.wallet.dishFlixAmount}</div>
          <div style={styles.subtext}>Voucher Balance</div>
        </div>
      </div>

      <div style={styles.expiry}>
        Points expire on: <strong>{new Date(data.wallet.expiryDate).toLocaleDateString()}</strong>
      </div>

      {data.history.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <div style={styles.label}>Recent Activity</div>
          <div style={styles.historyList}>
            {data.history.map(t => (
              <div key={t.id} style={styles.historyItem}>
                <div style={{ fontSize: "12px" }}>{t.description}</div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: t.type === "EARNED" ? "#16a34a" : "#ef4444" }}>
                  {t.points > 0 ? "+" : ""}{t.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  walletGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" },
  walletItem: { padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" },
  label: { fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: 700, marginBottom: "4px" },
  value: { fontSize: "20px", fontWeight: 800 },
  subtext: { fontSize: "9px", color: "#94a3b8", marginTop: "2px" },
  expiry: { fontSize: "11px", color: "#64748b", textAlign: "center", paddingTop: "8px", borderTop: "1px solid #f1f5f9" },
  historyList: { display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" },
  historyItem: { display: "flex", justifyContent: "space-between", alignItems: "center" }
};
