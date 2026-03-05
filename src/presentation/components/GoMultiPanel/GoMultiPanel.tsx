"use client";

import React from "react";
import { GoMultiResult } from "../../../domain/customer/SubscriberSearchTypes";

interface GoMultiPanelProps {
  goMulti: GoMultiResult;
  currentVCNo: string;
}

const statusColors: Record<string, string> = {
  ACTIVE: "#10b981",
  DEACTIVE: "#ef4444",
  SUSPENDED: "#f59e0b",
};

/**
 * GoMultiPanel
 *
 * Renders the parent/child connection tree for GoMulti subscribers.
 * Maps to the legacy getChildParnetDetails() result rendered as a connections tree
 * in CSSubInfoPersonal.aspx.
 */
export default function GoMultiPanel({
  goMulti,
  currentVCNo,
}: GoMultiPanelProps) {
  const allConnections = [
    ...goMulti.parentConnections,
    ...goMulti.childConnections,
  ];
  if (allConnections.length === 0) return null;

  return (
    <div style={styles.panel}>
      <div style={styles.header}>
        <span style={styles.icon}>🔗</span>
        <span style={styles.title}>GoMulti Connections</span>
        <span style={styles.count}>{allConnections.length} linked</span>
      </div>

      <div style={styles.list}>
        {goMulti.parentConnections.length > 0 && (
          <div style={styles.groupLabel}>Parent</div>
        )}
        {goMulti.parentConnections.map((conn) => (
          <ConnectionRow
            key={conn.vcNumber}
            conn={conn}
            isCurrent={conn.vcNumber === currentVCNo}
            type="parent"
          />
        ))}

        {goMulti.childConnections.length > 0 && (
          <div style={styles.groupLabel}>Children</div>
        )}
        {goMulti.childConnections.map((conn) => (
          <ConnectionRow
            key={conn.vcNumber}
            conn={conn}
            isCurrent={conn.vcNumber === currentVCNo}
            type="child"
          />
        ))}
      </div>

      <div style={styles.footer}>
        <span style={styles.footerNote}>
          Source: <code>usp_CustomerService_GetParentChildDetails</code> (dual
          resultset)
        </span>
      </div>
    </div>
  );
}

function ConnectionRow({
  conn,
  isCurrent,
  type,
}: {
  conn: import("../../../domain/customer/SubscriberSearchTypes").GoMultiConnection;
  isCurrent: boolean;
  type: "parent" | "child";
}) {
  const statusColor = statusColors[conn.status] ?? "#64748b";
  return (
    <div
      style={{
        ...styles.row,
        borderLeft: `3px solid ${type === "parent" ? "#818cf8" : "#38bdf8"}`,
        background: isCurrent ? "#1e3a5f" : "#0f172a",
      }}
    >
      <div style={styles.rowTop}>
        <span style={styles.connName}>{conn.subscriberName}</span>
        <span
          style={{ ...styles.statusDot, background: statusColor }}
          title={conn.status}
        />
        <span style={{ ...styles.statusText, color: statusColor }}>
          {conn.status}
        </span>
      </div>
      <div style={styles.rowBottom}>
        <span style={styles.vcLabel}>VC:</span>
        <span style={styles.vcValue}>{conn.vcNumber}</span>
        <span style={styles.separator}>·</span>
        <span style={styles.vcLabel}>STB:</span>
        <span style={styles.vcValue}>{conn.modelType}</span>
        {isCurrent && <span style={styles.currentBadge}>Current</span>}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: {
    background: "#1e293b",
    borderRadius: "10px",
    border: "1px solid #334155",
    overflow: "hidden",
    marginTop: "12px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderBottom: "1px solid #334155",
    background: "#0f172a",
  },
  icon: { fontSize: "16px" },
  title: { fontWeight: 600, fontSize: "13px", color: "#e2e8f0", flex: 1 },
  count: {
    background: "#334155",
    color: "#94a3b8",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "11px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "10px 12px",
  },
  groupLabel: {
    fontSize: "10px",
    fontWeight: 700,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "1px",
    paddingLeft: "4px",
    marginTop: "4px",
  },
  row: {
    padding: "10px 12px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    border: "1px solid #1e293b",
  },
  rowTop: { display: "flex", alignItems: "center", gap: "8px" },
  connName: { fontWeight: 600, fontSize: "13px", color: "#f1f5f9", flex: 1 },
  statusDot: { width: "8px", height: "8px", borderRadius: "50%" },
  statusText: { fontSize: "11px", fontWeight: 600 },
  rowBottom: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
  },
  vcLabel: {
    color: "#475569",
    fontWeight: 600,
    textTransform: "uppercase" as const,
  },
  vcValue: { color: "#93c5fd", fontFamily: "monospace" },
  separator: { color: "#334155", margin: "0 2px" },
  currentBadge: {
    marginLeft: "auto",
    background: "#1d4ed8",
    color: "#fff",
    padding: "1px 6px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: 700,
  },
  footer: {
    padding: "8px 16px",
    background: "#0f172a",
    borderTop: "1px solid #1e293b",
  },
  footerNote: { fontSize: "10px", color: "#475569" },
};
