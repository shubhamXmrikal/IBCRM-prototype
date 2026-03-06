"use client";

import React, { useState, useEffect } from "react";
import { PromoAlacarte } from "../../../domain/package/AlacarteTypes";

interface PromoOffersListProps {
  smsId: string;
}

export default function PromoOffersList({ smsId }: PromoOffersListProps) {
  const [promos, setPromos] = useState<PromoAlacarte[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromos();
  }, [smsId]);

  const fetchPromos = async () => {
    setLoading(true);
    const res = await fetch(`/api/packages/promos?smsId=${smsId}`);
    if (res.ok) {
      const data = await res.json();
      setPromos(data);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading promotions...</div>;
  if (promos.length === 0) return <div style={{ padding: "20px", color: "#64748b" }}>No active promotional offers.</div>;

  return (
    <div style={styles.container}>
      <h4 style={{ marginBottom: "12px" }}>Active Promotions & Trials</h4>
      <div style={styles.list}>
        {promos.map(promo => (
          <div key={promo.id} style={{ ...styles.card, opacity: promo.status === "EXPIRED" ? 0.6 : 1 }}>
            <div style={styles.badgeRow}>
              <span style={{ ...styles.typeBadge, backgroundColor: getTypeColor(promo.type) }}>{promo.type}</span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>ID: {promo.orderId}</span>
            </div>
            <div style={styles.name}>{promo.name}</div>
            <div style={styles.dates}>
              Valid: {new Date(promo.billingStartDate).toLocaleDateString()} - {new Date(promo.billingUptoDate).toLocaleDateString()}
            </div>
            {promo.status === "EXPIRED" && <div style={styles.expiredLabel}>EXPIRED</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "FREE": return "#3b82f6";
    case "TRIAL": return "#8b5cf6";
    case "WINBACK": return "#10b981";
    default: return "#64748b";
  }
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "12px",
  },
  card: {
    padding: "12px",
    background: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    position: "relative",
  },
  badgeRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  typeBadge: {
    color: "white",
    fontSize: "10px",
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: "4px",
    textTransform: "uppercase",
  },
  name: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  dates: {
    fontSize: "12px",
    color: "#64748b",
  },
  expiredLabel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-15deg)",
    border: "2px solid #ef4444",
    color: "#ef4444",
    padding: "2px 8px",
    fontWeight: 800,
    fontSize: "14px",
    borderRadius: "4px",
    pointerEvents: "none",
  }
};
