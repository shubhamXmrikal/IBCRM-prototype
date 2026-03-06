"use client";

import React, { useState, useEffect } from "react";
import { MessageOfTheDay } from "../../../domain/agent/AgentTypes";

interface MOTDBannerProps {
  smsId: string;
}

export default function MOTDBanner({ smsId }: MOTDBannerProps) {
  const [motd, setMotd] = useState<MessageOfTheDay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/agent/motd?smsId=${smsId}`)
      .then(res => res.json())
      .then(data => {
        if (data.importantMessage || data.proactiveInfo) setMotd(data);
        else setMotd(null);
      })
      .finally(() => setLoading(false));
  }, [smsId]);

  if (loading || !motd) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.section}>
        <span style={{ fontSize: "20px" }}>📢</span>
        <div style={{ flex: 1 }}>
          <div style={styles.important}>{motd.importantMessage}</div>
          <div style={styles.proactive}>{motd.proactiveInfo}</div>
        </div>
      </div>
      <div style={styles.timestamp}>Updated: {new Date(motd.updatedOn).toLocaleTimeString()}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    padding: "12px 20px", background: "#fffbeb", border: "1px solid #fef3c7",
    borderRadius: "8px", color: "#92400e", marginBottom: "16px",
    display: "flex", justifyContent: "space-between", alignItems: "flex-end"
  },
  section: { display: "flex", gap: "16px", alignItems: "flex-start", flex: 1 },
  important: { fontWeight: 700, fontSize: "14px", marginBottom: "4px" },
  proactive: { fontSize: "12px", opacity: 0.9, fontStyle: "italic" },
  timestamp: { fontSize: "10px", opacity: 0.6, whiteSpace: "nowrap" }
};
