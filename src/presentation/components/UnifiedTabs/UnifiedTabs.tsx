"use client";

import React, { useState } from "react";
import HistoryTimeline from "../HistoryTimeline/HistoryTimeline";
import PackageToolBox from "../PackageTool/PackageToolBox";

interface UnifiedTabsProps {
  historyData: any;
  vcNumber: string;
}

export default function UnifiedTabs({ historyData, vcNumber }: UnifiedTabsProps) {
  const [activeTab, setActiveTab] = useState("timeline");

  const tabs = [
    { id: "overview", label: "360 Overview" },
    { id: "timeline", label: "History Timeline" },
    { id: "packages", label: "Package Tool" },
    { id: "service", label: "Service & Hardware" },
    { id: "billing", label: "Billing & SOA" },
  ];

  return (
    <div
      className="card"
      style={{
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "500px",
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "#f8fafc",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "16px 24px",
              border: "none",
              backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
              borderBottom:
                activeTab === tab.id
                  ? "2px solid var(--brand-primary)"
                  : "2px solid transparent",
              color:
                activeTab === tab.id
                  ? "var(--brand-primary)"
                  : "var(--text-secondary)",
              fontWeight: activeTab === tab.id ? 600 : 500,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#ffffff" }}>
        {activeTab === "timeline" && (
          <HistoryTimeline
            interactions={historyData?.interactions || []}
            serviceRequests={historyData?.serviceRequests || []}
          />
        )}

        {activeTab === "overview" && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <h3>360 Overview</h3>
            <p style={{ marginTop: "8px" }}>
              Consolidated view of active packages, recent alerts, and account
              health.
            </p>
          </div>
        )}

        {activeTab === "packages" && (
          <PackageToolBox vcNumber={vcNumber} />
        )}

        {activeTab === "service" && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <h3>Service & Hardware</h3>
            <p style={{ marginTop: "8px" }}>
              DVR, INS Requests, Installation, and Technical Escalations.
            </p>
          </div>
        )}

        {activeTab === "billing" && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            <h3>Billing & SOA</h3>
            <p style={{ marginTop: "8px" }}>
              Statement of Account, Payments, Reconciliations, and Waivers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
