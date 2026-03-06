"use client";

import React, { useState, useEffect } from "react";
import { WatchoSubscriber, OTTPlan } from "../../../domain/watcho/WatchoTypes";
import OTTPlanWizard from "./OTTPlanWizard";

interface WatchoDashboardTabProps {
  vcNumber: string;
}

export default function WatchoDashboardTab({ vcNumber }: WatchoDashboardTabProps) {
  const [sub, setSub] = useState<WatchoSubscriber | null>(null);
  const [plans, setPlans] = useState<OTTPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    fetchData();
  }, [vcNumber]);

  const fetchData = async () => {
    setLoading(true);
    const [subRes, planRes] = await Promise.all([
      fetch(`/api/watcho/subscriber?vcNumber=${vcNumber}`),
      fetch("/api/watcho/plans")
    ]);

    if (subRes.ok) setSub(await subRes.json());
    if (planRes.ok) setPlans(await planRes.json());
    setLoading(false);
  };

  const handleToggleAutoRenewal = async () => {
    if (!sub) return;
    const res = await fetch("/api/watcho/subscriber", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        action: "toggleAutoRenewal", 
        vcNumber, 
        enabled: !sub.isAutoRenewalEnabled 
      })
    });
    if (res.ok) fetchData();
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Watcho Experience...</div>;

  const currentPlan = plans.find(p => p.id === sub?.currentPlanId);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "28px" }}>📱</span>
          <div>
            <h3 style={{ margin: 0 }}>Watcho OTT Management</h3>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Watcho SMSID: {sub?.ottSmsId || "Not Registered"}</div>
          </div>
        </div>
        <div style={{ ...styles.statusBadge, backgroundColor: sub?.status === "ACTIVE" ? "#dcfce7" : "#f1f5f9", color: sub?.status === "ACTIVE" ? "#166534" : "#475569" }}>
          {sub?.status}
        </div>
      </div>

      <div style={styles.mainGrid}>
        {/* Subscription Detail Card */}
        <div style={styles.card}>
          <h4 style={{ margin: "0 0 16px 0" }}>Subscription Details</h4>
          {sub?.status === "ACTIVE" && currentPlan ? (
            <div style={styles.planInfo}>
              <div style={styles.planName}>{currentPlan.name}</div>
              <div style={styles.planDesc}>{currentPlan.description}</div>
              <div style={styles.expiryBox}>
                <span>Valid Until:</span>
                <strong>{new Date(sub.expiryDate!).toLocaleDateString()}</strong>
              </div>
              <div style={styles.appIcons}>
                {currentPlan.bundledApps.slice(0, 6).map(app => (
                  <span key={app} style={styles.appTag}>{app}</span>
                ))}
                {currentPlan.bundledApps.length > 6 && <span style={styles.appTag}>+{currentPlan.bundledApps.length - 6} more</span>}
              </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <p>No active Watcho subscription found.</p>
              <button style={styles.primaryBtn} onClick={() => setShowWizard(true)}>Explore Plans 🚀</button>
            </div>
          )}
        </div>

        {/* Auto-Renewal / SI Card */}
        <div style={styles.card}>
          <h4 style={{ margin: "0 0 16px 0" }}>Auto-Renewal (SI)</h4>
          <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
            Enable Standing Instruction for seamless monthly renewals via your linked payment method.
          </p>
          <div style={styles.siToggleRow}>
            <div style={{ fontWeight: 600 }}>Standing Instruction</div>
            <button 
              onClick={handleToggleAutoRenewal}
              style={{ ...styles.toggleBtn, backgroundColor: sub?.isAutoRenewalEnabled ? "#10b981" : "#cbd5e1" }}
            >
              <div style={{ ...styles.toggleDot, transform: sub?.isAutoRenewalEnabled ? "translateX(20px)" : "translateX(0)" }} />
            </button>
          </div>
          <div style={{ fontSize: "11px", color: sub?.isAutoRenewalEnabled ? "#16a34a" : "#94a3b8", marginTop: "8px" }}>
            {sub?.isAutoRenewalEnabled ? "● Active: Monthly recurring billing enabled." : "○ Inactive: Manual renewal required."}
          </div>
        </div>
      </div>

      {showWizard && (
        <OTTPlanWizard 
          vcNumber={vcNumber}
          plans={plans}
          onClose={() => setShowWizard(false)}
          onSuccess={() => {
            setShowWizard(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "16px", display: "flex", flexDirection: "column", gap: "20px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" },
  statusBadge: { padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" },
  mainGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  card: { padding: "20px", background: "white", borderRadius: "12px", border: "1px solid var(--border-subtle)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  planInfo: { display: "flex", flexDirection: "column", gap: "8px" },
  planName: { fontSize: "18px", fontWeight: 800, color: "var(--brand-primary)" },
  planDesc: { fontSize: "13px", color: "#64748b" },
  expiryBox: { marginTop: "12px", padding: "10px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between", fontSize: "13px" },
  appIcons: { display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" },
  appTag: { padding: "2px 8px", background: "#eff6ff", color: "#1e40af", borderRadius: "4px", fontSize: "10px", fontWeight: 600 },
  siToggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  toggleBtn: { width: "44px", height: "24px", borderRadius: "12px", padding: "2px", border: "none", cursor: "pointer", transition: "all 0.2s" },
  toggleDot: { width: "20px", height: "20px", background: "white", borderRadius: "50%", transition: "all 0.2s" },
  primaryBtn: { padding: "10px 20px", background: "var(--brand-primary)", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" },
  emptyState: { textAlign: "center", padding: "20px" }
};
