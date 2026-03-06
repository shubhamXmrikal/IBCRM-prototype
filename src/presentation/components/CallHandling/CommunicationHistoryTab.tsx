"use client";

import React, { useState, useEffect } from "react";
import { CommunicationLog } from "../../../domain/communication/CommunicationTypes";

interface CommunicationHistoryTabProps {
  vcNumber: string;
}

export default function CommunicationHistoryTab({ vcNumber }: CommunicationHistoryTabProps) {
  const [logs, setLogs] = useState<CommunicationLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [vcNumber]);

  const fetchLogs = async () => {
    setLoading(true);
    const res = await fetch(`/api/comm/history?vcNumber=${vcNumber}`);
    if (res.ok) {
      const data = await res.json();
      setLogs(data);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading communication logs...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={{ margin: 0 }}>Outbound Communication History</h4>
        <button onClick={fetchLogs} style={styles.refreshBtn}>🔄 Refresh</button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Sent On</th>
              <th style={styles.th}>Channel</th>
              <th style={styles.th}>Recipient</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Agent IP</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>No communication records found.</td></tr>
            ) : (
              logs.sort((a, b) => new Date(b.sentOn).getTime() - new Date(a.sentOn).getTime()).map((log) => (
                <tr key={log.id} style={styles.tr}>
                  <td style={styles.td}>{new Date(log.sentOn).toLocaleString()}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.channelBadge, backgroundColor: getChannelColor(log.channel) }}>
                      {log.channel}
                    </span>
                  </td>
                  <td style={styles.td}>{log.recipient}</td>
                  <td style={styles.td}>
                    <div style={{ maxWidth: "300px", fontSize: "12px", color: "#475569" }}>{log.message}</div>
                    <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "4px" }}>Process: {log.processName}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, color: getStatusColor(log.status) }}>
                      {log.status === "DELIVERED" ? "✓ " : ""}{log.status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontFamily: "monospace", fontSize: "11px" }}>{log.agentIp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getChannelColor = (channel: string) => {
  switch (channel) {
    case "SMS": return "#3b82f6";
    case "WHATSAPP": return "#10b981";
    case "PUSH": return "#f59e0b";
    case "EMAIL": return "#6366f1";
    default: return "#64748b";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED": return "#16a34a";
    case "FAILED": return "#ef4444";
    case "SENT": return "#3b82f6";
    default: return "#64748b";
  }
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "16px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  refreshBtn: { background: "none", border: "1px solid #e2e8f0", borderRadius: "4px", padding: "4px 8px", fontSize: "12px", cursor: "pointer" },
  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  thRow: { background: "#f8fafc", textAlign: "left" },
  th: { padding: "12px 10px", fontWeight: 600, color: "#475569", borderBottom: "2px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "12px 10px", verticalAlign: "top" },
  channelBadge: { color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: 700 },
  statusBadge: { fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }
};
