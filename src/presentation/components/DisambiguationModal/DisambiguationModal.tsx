"use client";

import React from "react";
import { SearchSubsDetails } from "../../../domain/customer/SubscriberSearchTypes";

interface DisambiguationModalProps {
  candidates: SearchSubsDetails[];
  searchValue: string;
  onSelect: (vcNumber: string) => void;
  onClose: () => void;
}

/**
 * DisambiguationModal
 *
 * Shown when a MOBILE or EMAIL search returns multiple matching accounts.
 * Maps to the legacy "pick from list" flow where the agent selects one before
 * the full subscriber screen loads.
 *
 * Legacy equivalent: getSubDetailsBySearchText() → agent picks → getSubscriberInfoDetails()
 */
export default function DisambiguationModal({
  candidates,
  searchValue,
  onSelect,
  onClose,
}: DisambiguationModalProps) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>Multiple Accounts Found</h3>
            <p style={styles.subtitle}>
              The mobile/email <strong>{searchValue}</strong> is linked to{" "}
              {candidates.length} accounts. Select one to proceed.
            </p>
          </div>
          <button onClick={onClose} style={styles.closeBtn} title="Close">
            ✕
          </button>
        </div>

        {/* Candidate list */}
        <div style={styles.list}>
          {candidates.map((c) => (
            <div
              key={c.vcNumber}
              style={styles.row}
              onClick={() => onSelect(c.vcNumber)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "#1e293b";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "#0f172a";
              }}
            >
              <div style={styles.rowMain}>
                <span style={styles.subscriberName}>{c.subscriberName}</span>
                <span
                  style={{
                    ...styles.badge,
                    background: c.mobileType === "RMN" ? "#10b981" : "#3b82f6",
                  }}
                >
                  {c.mobileType}
                </span>
              </div>
              <div style={styles.rowSub}>
                <span style={styles.vcLabel}>VC:</span>
                <span style={styles.vcValue}>{c.vcNumber}</span>
                <span style={styles.divider}>|</span>
                <span style={styles.vcLabel}>SMSID:</span>
                <span style={styles.vcValue}>{c.smsId}</span>
              </div>
              <div style={styles.rowAddr}>
                {c.address} — {c.city}, {c.state}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <p style={styles.footerNote}>
            ℹ️ Equivalent to{" "}
            <code>usp_CUSTOMERSERVICE_SearchSubsDetailByMobnEmail</code> in
            legacy system
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#1e293b",
    borderRadius: "12px",
    width: "600px",
    maxWidth: "90vw",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    border: "1px solid #334155",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px 24px 16px",
    borderBottom: "1px solid #334155",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: "#f1f5f9",
  },
  subtitle: {
    margin: "4px 0 0",
    fontSize: "13px",
    color: "#94a3b8",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "18px",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  list: {
    overflowY: "auto",
    flex: 1,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  row: {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "14px 16px",
    cursor: "pointer",
    transition: "background 0.15s",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  rowMain: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  subscriberName: {
    fontWeight: 600,
    color: "#f1f5f9",
    fontSize: "15px",
  },
  badge: {
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
    color: "#fff",
    letterSpacing: "0.5px",
  },
  rowSub: {
    display: "flex",
    gap: "6px",
    fontSize: "12px",
    color: "#64748b",
    alignItems: "center",
  },
  vcLabel: {
    color: "#475569",
    fontWeight: 600,
    fontSize: "11px",
    textTransform: "uppercase",
  },
  vcValue: {
    color: "#93c5fd",
    fontFamily: "monospace",
    fontSize: "12px",
  },
  divider: {
    color: "#334155",
    margin: "0 4px",
  },
  rowAddr: {
    fontSize: "12px",
    color: "#64748b",
  },
  footer: {
    borderTop: "1px solid #1e293b",
    padding: "12px 24px",
    background: "#0f172a",
  },
  footerNote: {
    margin: 0,
    fontSize: "11px",
    color: "#475569",
  },
};
