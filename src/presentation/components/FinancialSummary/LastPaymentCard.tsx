import React from "react";
import { Customer } from "../../../domain/customer/Customer";

interface LastPaymentCardProps {
  customer: Customer;
}

export default function LastPaymentCard({ customer }: LastPaymentCardProps) {
  const isActive = customer.metrics.status === "ACTIVE";

  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <h3
        style={{
          fontSize: "14px",
          color: "var(--brand-primary)",
          marginBottom: "12px",
        }}
      >
        Other Details &amp; Financial
      </h3>

      {/* Status Badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
          Status:
        </span>
        <span
          style={{
            backgroundColor: isActive
              ? "var(--status-active-bg)"
              : "var(--status-deactive-bg)",
            color: isActive
              ? "var(--status-active-text)"
              : "var(--status-deactive-text)",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {customer.metrics.status}
        </span>
      </div>

      {/* Key Details */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr",
          gap: "8px",
          fontSize: "13px",
          marginBottom: "12px",
        }}
      >
        <span style={{ color: "var(--text-secondary)" }}>DE Days:</span>
        <span>{customer.metrics.deDays}</span>
        <span style={{ color: "var(--text-secondary)" }}>Cust. Type:</span>
        <span>{customer.metrics.customerType}</span>
        <span style={{ color: "var(--text-secondary)" }}>SMS ID:</span>
        <span>{customer.id}</span>
        <span style={{ color: "var(--text-secondary)" }}>Top Category:</span>
        <span
          style={{
            fontWeight: 600,
            color: "#7c3aed",
            background: "#ede9fe",
            padding: "1px 8px",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          {customer.financial.topCategory}
        </span>
      </div>

      {/* Last Payment Section */}
      <h4
        style={{
          fontSize: "11px",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "8px",
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "10px",
        }}
      >
        Last Payment Details
      </h4>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "110px 1fr",
          gap: "8px",
          fontSize: "13px",
        }}
      >
        <span style={{ color: "var(--text-secondary)" }}>Amount:</span>
        <strong style={{ fontSize: "16px", color: "#16a34a" }}>
          ₹{customer.financial.lastPaymentAmount}
        </strong>
        <span style={{ color: "var(--text-secondary)" }}>Mode:</span>
        <span>{customer.financial.lastPaymentMode}</span>
        <span style={{ color: "var(--text-secondary)" }}>Paid On:</span>
        <span>
          {new Date(customer.financial.lastPaymentDate).toLocaleDateString()}
        </span>
        {customer.financial.dccSf && (
          <>
            <span style={{ color: "var(--text-secondary)" }}>DCC/SF:</span>
            <span>{customer.financial.dccSf}</span>
          </>
        )}
      </div>
    </div>
  );
}
