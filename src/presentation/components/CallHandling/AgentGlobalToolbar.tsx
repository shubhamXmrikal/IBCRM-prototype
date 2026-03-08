"use client";

import React, { useState, useEffect } from "react";
import { AgentSession } from "../../../domain/agent/AgentTypes";

export default function AgentGlobalToolbar() {
  const [session, setSession] = useState<AgentSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agent/session")
      .then(res => res.json())
      .then(setSession)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !session) return null;

  return (
    <div style={styles.toolbar}>
      <div style={styles.section}>
        <span style={styles.icon}>👤</span>
        <div>
          <div style={styles.label}>Active Agent</div>
          <div style={styles.value}>{session.agentName} ({session.agentId})</div>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <span style={styles.icon}>🏢</span>
        <div>
          <div style={styles.label}>Center</div>
          <div style={styles.value}>{session.centerId}</div>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <span style={styles.icon}>🔗</span>
        <div>
          <div style={styles.label}>Routing Mode</div>
          <div style={{ ...styles.value, color: session.isUsedZTConn ? "#10b981" : "#3b82f6" }}>
            {session.isUsedZTConn ? "ZT REPLICA (Active)" : "PRIMARY NODE"}
          </div>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <span style={styles.icon}>📍</span>
        <div>
          <div style={styles.label}>Captured IP</div>
          <div style={styles.value}>{session.capturedIp}</div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {session.lastVcNo && (
        <div style={styles.lastVc}>
          <span>Last Worked:</span>
          <strong style={{ color: "var(--brand-primary)", marginLeft: "8px", cursor: "pointer" }}>
            {session.lastVcNo} ↗
          </strong>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    width: "100%",
    height: "32px",
    background: "#0f172a", // Darker navy
    color: "white",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    fontSize: "11px",
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },
  section: { display: "flex", alignItems: "center", gap: "10px" },
  icon: { fontSize: "16px", opacity: 0.8 },
  label: { fontSize: "9px", textTransform: "uppercase", opacity: 0.6, fontWeight: 700 },
  value: { fontWeight: 600 },
  divider: { width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", margin: "0 20px" },
  lastVc: { background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }
};
