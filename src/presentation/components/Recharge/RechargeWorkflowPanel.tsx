"use client";

import React, { useState, useEffect } from "react";
import { RechargeValidation, RechargeDueInfo } from "../../../domain/recharge/RechargeTypes";

interface RechargeWorkflowPanelProps {
  vcNumber: string;
  smsId: string;
  onClose: () => void;
}

export default function RechargeWorkflowPanel({ vcNumber, smsId, onClose }: RechargeWorkflowPanelProps) {
  const [step, setStep] = useState(1);
  const [validation, setValidation] = useState<RechargeValidation | null>(null);
  const [dueInfo, setDueInfo] = useState<RechargeDueInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (step === 1) validateSystem();
  }, [vcNumber, step]);

  const validateSystem = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/recharge/validate?vcNumber=${vcNumber}`);
      if (res.ok) {
        const data = await res.json();
        setValidation(data);
      } else {
        setError("System validation failed. Please check VC/STB status.");
      }
    } catch (e) {
      setError("Network error during validation.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDueAmount = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/recharge/due?smsId=${smsId}`);
      if (res.ok) {
        const data = await res.json();
        setDueInfo(data);
        setStep(2);
      }
    } catch (e) {
      setError("Failed to calculate due amount.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      alert(`Payment of ₹${dueInfo?.dueAmount || 0} processed successfully via Gateway.`);
      setStep(3);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Recharge Workflow</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.content}>
          {/* Progress Tracker */}
          <div style={styles.tracker}>
            <div style={{ ...styles.step, color: step >= 1 ? "var(--brand-primary)" : "#cbd5e1" }}>1. Validate</div>
            <div style={styles.line}></div>
            <div style={{ ...styles.step, color: step >= 2 ? "var(--brand-primary)" : "#cbd5e1" }}>2. Due Amount</div>
            <div style={styles.line}></div>
            <div style={{ ...styles.step, color: step >= 3 ? "var(--brand-primary)" : "#cbd5e1" }}>3. Finish</div>
          </div>

          {step === 1 && (
            <div style={styles.pane}>
              <h4>Step 1: System Validation (CheckVCSTB)</h4>
              {loading ? <p>Running 45+ eligibility checks...</p> : (
                <div style={styles.details}>
                  {validation ? (
                    <>
                      <div style={styles.row}><span>Status:</span> <strong>{validation.statusName}</strong></div>
                      <div style={styles.row}><span>HD Subscriber:</span> <strong>{validation.isHD ? "Yes" : "No"}</strong></div>
                      <div style={styles.row}><span>Amnesty Eligibility:</span> <strong>{validation.isAmnestyAllowed ? "✅ YES" : "No"}</strong></div>
                      <div style={styles.row}><span>Migration Allowed:</span> <strong>{validation.isPkgMigAllowed ? "Yes" : "No"}</strong></div>
                      <button onClick={fetchDueAmount} style={styles.primaryBtn}>Proceed to Due Amount →</button>
                    </>
                  ) : <p style={{ color: "#ef4444" }}>{error || "Validation pending..."}</p>}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div style={styles.pane}>
              <h4>Step 2: Recharge Due Calculation</h4>
              <div style={styles.dueCard}>
                <div style={styles.dueLabel}>Total Amount Payable</div>
                <div style={styles.dueValue}>₹{dueInfo?.dueAmount.toFixed(2)}</div>
                <div style={styles.dueSub}>Includes monthly pack + any OS balances</div>
              </div>
              <div style={{ marginTop: "16px", fontSize: "13px" }}>
                <div>Overdue Days: <strong>{dueInfo?.overdueDays}</strong></div>
                <div style={{ color: (dueInfo?.daysBeforeChurn || 0) < 30 ? "#ef4444" : "inherit" }}>
                  Days Before Churn: <strong>{dueInfo?.daysBeforeChurn}</strong>
                </div>
              </div>
              <button onClick={handleSimulatePayment} disabled={loading} style={styles.primaryBtn}>
                {loading ? "Processing..." : "Process Simulated Payment"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={{ ...styles.pane, textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
              <h4>Recharge Successful!</h4>
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                The account has been updated. SMS confirmation sent to RMN.
              </p>
              <button onClick={onClose} style={styles.primaryBtn}>Close Workflow</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000
  },
  modal: {
    background: "white", width: "500px", borderRadius: "12px", overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  },
  header: {
    padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex",
    justifyContent: "space-between", alignItems: "center", background: "#f8fafc"
  },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  content: { padding: "24px" },
  tracker: { display: "flex", alignItems: "center", marginBottom: "24px", justifyContent: "space-between" },
  step: { fontSize: "12px", fontWeight: 700, textTransform: "uppercase" },
  line: { flex: 1, height: "2px", background: "#f1f5f9", margin: "0 10px" },
  pane: { display: "flex", flexDirection: "column", gap: "12px" },
  details: { padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" },
  row: { display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" },
  primaryBtn: {
    marginTop: "16px", padding: "12px", background: "var(--brand-primary)",
    color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer"
  },
  dueCard: {
    padding: "20px", background: "#eff6ff", borderRadius: "8px", border: "1px solid #bfdbfe", textAlign: "center"
  },
  dueLabel: { fontSize: "12px", color: "#1e40af", fontWeight: 600, textTransform: "uppercase" },
  dueValue: { fontSize: "32px", fontWeight: 800, color: "#1e3a8a", margin: "8px 0" },
  dueSub: { fontSize: "11px", color: "#60a5fa" }
};
