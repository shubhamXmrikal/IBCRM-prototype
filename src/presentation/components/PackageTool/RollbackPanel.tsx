"use client";

import React, { useState } from "react";
import { RollbackHistory } from "../../../domain/package/PackageTypes";

interface RollbackPanelProps {
  vcNumber: string;
  rollbackEligible: RollbackHistory;
  onRollbackSuccess: () => void;
}

export default function RollbackPanel({ vcNumber, rollbackEligible, onRollbackSuccess }: RollbackPanelProps) {
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRollback = async () => {
    if (!remarks) {
      setError("Remarks are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/packages/rollback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vcNumber,
          rollbackId: rollbackEligible.id,
          remarks,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Package rolled back successfully!");
      onRollbackSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: "16px", background: "#f0fdf4", border: "1px solid #bbf7d0", marginBottom: 0 }}>
      <h4 style={{ fontSize: "14px", color: "#166534", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>↺</span> Package Rollback Available
      </h4>
      <p style={{ fontSize: "12px", color: "#166534", marginBottom: "12px" }}>
        Customer recently changed packages on {new Date(rollbackEligible.changedDate).toLocaleDateString()}. You can revert to <strong>{rollbackEligible.previousPackageId}</strong>.
      </p>

      {error && <div style={{ color: "#ef4444", fontSize: "12px", marginBottom: "8px" }}>{error}</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Reason for rollback..." 
          value={remarks} 
          onChange={(e) => setRemarks(e.target.value)} 
        />
        <button 
          className="btn-primary" 
          style={{ background: "#16a34a", alignSelf: "flex-start", padding: "6px 12px", fontSize: "12px" }} 
          onClick={handleRollback}
          disabled={loading || !remarks}
        >
          {loading ? "Reverting..." : "Revert Package"}
        </button>
      </div>
    </div>
  );
}