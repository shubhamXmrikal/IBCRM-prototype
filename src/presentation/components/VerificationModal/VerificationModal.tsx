"use client";

import React, { useState } from "react";
import { KYCStatus } from "../../../domain/verification/VerificationTypes";

interface VerificationModalProps {
  vcNumber: string;
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  onWobLocked: () => void;
}

/**
 * VerificationModal
 *
 * Pops up when the agent tries to perform a sensitive action without being verified.
 * Simulates a server-side KYC check against MockVerificationRepository.
 */
export default function VerificationModal({
  vcNumber,
  isOpen,
  onClose,
  onVerified,
  onWobLocked,
}: VerificationModalProps) {
  const [pinCode, setPinCode] = useState("");
  const [lastRechargeAmount, setLastRechargeAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // We simulate calling an API route here, but since this is prototype
      // we can do a mock fetch or directly define an API.
      // Easiest is to add an API route POST /api/verification/verify
      const res = await fetch("/api/verification/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          answers: {
            pinCode,
            lastRechargeAmount: lastRechargeAmount
              ? Number(lastRechargeAmount)
              : undefined,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.status === "WOB") {
          onWobLocked();
        } else {
          setError(
            data.error || "Verification failed. Please check the details.",
          );
        }
      } else {
        if (data.status === "VERIFIED") {
          onVerified();
        } else if (data.status === "WOB") {
          onWobLocked();
        } else {
          setError("Verification failed. Please try again.");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={styles.title}>Customer KYC Verification</h3>
          <button style={styles.closeBtn} onClick={onClose} disabled={loading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <p style={styles.instructions}>
            Please verify at least two details with the caller before
            proceeding:
          </p>

          {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Registered PIN Code</label>
            <input
              type="text"
              style={styles.input}
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="e.g. 110017"
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Last Recharge Amount (₹)</label>
            <input
              type="number"
              style={styles.input}
              value={lastRechargeAmount}
              onChange={(e) => setLastRechargeAmount(e.target.value)}
              placeholder="e.g. 350"
            />
          </div>

          <div style={styles.footer}>
            <button
              type="button"
              style={styles.cancelBtn}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={styles.submitBtn}
              disabled={loading || (!pinCode && !lastRechargeAmount)}
            >
              {loading ? "Verifying..." : "Verify Caller"}
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
    width: "400px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
    border: "1px solid #334155",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    borderBottom: "1px solid #334155",
  },
  title: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#f8fafc",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "16px",
  },
  form: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  instructions: {
    margin: "0 0 8px 0",
    fontSize: "13px",
    color: "#cbd5e1",
    lineHeight: "1.5",
  },
  errorBanner: {
    padding: "10px 12px",
    background: "#450a0a",
    color: "#fca5a5",
    borderRadius: "6px",
    fontSize: "13px",
    border: "1px solid #7f1d1d",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#94a3b8",
  },
  input: {
    background: "#0f172a",
    border: "1px solid #334155",
    color: "#f8fafc",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    outline: "none",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },
  cancelBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #475569",
    color: "#cbd5e1",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  },
  submitBtn: {
    padding: "8px 16px",
    background: "#3b82f6",
    border: "none",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
  },
};
