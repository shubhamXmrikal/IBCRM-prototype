"use client";

import React, { useState, useEffect } from "react";
import { OTTPlan, WatchoCoupon } from "../../../domain/watcho/WatchoTypes";

interface OTTPlanWizardProps {
  vcNumber: string;
  plans: OTTPlan[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function OTTPlanWizard({ vcNumber, plans, onClose, onSuccess }: OTTPlanWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [couponCode, setCouponCode] = useState("");
  const [coupons, setCoupons] = useState<WatchoCoupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<WatchoCoupon | null>(null);

  useEffect(() => {
    fetch("/api/watcho/coupons")
      .then(res => res.json())
      .then(data => setCoupons(data));
  }, []);

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode && !c.isRedeemed);
    if (coupon) {
      setAppliedCoupon(coupon);
      alert(`Coupon applied: ₹${coupon.discountAmount} discount!`);
    } else {
      alert("Invalid or expired coupon code.");
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    const res = await fetch("/api/watcho/subscriber", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        action: "subscribe", 
        vcNumber, 
        planId: selectedPlan,
        couponCode: appliedCoupon?.code
      })
    });

    if (res.ok) {
      const data = await res.json();
      alert(`Plan activated! Form No: ${data.formNo}`);
      onSuccess();
    }
    setLoading(false);
  };

  const plan = plans.find(p => p.id === selectedPlan);
  const finalPrice = plan ? Math.max(0, plan.price - (appliedCoupon?.discountAmount || 0)) : 0;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Watcho Plan Wizard</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.content}>
          <div style={styles.tracker}>
            <div style={{ ...styles.step, color: step >= 1 ? "var(--brand-primary)" : "#cbd5e1" }}>1. Select Plan</div>
            <div style={styles.line}></div>
            <div style={{ ...styles.step, color: step >= 2 ? "var(--brand-primary)" : "#cbd5e1" }}>2. Review</div>
          </div>

          {step === 1 && (
            <div style={styles.pane}>
              <div style={styles.planGrid}>
                {plans.map(p => (
                  <label key={p.id} style={{ ...styles.planCard, borderColor: selectedPlan === p.id ? "var(--brand-primary)" : "#e2e8f0" }}>
                    <input 
                      type="radio" 
                      name="plan" 
                      value={p.id} 
                      checked={selectedPlan === p.id}
                      onChange={e => setSelectedPlan(e.target.value)}
                      style={{ display: "none" }}
                    />
                    <div style={{ fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748b", margin: "4px 0" }}>{p.description}</div>
                    <div style={{ color: "var(--brand-primary)", fontWeight: 800 }}>₹{p.price}</div>
                  </label>
                ))}
              </div>
              <button 
                disabled={!selectedPlan} 
                onClick={() => setStep(2)} 
                style={{ ...styles.primaryBtn, opacity: selectedPlan ? 1 : 0.5 }}
              >
                Continue to Review →
              </button>
            </div>
          )}

          {step === 2 && plan && (
            <div style={styles.pane}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryRow}><span>Plan:</span> <strong>{plan.name}</strong></div>
                <div style={styles.summaryRow}><span>Price:</span> <strong>₹{plan.price}</strong></div>
                {appliedCoupon && (
                  <div style={{ ...styles.summaryRow, color: "#16a34a" }}>
                    <span>Coupon ({appliedCoupon.code}):</span> 
                    <strong>- ₹{appliedCoupon.discountAmount}</strong>
                  </div>
                )}
                <div style={{ ...styles.summaryRow, borderTop: "1px solid #e2e8f0", paddingTop: "8px", marginTop: "8px", fontSize: "16px" }}>
                  <span>Total Payable:</span> <strong>₹{finalPrice}</strong>
                </div>
              </div>

              <div style={styles.couponSection}>
                <input 
                  style={styles.input} 
                  placeholder="Promo Code" 
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />
                <button style={styles.applyBtn} onClick={handleApplyCoupon}>Apply</button>
              </div>

              <div style={styles.footer}>
                <button onClick={() => setStep(1)} style={styles.cancelBtn}>Back</button>
                <button onClick={handleSubscribe} disabled={loading} style={styles.primaryBtn}>
                  {loading ? "Processing..." : "Confirm Subscription"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5000 },
  modal: { background: "white", width: "450px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
  header: { padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  content: { padding: "24px" },
  tracker: { display: "flex", alignItems: "center", marginBottom: "24px", justifyContent: "space-between" },
  step: { fontSize: "11px", fontWeight: 700, textTransform: "uppercase" },
  line: { flex: 1, height: "2px", background: "#f1f5f9", margin: "0 10px" },
  pane: { display: "flex", flexDirection: "column", gap: "16px" },
  planGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  planCard: { padding: "12px", border: "2px solid", borderRadius: "8px", cursor: "pointer", textAlign: "center" },
  summaryCard: { padding: "16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "4px" },
  couponSection: { display: "flex", gap: "8px" },
  input: { flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" },
  applyBtn: { padding: "8px 12px", background: "#1e293b", color: "white", border: "none", borderRadius: "6px", fontSize: "12px", cursor: "pointer" },
  footer: { display: "flex", justifyContent: "flex-end", gap: "12px" },
  cancelBtn: { padding: "10px 16px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" },
  primaryBtn: { padding: "10px 16px", background: "var(--brand-primary)", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }
};
