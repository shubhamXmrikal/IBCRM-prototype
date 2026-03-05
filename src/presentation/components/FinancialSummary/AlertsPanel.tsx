import React from "react";
import { CustomerAlert } from "../../../domain/customer/Customer";

interface AlertsPanelProps {
  alerts: CustomerAlert[];
}

const alertColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  PROMO: { bg: "#eff6ff", border: "#3b82f6", text: "#1d4ed8" },
  WARNING: { bg: "#fef2f2", border: "#ef4444", text: "#b91c1c" },
  ERROR: { bg: "#fef2f2", border: "#dc2626", text: "#991b1b" },
  INFO: { bg: "#f8fafc", border: "#64748b", text: "#334155" },
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <div
      className="card"
      style={{
        marginBottom: 0,
        padding: "16px",
        backgroundColor: "#fff7ed",
        border: "1px solid #fdba74",
      }}
    >
      <h3 style={{ fontSize: "14px", color: "#ea580c", marginBottom: "12px" }}>
        Alerts &amp; Messages
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxHeight: "220px",
          overflowY: "auto",
        }}
      >
        {alerts.length === 0 ? (
          <p
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            No active alerts.
          </p>
        ) : (
          alerts.map((alert) => {
            const colors = alertColors[alert.type] ?? alertColors.INFO;
            return (
              <div
                key={alert.id}
                style={{
                  padding: "10px",
                  backgroundColor: colors.bg,
                  borderLeft: `4px solid ${colors.border}`,
                  fontSize: "12px",
                  lineHeight: 1.4,
                  borderRadius: "0 4px 4px 0",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: colors.text,
                    marginBottom: "4px",
                  }}
                >
                  {alert.type} MESSAGE
                </strong>
                {alert.message}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
