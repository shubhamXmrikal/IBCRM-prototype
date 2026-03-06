"use client";

import React, { useState, useEffect } from "react";
import { AppointmentSlot } from "../../../domain/complaint/ComplaintTypes";

interface LogComplaintModalProps {
  vcNumber: string;
  smsId: string;
  onClose: () => void;
  onSuccess: (ticketId: string) => void;
}

export default function LogComplaintModal({ vcNumber, smsId, onClose, onSuccess }: LogComplaintModalProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"NORMAL" | "HIGH">("NORMAL");
  const [isServiceRequest, setIsServiceRequest] = useState(false);
  
  // Service Request Fields
  const [stbNo, setStbNo] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [slotId, setSlotId] = useState("");
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    checkEligibility();
    fetchSlots();
  }, [vcNumber]);

  const checkEligibility = async () => {
    setValidating(true);
    const res = await fetch(`/api/complaints?vcNumber=${vcNumber}&mode=validate`);
    if (res.ok) {
      const data = await res.json();
      if (!data.isEligible) {
        setValidationError(data.message);
      }
    }
    setValidating(false);
  };

  const fetchSlots = async () => {
    const res = await fetch("/api/master/appointment-slots");
    if (res.ok) {
      const data = await res.json();
      setSlots(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      vcNumber,
      smsId,
      category,
      categoryId: "CAT_MOCK_01",
      status: "OPEN",
      description,
      priority,
      agentId: "AGENT_001",
      agentName: "Mock Agent",
      tatHours: isServiceRequest ? 48 : 24,
      ...(isServiceRequest && {
        stbNo,
        appointmentDate: new Date(appointmentDate),
        appointmentSlotId: slotId,
        address: { line1: "Mock Address", city: "Delhi", pin: "110001" }
      })
    };

    const res = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      onSuccess(data.ticketId);
    } else {
      const err = await res.json();
      alert(err.error);
    }
    setLoading(false);
  };

  if (validating) return <div style={styles.overlay}>Validating subscriber eligibility...</div>;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Log New Complaint</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {validationError ? (
          <div style={styles.errorPane}>
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>⚠️</div>
            <div style={{ fontWeight: 600, marginBottom: "8px" }}>Validation Failed</div>
            <div style={{ fontSize: "13px", opacity: 0.9 }}>{validationError}</div>
            <button onClick={onClose} style={styles.cancelBtn}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.content}>
            {step === 1 && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Complaint Category</label>
                <select 
                  style={styles.input} 
                  value={category} 
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setIsServiceRequest(e.target.value.includes("Signal") || e.target.value.includes("Hardware"));
                  }}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="No Signal">No Signal / Technical</option>
                  <option value="Hardware Issue">STB / Hardware Fault</option>
                  <option value="Billing Dispute">Billing / Recharge Inquiry</option>
                  <option value="Package Change">Package Change Request</option>
                </select>

                <label style={styles.label}>Description / Remarks</label>
                <textarea 
                  style={{ ...styles.input, height: "80px" }} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed complaint notes..."
                  required
                />

                <label style={styles.label}>Priority</label>
                <div style={{ display: "flex", gap: "12px" }}>
                  <label><input type="radio" checked={priority === "NORMAL"} onChange={() => setPriority("NORMAL")} /> Normal</label>
                  <label><input type="radio" checked={priority === "HIGH"} onChange={() => setPriority("HIGH")} /> High Priority</label>
                </div>

                <div style={styles.footer}>
                  <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                  <button 
                    type="button" 
                    onClick={() => isServiceRequest ? setStep(2) : handleSubmit({ preventDefault: () => {} } as any)} 
                    style={styles.submitBtn}
                  >
                    {isServiceRequest ? "Next: Appointment →" : "Log Complaint"}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={styles.formGroup}>
                <div style={styles.infoBox}>
                  <strong>Technical Category Detected</strong>
                  <div style={{ fontSize: "12px" }}>Please schedule a technician visit.</div>
                </div>

                <label style={styles.label}>STB Number (Confirmed with User)</label>
                <input style={styles.input} value={stbNo} onChange={(e) => setStbNo(e.target.value)} placeholder="STB12345..." required />

                <label style={styles.label}>Preferred Date</label>
                <input type="date" style={styles.input} value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />

                <label style={styles.label}>Time Slot</label>
                <select style={styles.input} value={slotId} onChange={(e) => setSlotId(e.target.value)} required>
                  <option value="">Select Slot</option>
                  {slots.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>

                <div style={styles.footer}>
                  <button type="button" onClick={() => setStep(1)} style={styles.cancelBtn}>Back</button>
                  <button type="submit" disabled={loading} style={styles.submitBtn}>
                    {loading ? "Logging..." : "Create Service Request"}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "white",
    width: "450px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8fafc",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#64748b",
  },
  content: {
    padding: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
  },
  infoBox: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    padding: "10px",
    borderRadius: "6px",
    color: "#1e40af",
    fontSize: "13px",
  },
  errorPane: {
    padding: "40px 20px",
    textAlign: "center",
    color: "#991b1b",
  },
  footer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelBtn: {
    padding: "8px 16px",
    background: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
  },
  submitBtn: {
    padding: "8px 16px",
    background: "var(--brand-primary)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
  }
};
