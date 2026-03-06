"use client";

import React, { useState, useEffect } from "react";
import { FestiveOffer, FestiveEligibilityResult, CampaignStatus } from "../../../domain/package/CampaignTypes";

interface FestiveOffersTabProps {
  smsId: string;
  vcNumber: string;
}

export default function FestiveOffersTab({ smsId, vcNumber }: FestiveOffersTabProps) {
  const [offers, setOffers] = useState<FestiveOffer[]>([]);
  const [eligibility, setEligibility] = useState<FestiveEligibilityResult | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [smsId, vcNumber]);

  const fetchData = async () => {
    setLoading(true);
    const [festRes, campRes] = await Promise.all([
      fetch(`/api/campaigns/festive?smsId=${smsId}&vcNumber=${vcNumber}`),
      fetch(`/api/campaigns/status?smsId=${smsId}`)
    ]);

    if (festRes.ok) {
      const data = await festRes.json();
      setOffers(data.offers);
      setEligibility(data.eligibility);
    }
    if (campRes.ok) {
      setCampaigns(await campRes.json());
    }
    setLoading(false);
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Campaign Hub...</div>;

  return (
    <div style={styles.container}>
      {/* Active Campaigns Section */}
      {campaigns.length > 0 && (
        <div style={styles.section}>
          <h4 style={{ margin: "0 0 12px 0", color: "#1e293b" }}>🎯 Live Campaigns</h4>
          {campaigns.map(c => (
            <div key={c.campaignId} style={styles.campaignCard}>
              <div style={styles.campaignHeader}>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={styles.pointsBadge}>{c.bonusPoints} Bonus Pts</div>
              </div>
              <div style={styles.milestones}>
                {c.milestonesReached.map((m, i) => (
                  <span key={i} style={styles.milestoneTag}>✓ {m}</span>
                ))}
              </div>
              <div style={{ fontSize: "11px", marginTop: "8px", color: "#64748b" }}>
                Engagement Level: <strong>{c.engagementLevel}</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Festive Eligibility & Cashback */}
      {eligibility && eligibility.isEligible && (
        <div style={styles.cashbackBox}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: "24px" }}>🧧</span>
            <div>
              <div style={{ fontWeight: 700 }}>Festive Cashback Eligible!</div>
              <div style={{ fontSize: "12px" }}>
                Get <strong>₹{eligibility.cashback?.amount}</strong> back on your next renewal.
              </div>
            </div>
          </div>
          <div style={{ fontSize: "11px", opacity: 0.8 }}>
            Valid: {new Date(eligibility.cashback!.validFrom).toLocaleDateString()} - {new Date(eligibility.cashback!.validTo).toLocaleDateString()}
          </div>
        </div>
      )}

      {/* Available Festive Offers */}
      <div style={styles.section}>
        <h4 style={{ margin: "0 0 12px 0", color: "#1e293b" }}>🎁 Festive Special Upgrades</h4>
        <div style={styles.offerGrid}>
          {offers.length === 0 ? (
            <div style={styles.empty}>No festive offers currently available for your STB type.</div>
          ) : (
            offers.map(o => (
              <div key={o.id} style={styles.offerCard}>
                <div style={styles.typeBadge}>{o.type}</div>
                <div style={styles.offerName}>{o.name}</div>
                <div style={styles.packageName}>{o.packageName}</div>
                <div style={styles.offerValue}>Save ₹{o.offerAmount}</div>
                <button 
                  style={styles.applyBtn}
                  onClick={() => alert(`Applying Festive Offer: ${o.name}`)}
                >
                  Apply Offer
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "16px", display: "flex", flexDirection: "column", gap: "24px" },
  section: { flex: 1 },
  campaignCard: { padding: "16px", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: "12px" },
  campaignHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" },
  pointsBadge: { background: "#0ea5e9", color: "white", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 },
  milestones: { display: "flex", flexWrap: "wrap", gap: "8px" },
  milestoneTag: { fontSize: "11px", color: "#0369a1", background: "white", padding: "2px 6px", borderRadius: "4px", border: "1px solid #7dd3fc" },
  cashbackBox: {
    padding: "16px 20px", background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  offerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" },
  offerCard: {
    padding: "16px", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0",
    display: "flex", flexDirection: "column", position: "relative"
  },
  typeBadge: {
    position: "absolute", top: "8px", right: "8px", fontSize: "9px", fontWeight: 700,
    padding: "2px 6px", background: "#fef3c7", color: "#92400e", borderRadius: "4px", textTransform: "uppercase"
  },
  offerName: { fontWeight: 700, fontSize: "14px", marginBottom: "4px" },
  packageName: { fontSize: "12px", color: "#64748b", marginBottom: "12px" },
  offerValue: { color: "#16a34a", fontWeight: 800, fontSize: "16px", marginBottom: "12px" },
  applyBtn: {
    padding: "8px", background: "var(--brand-primary)", color: "white",
    border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer", fontSize: "12px"
  },
  empty: { textAlign: "center", padding: "20px", color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: "8px" }
};
