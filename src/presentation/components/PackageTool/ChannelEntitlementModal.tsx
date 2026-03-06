"use client";

import React, { useState, useEffect } from "react";
import { ChannelDetail } from "../../../domain/package/FinancialTypes";

interface ChannelEntitlementModalProps {
  onClose: () => void;
}

export default function ChannelEntitlementModal({ onClose }: ChannelEntitlementModalProps) {
  const [channels, setChannels] = useState<ChannelDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    setLoading(true);
    const res = await fetch("/api/master/channels");
    if (res.ok) {
      const data = await res.json();
      setChannels(data);
    }
    setLoading(false);
  };

  const filteredChannels = channels.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.includes(searchTerm) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Entitled Channel List</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search by name, code, or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
            autoFocus
          />
        </div>

        <div style={styles.listWrapper}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Loading channels...</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.thRow}>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Channel Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Security</th>
                </tr>
              </thead>
              <tbody>
                {filteredChannels.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>No channels match your search.</td></tr>
                ) : (
                  filteredChannels.map((c) => (
                    <tr key={c.code} style={styles.tr}>
                      <td style={styles.td}>{c.code}</td>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 600 }}>{c.name}</div>
                        {c.requiresThreeSatellite && <div style={{ fontSize: "10px", color: "#ea580c" }}>Requires 3-Satellite</div>}
                      </td>
                      <td style={styles.td}>{c.category}</td>
                      <td style={styles.td}>
                        <span style={{ ...styles.badge, background: c.isHD ? "#dcfce7" : "#f1f5f9", color: c.isHD ? "#166534" : "#475569" }}>
                          {c.isHD ? "HD" : "SD"}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {c.isHighSecurity ? <span title="High Security Encryption">🔒</span> : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
        
        <div style={styles.footer}>
          Total Entitled: <strong>{channels.length}</strong> | Showing: <strong>{filteredChannels.length}</strong>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "white",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "80vh",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#64748b",
  },
  searchBar: {
    padding: "16px 20px",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  listWrapper: {
    flex: 1,
    overflowY: "auto",
    padding: "0 20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  thRow: {
    position: "sticky",
    top: 0,
    background: "white",
    textAlign: "left",
    zIndex: 1,
  },
  th: {
    padding: "12px 8px",
    fontWeight: 600,
    color: "#64748b",
    borderBottom: "2px solid #f1f5f9",
  },
  tr: {
    borderBottom: "1px solid #f1f5f9",
  },
  td: {
    padding: "12px 8px",
  },
  badge: {
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
  },
  footer: {
    padding: "12px 20px",
    background: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
    fontSize: "12px",
    color: "#64748b",
  }
};
