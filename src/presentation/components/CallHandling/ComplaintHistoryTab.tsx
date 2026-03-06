"use client";

import React, { useState, useEffect } from "react";
import { Complaint, ServiceRequest } from "../../../domain/complaint/ComplaintTypes";

interface ComplaintHistoryTabProps {
  vcNumber: string;
}

export default function ComplaintHistoryTab({ vcNumber }: ComplaintHistoryTabProps) {
  const [history, setHistory] = useState<(Complaint | ServiceRequest)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, [vcNumber]);

  const fetchHistory = async () => {
    setLoading(true);
    const res = await fetch(`/api/complaints?vcNumber=${vcNumber}`);
    if (res.ok) {
      const data = await res.json();
      setHistory(data);
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading complaint history...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={{ margin: 0 }}>Ticket History (CRM & Service)</h4>
        <button onClick={fetchHistory} style={styles.refreshBtn}>🔄 Refresh</button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Ticket ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>No complaints logged for this subscriber.</td></tr>
            ) : (
              history.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()).map((item) => (
                <tr key={item.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 700, color: "var(--brand-primary)" }}>{item.id}</div>
                    {"stbNo" in item && <div style={{ fontSize: "10px", color: "#64748b" }}>STB: {(item as ServiceRequest).stbNo}</div>}
                  </td>
                  <td style={styles.td}>{new Date(item.createdOn).toLocaleDateString()}</td>
                  <td style={styles.td}>{item.category}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.statusBadge, backgroundColor: getStatusColor(item.status) }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ color: item.priority === "HIGH" ? "#ef4444" : "#64748b", fontWeight: item.priority === "HIGH" ? 700 : 400 }}>
                      {item.priority === "HIGH" ? "⚠️ HIGH" : "Normal"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={{ maxWidth: "250px", fontSize: "12px" }}>{item.description}</div>
                    {item.caseHistory && <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px", fontStyle: "italic" }}>Hist: {item.caseHistory}</div>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "OPEN": return "#3b82f6";
    case "IN_PROGRESS": return "#f59e0b";
    case "RESOLVED": return "#10b981";
    case "CLOSED": return "#64748b";
    default: return "#cbd5e1";
  }
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  refreshBtn: {
    background: "none",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    padding: "4px 8px",
    fontSize: "12px",
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  thRow: {
    background: "#f8fafc",
    textAlign: "left",
  },
  th: {
    padding: "12px 10px",
    fontWeight: 600,
    color: "#475569",
    borderBottom: "2px solid #e2e8f0",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "12px 10px",
    verticalAlign: "top",
  },
  statusBadge: {
    color: "white",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
  }
};
