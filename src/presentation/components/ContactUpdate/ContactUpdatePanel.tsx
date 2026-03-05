"use client";

import React, { useState } from "react";

interface ContactUpdatePanelProps {
  vcNumber: string;
  currentEmail: string;
  currentMobile: string;
  onSuccess: (newEmail: string, newMobile: string) => void;
  onCancel: () => void;
}

export default function ContactUpdatePanel({
  vcNumber,
  currentEmail,
  currentMobile,
  onSuccess,
  onCancel,
}: ContactUpdatePanelProps) {
  const [email, setEmail] = useState(currentEmail);
  const [mobile, setMobile] = useState(currentMobile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verification/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          newEmail: email !== currentEmail ? email : undefined,
          newMobile: mobile !== currentMobile ? mobile : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed.");

      onSuccess(email, mobile);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title}>Update Contact Details</h4>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.errorBanner}>⚠️ {error}</div>}

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Registered Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Registered Mobile (RMN)</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            style={styles.input}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div style={styles.footer}>
          <button type="button" onClick={onCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button
            type="submit"
            style={styles.submitBtn}
            disabled={
              loading || (email === currentEmail && mobile === currentMobile)
            }
          >
            {loading ? "Updating..." : "Save Changes"}
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
    marginBottom: "16px",
  },
  title: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#f8fafc",
  },
  form: {
    display: "flex",
    flexDirection: "column",
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
