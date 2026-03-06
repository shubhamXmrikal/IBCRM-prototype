"use client";

import React, { useState, useEffect } from "react";
import { MobileDetail, RelationshipMaster } from "../../../domain/customer/ContactDetails";

interface AlternateMobilesPanelProps {
  smsId: string;
  vcNo: string;
}

export default function AlternateMobilesPanel({ smsId, vcNo }: AlternateMobilesPanelProps) {
  const [mobiles, setMobiles] = useState<MobileDetail[]>([]);
  const [relationships, setRelationships] = useState<RelationshipMaster[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMobile, setNewMobile] = useState("");
  const [selectedRel, setSelectedRel] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMobiles();
    fetchRelationships();
  }, [smsId]);

  const fetchMobiles = async () => {
    // In a real app, this would be an API call
    // For now, we simulate with mock data logic
    const res = await fetch(`/api/customer/alternate-mobiles?smsId=${smsId}`);
    if (res.ok) {
      const data = await res.json();
      setMobiles(data);
    }
  };

  const fetchRelationships = async () => {
    const res = await fetch("/api/customer/relationships");
    if (res.ok) {
      const data = await res.json();
      setRelationships(data);
    }
  };

  const handleAddMobile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch("/api/customer/alternate-mobiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        smsId,
        vcNo,
        mobileNo: newMobile,
        relationshipId: selectedRel,
        relationship: relationships.find(r => r.id === selectedRel)?.name || "OTHER",
        source: "CRM",
        type: "MOBILE",
        active: true,
        status: "ACTIVE"
      })
    });

    if (res.ok) {
      setNewMobile("");
      setSelectedRel("");
      setIsAdding(false);
      fetchMobiles();
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Alternate Mobile Numbers</h3>
        <button 
          onClick={() => setIsAdding(!isAdding)} 
          style={isAdding ? styles.cancelBtn : styles.addBtn}
        >
          {isAdding ? "Cancel" : "+ Add Mobile"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAddMobile} style={styles.form}>
          <input 
            type="tel" 
            placeholder="Mobile Number (10 digits)" 
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            style={styles.input}
            required
            pattern="[0-9]{10}"
          />
          <select 
            value={selectedRel} 
            onChange={(e) => setSelectedRel(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select Relationship</option>
            {relationships.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      )}

      <div style={styles.list}>
        {mobiles.length === 0 ? (
          <div style={styles.empty}>No alternate mobiles found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.th}>
                <th style={styles.td}>Mobile No</th>
                <th style={styles.td}>Relationship</th>
                <th style={styles.td}>Status</th>
                <th style={styles.td}>Source</th>
              </tr>
            </thead>
            <tbody>
              {mobiles.map((m, i) => (
                <tr key={i} style={styles.tr}>
                  <td style={styles.td}>{m.mobileNo}</td>
                  <td style={styles.td}>{m.relationship}</td>
                  <td style={styles.td}>
                    <span style={m.active ? styles.activeBadge : styles.inactiveBadge}>
                      {m.status}
                    </span>
                  </td>
                  <td style={styles.td}>{m.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    background: "var(--bg-secondary)",
    borderRadius: "8px",
    border: "1px solid var(--border-subtle)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "16px",
    color: "var(--text-primary)",
  },
  addBtn: {
    padding: "6px 12px",
    background: "var(--brand-primary)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  cancelBtn: {
    padding: "6px 12px",
    background: "var(--bg-danger)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  form: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
    background: "var(--bg-tertiary)",
    padding: "12px",
    borderRadius: "4px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid var(--border-subtle)",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    flex: 1,
  },
  submitBtn: {
    padding: "8px 16px",
    background: "var(--brand-success, #10b981)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    marginTop: "12px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    textAlign: "left",
    borderBottom: "2px solid var(--border-subtle)",
    color: "var(--text-secondary)",
  },
  tr: {
    borderBottom: "1px solid var(--border-subtle)",
  },
  td: {
    padding: "10px 4px",
  },
  activeBadge: {
    padding: "2px 6px",
    background: "#064e3b",
    color: "#34d399",
    borderRadius: "4px",
    fontSize: "11px",
  },
  inactiveBadge: {
    padding: "2px 6px",
    background: "#450a0a",
    color: "#f87171",
    borderRadius: "4px",
    fontSize: "11px",
  },
  empty: {
    textAlign: "center",
    color: "var(--text-secondary)",
    padding: "20px",
  }
};
