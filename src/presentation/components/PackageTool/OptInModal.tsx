"use client";

import React, { useState } from "react";
import { PackageItem } from "../../../domain/package/PackageTypes";

interface OptInModalProps {
  pkg: PackageItem;
  vcNumber: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OptInModal({ pkg, vcNumber, onClose, onSuccess }: OptInModalProps) {
  const [consentGiven, setConsentGiven] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/packages/opt-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          packageId: pkg.id,
          requiresConsent: pkg.requiresConsent,
          consentGiven,
          scheduledDate: scheduledDate || undefined
        }),
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
        <h3 style={{ marginBottom: "8px" }}>Activate Package</h3>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>
          You are adding <strong>{pkg.name}</strong> for ₹{pkg.price}.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {error && <div style={{ color: "#ef4444", fontSize: "13px" }}>{error}</div>}
          
          <div>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "4px", fontWeight: 600 }}>Schedule Activation (Optional)</label>
            <input type="date" className="input-field" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          </div>

          {pkg.requiresConsent && (
            <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "13px", background: "#fef2f2", padding: "8px", borderRadius: "4px", border: "1px solid #fecaca" }}>
              <input type="checkbox" checked={consentGiven} onChange={e => setConsentGiven(e.target.checked)} />
              I have verbal consent from the customer to activate this paid service.
            </label>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
            <button type="button" className="btn-primary" style={{ background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading || (pkg.requiresConsent && !consentGiven)}>Confirm</button>
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