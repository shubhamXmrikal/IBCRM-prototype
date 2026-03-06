"use client";

import React, { useState } from "react";
import { MovieProduct } from "../../../domain/mod/MODTypes";

interface MovieOrderModalProps {
  movie: MovieProduct;
  vcNumber: string;
  smsId: string;
  kittyBalance: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MovieOrderModal({ movie, vcNumber, smsId, kittyBalance, onClose, onSuccess }: MovieOrderModalProps) {
  const [payMode, setPayMode] = useState<"BALANCE" | "KITTY">("BALANCE");
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (payMode === "KITTY" && kittyBalance <= 0) {
      alert("Insufficient Movie Kitty balance!");
      return;
    }

    setLoading(true);
    const orderPayload = {
      vcNumber,
      productId: movie.id,
      productName: movie.name,
      status: "AUTHORIZED" as const,
      requestDate: new Date(),
      startDate: movie.startDate,
      endDate: movie.endDate,
      price: payMode === "KITTY" ? 0 : movie.price,
      payMode,
      doneBy: "AGENT_001",
      internalId: `INT_${Math.floor(Math.random() * 1000000)}`
    };

    const res = await fetch("/api/mod/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: orderPayload })
    });

    if (res.ok) {
      onSuccess();
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
          <h3 style={{ margin: 0 }}>Confirm Movie Order</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.content}>
          <div style={styles.movieInfo}>
            <div style={{ fontWeight: 700, fontSize: "18px" }}>{movie.name}</div>
            <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>
              Category: {movie.category} | Starts: {new Date(movie.startDate).toLocaleDateString()}
            </div>
            {movie.requiresThreeSatellite && (
              <div style={styles.warning}>⚠️ This movie requires 3-Satellite alignment.</div>
            )}
          </div>

          <div style={styles.paymentSection}>
            <label style={styles.label}>Select Payment Mode</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="payMode" 
                  checked={payMode === "BALANCE"} 
                  onChange={() => setPayMode("BALANCE")} 
                />
                DTH Balance (₹{movie.price})
              </label>
              <label style={{ ...styles.radioLabel, opacity: kittyBalance > 0 ? 1 : 0.5 }}>
                <input 
                  type="radio" 
                  name="payMode" 
                  checked={payMode === "KITTY"} 
                  onChange={() => setPayMode("KITTY")}
                  disabled={kittyBalance <= 0}
                />
                Movie Kitty ({kittyBalance} left)
              </label>
            </div>
          </div>

          <button 
            style={styles.confirmBtn}
            onClick={handleOrder}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm & Authorize Signal"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4000
  },
  modal: {
    background: "white", width: "400px", borderRadius: "12px", overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  },
  header: {
    padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex",
    justifyContent: "space-between", alignItems: "center", background: "#f8fafc"
  },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  content: { padding: "24px", display: "flex", flexDirection: "column", gap: "20px" },
  movieInfo: { padding: "16px", background: "#f1f5f9", borderRadius: "8px" },
  warning: { marginTop: "12px", fontSize: "12px", color: "#ea580c", fontWeight: 600 },
  paymentSection: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#64748b" },
  radioGroup: { display: "flex", flexDirection: "column", gap: "10px" },
  radioLabel: { display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" },
  confirmBtn: {
    padding: "12px", background: "var(--brand-primary)", color: "white",
    border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer"
  }
};
