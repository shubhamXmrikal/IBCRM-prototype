"use client";

import React, { useState, useEffect } from "react";

interface PostpaidConversionFormProps {
  vcNumber: string;
  smsId: string;
  onSuccess: (leadId: string) => void;
}

export default function PostpaidConversionForm({ vcNumber, smsId, onSuccess }: PostpaidConversionFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subscriberName: "",
    mobileNo: "",
    address: "",
    productType: "STANDARD" as "STANDARD" | "DISHFLIX"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/recharge/postpaid-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, vcNumber, smsId })
    });

    if (res.ok) {
      const data = await res.json();
      onSuccess(data.leadId);
    } else {
      alert("Failed to create conversion lead.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h4 style={{ margin: "0 0 16px 0" }}>Prepaid to Postpaid Conversion</h4>
      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "20px" }}>
        Capture lead details for the postpaid field-verification team.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.group}>
          <label style={styles.label}>Subscriber Name</label>
          <input 
            style={styles.input} 
            value={formData.subscriberName} 
            onChange={e => setFormData({...formData, subscriberName: e.target.value})} 
            required 
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Contact Mobile</label>
          <input 
            style={styles.input} 
            value={formData.mobileNo} 
            onChange={e => setFormData({...formData, mobileNo: e.target.value})} 
            required 
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Installation Address</label>
          <textarea 
            style={{ ...styles.input, height: "60px" }} 
            value={formData.address} 
            onChange={e => setFormData({...formData, address: e.target.value})} 
            required 
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Product Variant</label>
          <select 
            style={styles.input} 
            value={formData.productType} 
            onChange={e => setFormData({...formData, productType: e.target.value as any})}
          >
            <option value="STANDARD">Standard Postpaid</option>
            <option value="DISHFLIX">DishFlix Hybrid (OTT + DTH)</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? "Processing..." : "Submit Conversion Lead 🚀"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "20px", background: "white", borderRadius: "8px", border: "1px solid var(--border-subtle)" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  group: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "12px", fontWeight: 600, color: "#475569" },
  input: { padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "14px" },
  submitBtn: {
    marginTop: "12px", padding: "10px", background: "#10b981",
    color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer"
  }
};
