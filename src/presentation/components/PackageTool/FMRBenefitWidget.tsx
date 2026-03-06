"use client";

import React, { useState, useEffect } from "react";
import { FMRInfo } from "../../../domain/package/CampaignTypes";

interface FMRBenefitWidgetProps {
  smsId: string;
  schemeId: string;
}

export default function FMRBenefitWidget({ smsId, schemeId }: FMRBenefitWidgetProps) {
  const [fmr, setFmr] = useState<FMRInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (smsId && schemeId) {
      setLoading(true);
      fetch(`/api/campaigns/fmr?smsId=${smsId}&schemeId=${schemeId}`)
        .then(res => res.json())
        .then(setFmr)
        .finally(() => setLoading(false));
    }
  }, [smsId, schemeId]);

  if (loading) return <div style={styles.loading}>Calculating FMR benefits...</div>;
  if (!fmr || fmr.monthly === 0) return null;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={{ fontSize: "18px" }}>💰</span>
        <strong>FMR Benefits (Free Recharge)</strong>
      </div>
      <p style={styles.info}>Switch to this pack and earn free credits:</p>
      <div style={styles.grid}>
        <div style={styles.item}>
          <div style={styles.label}>1 Month</div>
          <div style={styles.value}>₹{fmr.monthly}</div>
        </div>
        <div style={styles.item}>
          <div style={styles.label}>3 Months</div>
          <div style={styles.value}>₹{fmr.threeMonth}</div>
        </div>
        <div style={styles.item}>
          <div style={styles.label}>6 Months</div>
          <div style={styles.value}>₹{fmr.sixMonth}</div>
        </div>
      </div>
      <div style={styles.footer}>* Credits applied to DTH balance upon successful renewal.</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", marginTop: "12px" },
  header: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#166534", marginBottom: "8px" },
  info: { fontSize: "11px", color: "#15803d", marginBottom: "10px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" },
  item: { textAlign: "center", background: "white", padding: "6px", borderRadius: "4px", border: "1px solid #dcfce7" },
  label: { fontSize: "9px", textTransform: "uppercase", color: "#64748b", fontWeight: 700 },
  value: { fontSize: "14px", fontWeight: 800, color: "#166534" },
  footer: { fontSize: "9px", color: "#16a34a", marginTop: "8px", opacity: 0.8 },
  loading: { fontSize: "11px", color: "#64748b", padding: "8px" }
};
