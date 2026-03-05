"use client";

import React, { useState } from "react";
import { SubscriberSubscription } from "../../../domain/package/PackageTypes";

interface OptOutModalProps {
  sub: SubscriberSubscription;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OptOutModal({ sub, onClose, onSuccess }: OptOutModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/packages/opt-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subId: sub.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div className="card" style={styles.modal}>
        <h3 style={{ marginBottom: "8px", color: "#ef4444" }}>Opt Out of Package</h3>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
          Are you sure you want to deactivate package <strong>{sub.packageId}</strong>?
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {error && <div style={{ color: "#ef4444", fontSize: "13px" }}>{error}</div>}
          
          <div style={{ background: "#fef3c7", padding: "12px", borderRadius: "4px", fontSize: "12px", border: "1px solid #fde68a", color: "#92400e" }}>
            <strong>Opt-Out Gate Check:</strong> Deactivation will be scheduled for the end of the current billing cycle if outside the allowed window.
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
            <button type="button" className="btn-primary" style={{ background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ background: "#ef4444" }} disabled={loading}>Confirm Opt Out</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  modal: { width: "400px", padding: "24px" }
};