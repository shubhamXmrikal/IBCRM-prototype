"use client";

import React, { useState, useEffect } from "react";
import { MovieProduct, MODRequest, ModKitty } from "../../../domain/mod/MODTypes";
import MovieOrderModal from "./MovieOrderModal";

interface MODDashboardTabProps {
  vcNumber: string;
  smsId: string;
}

export default function MODDashboardTab({ vcNumber, smsId }: MODDashboardTabProps) {
  const [catalogue, setCatalogue] = useState<MovieProduct[]>([]);
  const [orders, setOrders] = useState<MODRequest[]>([]);
  const [kitty, setKitty] = useState<ModKitty | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieProduct | null>(null);

  useEffect(() => {
    fetchData();
  }, [vcNumber, smsId]);

  const fetchData = async () => {
    setLoading(true);
    const [catRes, ordRes, kitRes] = await Promise.all([
      fetch("/api/mod/catalogue"),
      fetch(`/api/mod/orders?vcNumber=${vcNumber}`),
      fetch(`/api/mod/kitty?smsId=${smsId}`)
    ]);

    if (catRes.ok) setCatalogue(await catRes.json());
    if (ordRes.ok) setOrders(await ordRes.json());
    if (kitRes.ok) setKitty(await kitRes.json());
    setLoading(false);
  };

  const handleResendSignal = async (requestId: string) => {
    const res = await fetch("/api/mod/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "resend", requestId })
    });
    if (res.ok) {
      alert("Signal re-sent successfully via CONAX.");
    }
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Movies & PPV...</div>;

  return (
    <div style={styles.container}>
      {/* Top Banner with Kitty Balance */}
      {kitty && (
        <div style={styles.kittyBanner}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>🍿</span>
            <div>
              <div style={{ fontWeight: 700 }}>Movie Kitty Balance</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>You have <strong>{kitty.balance} free movies</strong> remaining.</div>
            </div>
          </div>
          <div style={{ fontSize: "11px", textAlign: "right" }}>Valid until: {new Date(kitty.validUntil).toLocaleDateString()}</div>
        </div>
      )}

      <div style={styles.contentLayout}>
        {/* Catalogue Section */}
        <div style={styles.section}>
          <h4 style={{ margin: "0 0 16px 0" }}>Browse Catalogue</h4>
          <div style={styles.movieGrid}>
            {catalogue.map(movie => (
              <div key={movie.id} style={styles.movieCard}>
                <div style={styles.categoryTag}>{movie.category}</div>
                <div style={styles.movieName}>{movie.name}</div>
                <div style={styles.moviePrice}>₹{movie.price}</div>
                <button 
                  style={styles.orderBtn}
                  onClick={() => setSelectedMovie(movie)}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Orders Section */}
        <div style={{ ...styles.section, flex: "0 0 350px" }}>
          <h4 style={{ margin: "0 0 16px 0" }}>Current Authorizations</h4>
          <div style={styles.orderList}>
            {orders.length === 0 ? (
              <div style={styles.empty}>No active movie orders.</div>
            ) : (
              orders.map(order => (
                <div key={order.id} style={styles.orderCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={styles.orderStatus}>{order.status}</span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>ID: {order.id}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{order.productName}</div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                    Expires: {new Date(order.endDate).toLocaleString()}
                  </div>
                  <button 
                    style={styles.resendBtn}
                    onClick={() => handleResendSignal(order.id)}
                  >
                    Resend Signal 📡
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedMovie && (
        <MovieOrderModal 
          movie={selectedMovie}
          vcNumber={vcNumber}
          smsId={smsId}
          kittyBalance={kitty?.balance || 0}
          onClose={() => setSelectedMovie(null)}
          onSuccess={() => {
            setSelectedMovie(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "16px", display: "flex", flexDirection: "column", gap: "20px" },
  kittyBanner: {
    padding: "16px 20px", background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    color: "white", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center"
  },
  contentLayout: { display: "flex", gap: "24px" },
  section: { flex: 1 },
  movieGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" },
  movieCard: {
    padding: "16px", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0",
    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative"
  },
  categoryTag: {
    position: "absolute", top: "8px", right: "8px", fontSize: "10px", fontWeight: 700,
    padding: "2px 6px", background: "#f1f5f9", borderRadius: "4px"
  },
  movieName: { fontWeight: 700, fontSize: "14px", marginBottom: "8px", marginTop: "12px", height: "40px", overflow: "hidden" },
  moviePrice: { color: "var(--brand-primary)", fontWeight: 800, fontSize: "18px", marginBottom: "12px" },
  orderBtn: {
    width: "100%", padding: "8px", background: "var(--brand-primary)", color: "white",
    border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer"
  },
  orderList: { display: "flex", flexDirection: "column", gap: "12px" },
  orderCard: { padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" },
  orderStatus: { fontSize: "10px", fontWeight: 700, color: "#16a34a", textTransform: "uppercase" },
  resendBtn: {
    marginTop: "12px", width: "100%", padding: "6px", background: "white", border: "1px solid #cbd5e1",
    borderRadius: "4px", fontSize: "12px", cursor: "pointer"
  },
  empty: { textAlign: "center", padding: "40px", color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: "8px" }
};
