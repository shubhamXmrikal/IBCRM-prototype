"use client";

import React, { useState, useEffect } from "react";
import { STBDetail, STBSwapRequest } from "../../../domain/hardware/HardwareTypes";
import STBSwapWizard from "./STBSwapWizard";
import OTPChallengeModal from "../CallHandling/OTPChallengeModal";

interface HardwareManagementTabProps {
  vcNumber: string;
  mobileNo: string;
}

export default function HardwareManagementTab({ vcNumber, mobileNo }: HardwareManagementTabProps) {
  const [stb, setStb] = useState<STBDetail | null>(null);
  const [history, setHistory] = useState<STBSwapRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSwapWizard, setShowSwapWizard] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);

  useEffect(() => {
    fetchHardware();
  }, [vcNumber]);

  const fetchHardware = async () => {
    setLoading(true);
    // 1. Get pairing info to find STB serial
    const pairRes = await fetch(`/api/recharge/validate?vcNumber=${vcNumber}`);
    if (pairRes.ok) {
      const pairData = await pairRes.json();
      
      // 2. Get full STB details
      const detailRes = await fetch(`/api/hardware/details?stbNumber=${pairData.stbNumber || pairData.technical?.stbNumber || "2101XYZ45PQ19001"}`);
      if (detailRes.ok) setStb(await detailRes.json());
    }

    // 3. Get Swap History
    const histRes = await fetch(`/api/hardware/swap?vcNumber=${vcNumber}`);
    if (histRes.ok) setHistory(await histRes.json());

    setLoading(false);
  };

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Hardware State...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.contentLayout}>
        {/* Current Hardware Card */}
        <div style={styles.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h4 style={{ margin: 0 }}>Active Set-Top Box</h4>
            <button 
              style={styles.swapBtn}
              onClick={() => setShowOTPModal(true)}
            >
              🔄 STB Swap / Repair
            </button>
          </div>

          {stb && (
            <div style={styles.hardwareCard}>
              <div style={styles.cardHeader}>
                <span style={styles.stbIcon}>📺</span>
                <div>
                  <div style={styles.serial}>{stb.stbNumber}</div>
                  <div style={styles.model}>{stb.modelName} ({stb.modelType})</div>
                </div>
                <div style={{ ...styles.statusBadge, backgroundColor: stb.warrantyStatus === "IN_WARRANTY" ? "#dcfce7" : "#fee2e2", color: stb.warrantyStatus === "IN_WARRANTY" ? "#166534" : "#991b1b" }}>
                  {stb.warrantyStatus.replace("_", " ")}
                </div>
              </div>

              <div style={styles.detailGrid}>
                <div style={styles.detailItem}>
                  <div style={styles.label}>Box Category</div>
                  <div style={styles.value}>{stb.boxCategory}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.label}>Chip Side</div>
                  <div style={styles.value}>{stb.chipSide || "NA"}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.label}>DVR Features</div>
                  <div style={styles.value}>{stb.isDVRReady ? "Enabled" : "Not Supported"}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.label}>Mono-Block</div>
                  <div style={styles.value}>{stb.isMonoBlock ? "Yes" : "No"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Swap History Section */}
        <div style={{ ...styles.section, flex: "0 0 400px" }}>
          <h4 style={{ margin: "0 0 16px 0" }}>Hardware Lifecycle History</h4>
          <div style={styles.historyList}>
            {history.length === 0 ? (
              <div style={styles.empty}>No previous hardware swaps.</div>
            ) : (
              history.map(req => (
                <div key={req.id} style={styles.historyCard}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={styles.historyType}>{req.swapType} SWAP</span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>{new Date(req.createdOn!).toLocaleDateString()}</span>
                  </div>
                  <div style={styles.historyPath}>
                    <span>{req.oldSTBNo}</span>
                    <span style={{ margin: "0 8px", color: "#94a3b8" }}>→</span>
                    <span style={{ fontWeight: 700 }}>{req.newSTBNo}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                    Ticket: {req.ticketId} | Done By: Agent
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showSwapWizard && stb && (
        <STBSwapWizard 
          vcNumber={vcNumber}
          oldSTBNo={stb.stbNumber}
          onClose={() => setShowSwapWizard(false)}
          onSuccess={(id) => {
            setShowSwapWizard(false);
            alert(`Swap request ${id} completed. Pairing updated.`);
            fetchHardware();
          }}
        />
      )}

      {showOTPModal && (
        <OTPChallengeModal 
          vcNumber={vcNumber}
          mobileNo={mobileNo}
          source="HARDWARE_SWAP"
          onClose={() => setShowOTPModal(false)}
          onSuccess={() => {
            setShowOTPModal(false);
            setShowSwapWizard(true);
          }}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "16px" },
  contentLayout: { display: "flex", gap: "24px" },
  section: { flex: 1 },
  swapBtn: { padding: "6px 12px", background: "var(--brand-primary)", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: 600, cursor: "pointer" },
  hardwareCard: { padding: "20px", background: "white", borderRadius: "12px", border: "1px solid var(--border-subtle)", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  cardHeader: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" },
  stbIcon: { fontSize: "32px" },
  serial: { fontSize: "18px", fontWeight: 800, color: "var(--brand-primary)" },
  model: { fontSize: "13px", color: "#64748b" },
  statusBadge: { padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 700 },
  detailGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  detailItem: { display: "flex", flexDirection: "column" },
  label: { fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 600 },
  value: { fontSize: "14px", fontWeight: 600, color: "#1e293b" },
  historyList: { display: "flex", flexDirection: "column", gap: "12px" },
  historyCard: { padding: "12px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" },
  historyType: { fontSize: "10px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase" },
  historyPath: { marginTop: "8px", fontSize: "13px" },
  empty: { textAlign: "center", padding: "40px", color: "#64748b", border: "1px dashed #cbd5e1", borderRadius: "8px" }
};
