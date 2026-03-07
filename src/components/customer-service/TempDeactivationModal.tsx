"use client";

import React, { useState, useEffect } from "react";

interface TempDeactivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberInfo: {
    vcNo: string;
    toc: string;
    status: string;
  };
}

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1500,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "500px",
  maxWidth: "90%",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "4px",
  color: "#334155",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
  fontSize: "14px",
  marginBottom: "16px",
};

export default function TempDeactivationModal({
  isOpen,
  onClose,
  subscriberInfo,
}: TempDeactivationModalProps) {
  const [days, setDays] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [reactivationDate, setReactivationDate] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [agreed, setAgreed] = useState({
    minDays: false,
    billing: false,
    noRequests: false,
  });

  const isEligible = subscriberInfo.toc !== "10025" && subscriberInfo.toc !== "10026";

  useEffect(() => {
    // Set default fromDate to Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFromDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (fromDate && days && !isNaN(parseInt(days))) {
      const start = new Date(fromDate);
      const end = new Date(start);
      end.setDate(start.getDate() + parseInt(days) - 1);
      setToDate(end.toISOString().split("T")[0]);

      const reactiv = new Date(end);
      reactiv.setDate(end.getDate() + 1);
      setReactivationDate(reactiv.toISOString().split("T")[0]);
    }
  }, [fromDate, days]);

  if (!isOpen) return null;

  const allAgreed = agreed.minDays && agreed.billing && agreed.noRequests;
  const canSubmit = allAgreed && days && parseInt(days) >= 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Temporary Deactivation Requested for VC: ${subscriberInfo.vcNo}\nDuration: ${days} days\nReactivation Date: ${reactivationDate}`);
    onClose();
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Temporary Deactivation</h2>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: "20px" }}>×</button>
        </div>

        {!isEligible ? (
          <div style={{ padding: "16px", backgroundColor: "#fef2f2", color: "#991b1b", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
            <strong>Ineligible:</strong> This subscriber type (TOC: {subscriberInfo.toc}) is not eligible for temporary deactivation.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>VC Number</label>
              <input type="text" value={subscriberInfo.vcNo} readOnly style={{ ...inputStyle, backgroundColor: "#f8fafc" }} />
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Number of Days (Min 5)</label>
                <input
                  type="number"
                  min="5"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="e.g. 15"
                  style={inputStyle}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Deactivation From</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Deactivation To</label>
                <input type="date" value={toDate} readOnly style={{ ...inputStyle, backgroundColor: "#f8fafc" }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Reactivation Date</label>
                <input type="date" value={reactivationDate} readOnly style={{ ...inputStyle, backgroundColor: "#f8fafc" }} />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Remarks</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                style={{ ...inputStyle, height: "80px", resize: "none" }}
                maxLength={250}
                placeholder="Enter reason for deactivation..."
              ></textarea>
            </div>

            <div style={{ padding: "12px", backgroundColor: "#f1f5f9", borderRadius: "6px", marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 8px 0" }}>Mandatory Checklist:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={agreed.minDays} onChange={(e) => setAgreed({ ...agreed, minDays: e.target.checked })} />
                  I confirm the minimum deactivation period is 5 days.
                </label>
                <label style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={agreed.billing} onChange={(e) => setAgreed({ ...agreed, billing: e.target.checked })} />
                  I understand billing is suspended for this period.
                </label>
                <label style={{ fontSize: "13px", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={agreed.noRequests} onChange={(e) => setAgreed({ ...agreed, noRequests: e.target.checked })} />
                  No other active requests exist for this VC.
                </label>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                type="button"
                onClick={onClose}
                style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #e2e8f0", backgroundColor: "#fff", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: canSubmit ? "#f97316" : "#cbd5e1",
                  color: "#fff",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  fontWeight: 600,
                }}
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
