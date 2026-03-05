"use client";

import React, { useState } from "react";
import { TempDeactivationRequest } from "../../../domain/verification/VerificationTypes";

interface TempDeactivationFormProps {
  vcNumber: string;
  onClose: () => void;
  onSuccess: (request: TempDeactivationRequest) => void;
}

/**
 * TempDeactivationForm
 *
 * Allows an agent to schedule a temporary suspension of service (e.g. vacation).
 * Mirrors InsertTempDeactivationRequest & RamadanOpt_Out_In_Request logic.
 */
export default function TempDeactivationForm({
  vcNumber,
  onClose,
  onSuccess,
}: TempDeactivationFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("VACATION");
  const [isRamadan, setIsRamadan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verification/deactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          startDate,
          endDate,
          reason,
          isRamadanRequest: isRamadan,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      onSuccess(data.request);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to ensure min date is tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateConfig = tomorrow.toISOString().split("T")[0];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title}>Schedule Temp Deactivation</h4>
        <button onClick={onClose} style={styles.closeBtn}>
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

        <div style={styles.row}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Start Date</label>
            <input
              type="date"
              style={styles.input}
              value={startDate}
              min={minDateConfig}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>End Date</label>
            <input
              type="date"
              style={styles.input}
              value={endDate}
              min={startDate || minDateConfig}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Reason</label>
          <select
            style={styles.input}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="VACATION">Going on Vacation</option>
            <option value="EXAMS">School / College Exams</option>
            <option value="FINANCIAL">Financial Issues</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isRamadan}
            onChange={(e) => setIsRamadan(e.target.checked)}
            style={styles.checkbox}
          />
          Ramadan Special Opt-In (Allows shorter suspension window)
        </label>

        <div style={styles.footer}>
          <button type="button" onClick={onClose} style={styles.cancelBtn}>
            Cancel
          </button>
          <button
            type="submit"
            style={styles.submitBtn}
            disabled={loading || !startDate || !endDate}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "#1e293b",
    borderRadius: "8px",
    border: "1px solid #334155",
    padding: "16px",
    marginTop: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#f8fafc",
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
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
    padding: "8px",
    borderRadius: "4px",
    fontSize: "13px",
  },
  checkboxLabel: {
    fontSize: "12px",
    color: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "8px",
    cursor: "pointer",
  },
  checkbox: {
    accentColor: "#3b82f6",
  },
  errorBanner: {
    padding: "8px",
    background: "#450a0a",
    color: "#fca5a5",
    borderRadius: "4px",
    fontSize: "12px",
    border: "1px solid #7f1d1d",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "12px",
  },
  cancelBtn: {
    padding: "6px 12px",
    background: "transparent",
    border: "1px solid #475569",
    color: "#cbd5e1",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  submitBtn: {
    padding: "6px 12px",
    background: "#3b82f6",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
  },
};
