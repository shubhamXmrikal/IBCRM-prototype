import React from "react";

interface SidebarProps {
  onRecharge?: () => void;
}

export default function Sidebar({ onRecharge }: SidebarProps) {
  return (
    <aside className="crm-sidebar">
      <div
        style={{
          padding: "24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "0.5px" }}
        >
          DISH<span style={{ color: "var(--brand-primary)" }}>CRM</span>
        </h2>
        <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "4px" }}>
          Customer Service Module
        </p>
      </div>

      <nav style={{ padding: "16px 0" }}>
        <ul style={{ listStyle: "none" }}>
          <li
            style={{
              padding: "12px 24px",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderLeft: "3px solid var(--brand-primary)",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 500 }}>
              Customer 360
            </span>
          </li>
          <li 
            style={{ padding: "12px 24px", opacity: 0.7, cursor: "pointer" }}
            onClick={onRecharge}
          >
            <span style={{ fontSize: "14px", color: "#fbbf24", fontWeight: 600 }}>⚡ Recharge Account</span>
          </li>
          <li style={{ padding: "12px 24px", opacity: 0.7, cursor: "pointer" }}>
            <span style={{ fontSize: "14px" }}>Service Calls</span>
          </li>
          <li style={{ padding: "12px 24px", opacity: 0.7, cursor: "pointer" }}>
            <span style={{ fontSize: "14px" }}>CC Add-ons</span>
          </li>
          <li style={{ padding: "12px 24px", opacity: 0.7, cursor: "pointer" }}>
            <span style={{ fontSize: "14px" }}>Reports & Audit</span>
          </li>
        </ul>
      </nav>

      <div
        style={{
          marginTop: "auto",
          padding: "24px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ fontSize: "13px" }}>
          Agent: <strong style={{ color: "white" }}>Aman S.</strong>
        </div>
        <div style={{ fontSize: "12px", opacity: 0.6, marginTop: "4px" }}>
          Corporate User
        </div>
      </div>
    </aside>
  );
}
