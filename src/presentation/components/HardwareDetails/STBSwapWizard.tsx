"use client";

import React, { useState, useEffect } from "react";
import { STBDetail } from "../../../domain/hardware/HardwareTypes";

interface STBSwapWizardProps {
  vcNumber: string;
  oldSTBNo: string;
  onClose: () => void;
  onSuccess: (swapId: string) => void;
}

export default function STBSwapWizard({ vcNumber, oldSTBNo, onClose, onSuccess }: STBSwapWizardProps) {
  const [step, setStep] = useState(1);
  const [newSTBNo, setNewSTBNo] = useState("");
  const [newSTBDetails, setNewSTBDetails] = useState<STBDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adapterBrands, setAdapterBrands] = useState<{id: string, name: string}[]>([]);
  
  // Form fields
  const [ticketId, setTicketId] = useState("");
  const [faultCode, setFaultCode] = useState("HW_FAULT_01");
  const [adapterBrandId, setAdapterBrandId] = useState("");
  const [isAdapterReturned, setIsAdapterReturned] = useState(false);
  const [isRemoteReturned, setIsRemoteReturned] = useState(false);

  useEffect(() => {
    fetch("/api/hardware/details?mode=brands")
      .then(res => res.json())
      .then(data => setAdapterBrands(data));
  }, []);

  const validateNewSTB = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/hardware/details?stbNumber=${newSTBNo}`);
      if (res.ok) {
        const data = await res.json();
        setNewSTBDetails(data);
        setStep(2);
      } else {
        setError("Invalid Serial Number: STB not found in master inventory.");
      }
    } catch (e) {
      setError("Network error during validation.");
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async () => {
    setLoading(true);
    const payload = {
      vcNumber,
      oldSTBNo,
      newSTBNo,
      swapType: "STANDARD",
      ticketId,
      faultCode,
      stbAdapterBrandId: adapterBrandId,
      isAdapterReturned,
      isRemoteReturned,
      isAdapterFaulty: true,
      remarks: "Technician swap initiated via CRM wizard.",
      status: "PENDING"
    };

    const res = await fetch("/api/hardware/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      onSuccess(data.swapId);
    } else {
      const err = await res.json();
      setError(err.error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>STB Swap Wizard</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.content}>
          <div style={styles.tracker}>
            <div style={{ ...styles.step, color: step >= 1 ? "var(--brand-primary)" : "#cbd5e1" }}>1. Validate</div>
            <div style={styles.line}></div>
            <div style={{ ...styles.step, color: step >= 2 ? "var(--brand-primary)" : "#cbd5e1" }}>2. Compatibility</div>
            <div style={styles.line}></div>
            <div style={{ ...styles.step, color: step >= 3 ? "var(--brand-primary)" : "#cbd5e1" }}>3. Finish</div>
          </div>

          {step === 1 && (
            <div style={styles.pane}>
              <label style={styles.label}>Old STB (Faulty)</label>
              <div style={styles.readOnly}>{oldSTBNo}</div>

              <label style={styles.label}>New STB Serial Number</label>
              <input 
                style={styles.input} 
                value={newSTBNo} 
                onChange={e => setNewSTBNo(e.target.value)} 
                placeholder="Enter new STB serial..."
              />
              {error && <div style={styles.error}>{error}</div>}
              
              <button 
                onClick={validateNewSTB} 
                disabled={!newSTBNo || loading} 
                style={styles.primaryBtn}
              >
                {loading ? "Validating..." : "Validate Serial →"}
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={styles.pane}>
              <div style={styles.infoBox}>
                <strong>New STB Verified:</strong> {newSTBDetails?.modelName} ({newSTBDetails?.modelType})
              </div>

              <label style={styles.label}>Complaint Ticket ID (Resolved)</label>
              <input style={styles.input} value={ticketId} onChange={e => setTicketId(e.target.value)} placeholder="TKT123456" />

              <div style={styles.grid}>
                <div>
                  <label style={styles.label}>Adapter Brand</label>
                  <select style={styles.input} value={adapterBrandId} onChange={e => setAdapterBrandId(e.target.value)}>
                    <option value="">-- Select --</option>
                    {adapterBrands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Fault Code</label>
                  <select style={styles.input} value={faultCode} onChange={e => setFaultCode(e.target.value)}>
                    <option value="HW_FAULT_01">Power Issue</option>
                    <option value="HW_FAULT_02">Signal/Tuner Issue</option>
                    <option value="HW_FAULT_03">Software/OAD Fail</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" checked={isAdapterReturned} onChange={e => setIsAdapterReturned(e.target.checked)} />
                  Adapter Returned
                </label>
                <label style={styles.checkboxLabel}>
                  <input type="checkbox" checked={isRemoteReturned} onChange={e => setIsRemoteReturned(e.target.checked)} />
                  Remote Returned
                </label>
              </div>

              <div style={styles.footer}>
                <button onClick={() => setStep(1)} style={styles.cancelBtn}>Back</button>
                <button onClick={executeSwap} disabled={!ticketId || loading} style={styles.primaryBtn}>
                  {loading ? "Processing..." : "Confirm & Swap STB"}
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
  pane: { display: "flex", flexDirection: "column", gap: "12px" },
  label: { fontSize: "12px", fontWeight: 600, color: "#475569" },
  input: { padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px" },
  readOnly: { padding: "10px", background: "#f1f5f9", borderRadius: "6px", fontSize: "14px", border: "1px solid #e2e8f0", color: "#64748b" },
  error: { color: "#ef4444", fontSize: "12px", fontWeight: 500 },
  infoBox: { padding: "12px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px", color: "#065f46", fontSize: "13px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" },
  footer: { marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "12px" },
  cancelBtn: { padding: "10px 16px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" },
  primaryBtn: { padding: "10px 16px", background: "var(--brand-primary)", color: "white", border: "none", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }
};
