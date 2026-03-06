"use client";

import React, { useState } from "react";

interface OTPChallengeModalProps {
  vcNumber: string;
  mobileNo: string;
  source: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function OTPChallengeModal({ vcNumber, mobileNo, source, onClose, onSuccess }: OTPChallengeModalProps) {
  const [step, setStep] = useState(1); // 1: Trigger, 2: Validate
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/comm/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "generate", vcNumber, mobileNo, source })
    });
    if (res.ok) {
      const data = await res.json();
      alert(`[DEBUG] OTP Sent: ${data.otp}`); // Simulating SMS arrival
      setStep(2);
    }
    setLoading(false);
  };

  const handleValidate = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/comm/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "validate", vcNumber, code })
    });
    const data = await res.json();
    if (data.isValid) {
      onSuccess();
    } else {
      setError("Invalid or expired OTP code.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Security Verification</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <div style={styles.content}>
          {step === 1 ? (
            <div style={styles.pane}>
              <p style={{ fontSize: "14px", color: "#475569" }}>
                A verification code will be sent to the registered mobile: <strong>XXXXXX{mobileNo.slice(-4)}</strong>
              </p>
              <button onClick={handleGenerate} disabled={loading} style={styles.primaryBtn}>
                {loading ? "Sending..." : "Send OTP 📲"}
              </button>
            </div>
          ) : (
            <div style={styles.pane}>
              <p style={{ fontSize: "14px", color: "#475569" }}>Enter the 6-digit code received on your mobile.</p>
              <input 
                style={styles.input} 
                value={code} 
                onChange={e => setCode(e.target.value)} 
                placeholder="000000"
                maxLength={6}
              />
              {error && <div style={styles.error}>{error}</div>}
              <button onClick={handleValidate} disabled={loading || code.length < 6} style={styles.primaryBtn}>
                {loading ? "Verifying..." : "Verify Code →"}
              </button>
              <button onClick={() => setStep(1)} style={styles.linkBtn}>Didn't receive code? Resend</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 7000 },
  modal: { background: "white", width: "350px", borderRadius: "12px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
  header: { padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc" },
  closeBtn: { background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#64748b" },
  content: { padding: "24px" },
  pane: { display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" },
  input: { padding: "12px", borderRadius: "8px", border: "2px solid #cbd5e1", fontSize: "20px", textAlign: "center", fontWeight: 700, letterSpacing: "4px" },
  primaryBtn: { padding: "12px", background: "var(--brand-primary)", color: "white", border: "none", borderRadius: "6px", fontWeight: 700, cursor: "pointer" },
  linkBtn: { background: "none", border: "none", color: "var(--brand-primary)", fontSize: "12px", cursor: "pointer", textDecoration: "underline" },
  error: { color: "#ef4444", fontSize: "13px", fontWeight: 500 }
};
