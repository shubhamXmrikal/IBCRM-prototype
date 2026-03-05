import React from "react";
import { Customer } from "../../../domain/customer/Customer";

interface HardwareStatusProps {
  customer: Customer;
}

export default function HardwareStatus({ customer }: HardwareStatusProps) {
  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <h3
        style={{
          fontSize: "14px",
          color: "var(--brand-primary)",
          marginBottom: "12px",
        }}
      >
        Technical Details
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "8px",
          fontSize: "13px",
        }}
      >
        <span style={{ color: "var(--text-secondary)" }}>Warranty:</span>{" "}
        <a href="#" style={{ color: "#3b82f6" }}>
          {customer.technical.warrantyStatus}
        </a>
        <span style={{ color: "var(--text-secondary)" }}>Vfy Key:</span>{" "}
        <span style={{ fontFamily: "monospace", fontSize: "11px" }}>
          {customer.callerContext?.verifierKey || "NA"}
        </span>
        <span style={{ color: "var(--text-secondary)" }}>STB No:</span>{" "}
        <strong>{customer.technical.stbNumber}</strong>
        <span style={{ color: "var(--text-secondary)" }}>Model:</span>{" "}
        <span>{customer.technical.stbModel}</span>
        <span style={{ color: "var(--text-secondary)" }}>
          VC Location:
        </span>{" "}
        <span>{customer.technical.vcLocation}</span>
        <span style={{ color: "var(--text-secondary)" }}>Package:</span>{" "}
        <span style={{ fontWeight: 600, color: "var(--brand-primary)" }}>
          {customer.metrics.packageName || "NA"}
        </span>
      </div>
      <h4
        style={{
          fontSize: "12px",
          color: "var(--text-secondary)",
          marginTop: "16px",
          marginBottom: "8px",
          textTransform: "uppercase",
        }}
      >
        Important Dates
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: "8px",
          fontSize: "13px",
        }}
      >
        <span style={{ color: "var(--text-secondary)" }}>Activation:</span>{" "}
        <span>
          {new Date(customer.metrics.activationDate).toLocaleDateString()}
        </span>
        <span style={{ color: "var(--text-secondary)" }}>SwitchOff:</span>{" "}
        <strong style={{ color: "#dc2626" }}>
          {new Date(customer.metrics.switchOffDate).toLocaleDateString()}
        </strong>
        <span style={{ color: "var(--text-secondary)" }}>Recharge:</span>{" "}
        <strong>
          {new Date(customer.metrics.rechargeDate).toLocaleDateString()}
        </strong>
        <span style={{ color: "var(--text-secondary)" }}>FP End Date:</span>{" "}
        <span>NA</span>
      </div>
    </div>
  );
}
