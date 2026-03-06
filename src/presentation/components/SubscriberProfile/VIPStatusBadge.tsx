"use client";

import React, { useState, useEffect } from "react";
import { VIPStatus, VIPBenefit } from "../../../domain/loyalty/LoyaltyTypes";

interface VIPStatusBadgeProps {
  vcNumber: string;
}

export default function VIPStatusBadge({ vcNumber }: VIPStatusBadgeProps) {
  const [data, setData] = useState<{ status: VIPStatus | null; benefits: VIPBenefit[] }>({ status: null, benefits: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchData();
  }, [vcNumber]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/loyalty/vip?vcNumber=${vcNumber}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    const res = await fetch("/api/loyalty/vip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vcNumber })
    });
    if (res.ok) {
      alert("Subscriber successfully enrolled in DishVIP!");
      setShowModal(false);
      fetchData();
    } else {
      const err = await res.json();
      alert(err.error);
    }
    setEnrolling(false);
  };

  if (loading || !data.status) return null;

  const { status, benefits } = data;

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        style={{
          ...styles.badge,
          backgroundColor: status.isVIP ? "#fef3c7" : "#f1f5f9",
          color: status.isVIP ? "#92400e" : "#64748b",
          cursor: "pointer"
        }}
      >
        {status.isVIP ? "🌟 DishVIP Member" : "⚙️ Check VIP Eligibility"}
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.header}>
              <h3 style={{ margin: 0 }}>DishVIP Premium Program</h3>
              <button onClick={() => setShowModal(false)} style={styles.closeBtn}>✕</button>
            </div>

            <div style={styles.content}>
              {status.isVIP ? (
                <div style={styles.enrolledInfo}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎖️</div>
                  <h4 style={{ margin: 0 }}>Premium Member Since {new Date(status.enrolledOn!).toLocaleDateString()}</h4>
                  <p style={{ fontSize: "13px", color: "#64748b" }}>This subscriber is part of our elite tier with full benefits active.</p>
                </div>
              ) : (
                <div style={styles.prospectInfo}>
                  {status.isEligible ? (
                    <div style={styles.eligibleBox}>
                      <strong>✅ Subscriber is Eligible!</strong>
                      <div style={{ fontSize: "12px", marginTop: "4px" }}>{status.eligibilityReason}</div>
                    </div>
                  ) : (
                    <div style={styles.ineligibleBox}>
                      <strong>❌ Not Eligible for VIP</strong>
                      <div style={{ fontSize: "12px", marginTop: "4px" }}>{status.eligibilityReason}</div>
                    </div>
                  )}
                </div>
              )}

              <div style={styles.benefitsGrid}>
                {benefits.map(b => (
                  <div key={b.id} style={styles.benefitItem}>
                    <span style={{ fontSize: "20px" }}>{b.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "13px" }}>{b.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{b.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {!status.isVIP && status.isEligible && (
                <button 
                  onClick={handleEnroll} 
                  disabled={enrolling}
                  style={styles.enrollBtn}
                >
                  {enrolling ? "Enrolling..." : "Enroll in DishVIP Now 🚀"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  badge: { padding: "4px 10px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, display: "inline-block" },
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 6000 },
  modal: { background: "white", width: "450px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
  header: { padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  content: { padding: "24px", display: "flex", flexDirection: "column", gap: "20px" },
  enrolledInfo: { textAlign: "center", padding: "20px", background: "#fffbeb", borderRadius: "8px", border: "1px solid #fef3c7" },
  eligibleBox: { padding: "12px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px", color: "#065f46" },
  ineligibleBox: { padding: "12px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "6px", color: "#991b1b" },
  benefitsGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  benefitItem: { display: "flex", gap: "12px", alignItems: "center" },
  enrollBtn: { padding: "12px", background: "#d97706", color: "white", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer" }
};
