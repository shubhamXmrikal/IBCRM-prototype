import React, { useState } from "react";
import VerificationModal from "../VerificationModal/VerificationModal";
import TempDeactivationForm from "../TempDeactivation/TempDeactivationForm";
import { KYCStatus } from "../../../domain/verification/VerificationTypes";

interface ActionModalsProps {
  customerName: string;
  vcNumber: string;
  kycStatus: KYCStatus;
}

export default function ActionModals({
  customerName,
  vcNumber,
  kycStatus,
}: ActionModalsProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [localKycStatus, setLocalKycStatus] = useState<KYCStatus>(kycStatus);

  const closeModal = () => {
    setActiveModal(null);
    setShowVerification(false);
    setPendingAction(null);
  };

  const handleActionClick = (action: string) => {
    // If the account is completely Locked, block all actions
    if (localKycStatus === "WOB") {
      alert(
        "This account is WOB Locked (Too many failed KYC attempts). Physical verification is required before any actions can be performed.",
      );
      return;
    }

    // Require verification for Deactivation and Recharge
    if (
      (action === "deact" || action === "recharge") &&
      localKycStatus !== "VERIFIED"
    ) {
      setPendingAction(action);
      setShowVerification(true);
    } else {
      setActiveModal(action);
    }
  };

  const handleVerified = () => {
    setLocalKycStatus("VERIFIED");
    setShowVerification(false);
    if (pendingAction) {
      setActiveModal(pendingAction);
      setPendingAction(null);
    }
  };

  const handleWobLocked = () => {
    setLocalKycStatus("WOB");
    setShowVerification(false);
    setPendingAction(null);
    alert(
      "This account is now WOB Locked due to failed KYC attempts. Physical verification is required.",
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <button
          className="btn-primary"
          onClick={() => handleActionClick("deact")}
          style={{
            backgroundColor: localKycStatus === "WOB" ? "#94a3b8" : "#ef4444",
            cursor: localKycStatus === "WOB" ? "not-allowed" : "pointer",
          }}
        >
          {localKycStatus === "WOB" && "🔒 "}Temp Deactivation
        </button>
        <button
          className="btn-primary"
          onClick={() => handleActionClick("tech")}
          style={{
            backgroundColor: localKycStatus === "WOB" ? "#94a3b8" : "#f97316",
            cursor: localKycStatus === "WOB" ? "not-allowed" : "pointer",
          }}
        >
          {localKycStatus === "WOB" && "🔒 "}Raise Tech Call
        </button>
        <button
          className="btn-primary"
          onClick={() => handleActionClick("recharge")}
          style={{
            backgroundColor: localKycStatus === "WOB" ? "#94a3b8" : "#10b981",
            cursor: localKycStatus === "WOB" ? "not-allowed" : "pointer",
          }}
        >
          {localKycStatus === "WOB" && "🔒 "}Recharge Account
        </button>
        <button
          className="btn-primary"
          onClick={() => handleActionClick("notes")}
          style={{ backgroundColor: "#64748b" }}
        >
          Add Note
        </button>
      </div>

      <VerificationModal
        vcNumber={vcNumber}
        isOpen={showVerification}
        onClose={closeModal}
        onVerified={handleVerified}
        onWobLocked={handleWobLocked}
      />

      {activeModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="card"
            style={{ width: "400px", padding: "24px", position: "relative" }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                border: "none",
                background: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {activeModal === "deact" && (
              <TempDeactivationForm
                vcNumber={vcNumber}
                onClose={closeModal}
                onSuccess={(req) => {
                  alert(
                    `Deactivation requested safely from ${req.startDate.toString()} to ${req.endDate.toString()}`,
                  );
                  closeModal();
                }}
              />
            )}

            {activeModal === "tech" && (
              <>
                <h2 style={{ marginBottom: "16px", color: "#f97316" }}>
                  Raise Tech Call
                </h2>
                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    Issue Type
                  </label>
                  <select className="input-field">
                    <option>No Signal (E52-32)</option>
                    <option>STB Not Powering On</option>
                    <option>Remote Not Working</option>
                  </select>
                </div>
              </>
            )}

            {activeModal === "recharge" && (
              <>
                <h2 style={{ marginBottom: "16px", color: "#10b981" }}>
                  Recharge Account
                </h2>
                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    defaultValue="200"
                  />
                </div>
              </>
            )}

            {activeModal === "notes" && (
              <>
                <h2 style={{ marginBottom: "16px" }}>Add Account Note</h2>
                <div style={{ marginBottom: "12px" }}>
                  <textarea
                    className="input-field"
                    rows={4}
                    placeholder="Enter interaction notes..."
                  />
                </div>
              </>
            )}

            {activeModal !== "deact" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                  marginTop: "24px",
                }}
              >
                <button
                  className="btn-primary"
                  onClick={closeModal}
                  style={{ backgroundColor: "#e2e8f0", color: "#0f172a" }}
                >
                  Cancel
                </button>
                <button className="btn-primary" onClick={closeModal}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
