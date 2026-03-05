"use client";
import React, { useState } from "react";
import { Customer } from "../../../domain/customer/Customer";
import ContactUpdatePanel from "../ContactUpdate/ContactUpdatePanel";

interface SubscriberCardProps {
  customer: Customer;
}

export default function SubscriberCard({ customer }: SubscriberCardProps) {
  const { address, contact } = customer;
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [localContact, setLocalContact] = useState({
    email: contact.email,
    mobile: contact.rmn || contact.mobile1,
  });

  const handleContactUpdate = (newEmail: string, newMobile: string) => {
    setLocalContact({ email: newEmail, mobile: newMobile });
    setIsEditingContact(false);
    alert("Contact details updated successfully!");
  };

  const styles = {
    contactRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px 0",
      borderTop: "1px solid var(--border-subtle)",
    },
    icon: {
      width: "20px",
      height: "20px",
      color: "var(--text-secondary)",
    },
    contactValue: {
      fontSize: "13px",
      fontWeight: 600,
      color: "var(--text-primary)",
    },
    contactLabel: {
      fontSize: "11px",
      color: "var(--text-secondary)",
    },
  };

  return (
    <div className="card" style={{ marginBottom: 0 }}>
      <h3
        style={{
          fontSize: "14px",
          color: "var(--brand-primary)",
          marginBottom: "12px",
        }}
      >
        Subscriber Detail
      </h3>
      <div
        style={{
          fontSize: "20px",
          fontWeight: 600,
          marginBottom: "8px",
        }}
      >
        {customer.name}
      </div>
      <div
        style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          marginBottom: "12px",
        }}
      >
        {customer.address.line1}, {customer.address.city},{" "}
        {customer.address.state} {customer.address.pin}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          padding: "8px 0",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span>VC No:</span> <strong>{customer.vcNumber}</strong>
      </div>

      <div style={styles.contactRow}>
        <svg style={styles.icon} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"
          />
        </svg>
        <div>
          <div style={styles.contactValue}>{localContact.mobile || "NA"}</div>
          <div style={styles.contactLabel}>Registered Mobile</div>
        </div>
      </div>

      <div style={styles.contactRow}>
        <svg style={styles.icon} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          />
        </svg>
        <div>
          <div style={styles.contactValue}>
            {localContact.email || "Not Available"}
          </div>
          <div style={styles.contactLabel}>Email Address</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          padding: "8px 0",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span>Alt. No:</span> <span>{customer.contact.mobile2 || "NA"}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          padding: "8px 0",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span>Email:</span>{" "}
        <span>{customer.contact.email || "Not Available"}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          padding: "8px 0",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span>District:</span> <span>{customer.address.district}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          padding: "8px 0",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span>Landmark:</span> <span>{customer.address.landmark || "NA"}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          padding: "8px 0",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <span>VC Loc:</span>{" "}
        <strong style={{ color: "var(--brand-primary)" }}>
          {customer.technical.vcLocation}
        </strong>
      </div>
    </div>
  );
}
