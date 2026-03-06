"use client";

import React, { useState, useEffect } from "react";
import { WaiverReason } from "../../../domain/package/FinancialTypes";

interface WaiverRequestModalProps {
  vcNumber: string;
  smsId: string;
  onClose: () => void;
  onSuccess: (requestId: string) => void;
}

export default function WaiverRequestModal({ vcNumber, smsId, onClose, onSuccess }: WaiverRequestModalProps) {
  const [reasons, setReasons] = useState<WaiverReason[]>([]);
  const [reasonId, setReasonId] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/finance/waivers?mode=reasons")
      .then(res => res.json())
      .then(data => setReasons(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      vcNumber,
      smsId,
      amount: parseFloat(amount),
      reasonId,
      reasonName: reasons.find(r => r.id === reasonId)?.name || "",
      status: "PENDING",
      requestedBy: "AGENT_001",
      requestedOn: new Date(),
      remarks
    };

    const res = await fetch("/api/finance/waivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      onSuccess(data.requestId);
    } else {
      const err = await res.json();
      alert(err.error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Request Financial Waiver</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={styles.content}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Waiver Reason</label>
            <select style={styles.input} value={reasonId} onChange={e => setReasonId(e.target.value)} required>
              <option value="">-- Select Reason --</option>
              {reasons.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>

            <label style={styles.label}>Amount (₹)</label>
            <input 
              type="number" 
              style={styles.input} 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="0.00"
              step="0.01"
              required 
            />

            <label style={styles.label}>Justification / Remarks</label>
            <textarea 
              style={{ ...styles.input, height: "80px" }} 
              value={remarks} 
              onChange={e => setRemarks(e.target.value)} 
              placeholder="Explain why this waiver is being requested..."
              required 
            />
          </div>

          <div style={styles.footer}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Submitting..." : "Submit for Approval"}
            </button>
          </div>
        </form>
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
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "white",
    width: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8fafc",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#64748b",
  },
  content: {
    padding: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  footer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelBtn: {
    padding: "8px 16px",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
  },
  submitBtn: {
    padding: "8px 16px",
    background: "var(--brand-primary)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  }
};
