"use client";

import React, { useState } from "react";
import HistoryTimeline from "../HistoryTimeline/HistoryTimeline";
import PackageToolBox from "../PackageTool/PackageToolBox";
import CallTaggingPanel from "../CallHandling/CallTaggingPanel";
import AlternateMobilesPanel from "../ContactUpdate/AlternateMobilesPanel";
import BillingAndSOATab from "../FinancialSummary/BillingAndSOATab";
import ServiceHierarchyCard from "../HardwareDetails/ServiceHierarchyCard";
import KittyRedemptionPanel from "../PackageTool/KittyRedemptionPanel";
import PromoOffersList from "../PackageTool/PromoOffersList";
import FestiveOffersTab from "../PackageTool/FestiveOffersTab";
import ComplaintHistoryTab from "../CallHandling/ComplaintHistoryTab";
import PostpaidConversionForm from "../Recharge/PostpaidConversionForm";
import MODDashboardTab from "../MOD/MODDashboardTab";
import HardwareManagementTab from "../HardwareDetails/HardwareManagementTab";
import WatchoDashboardTab from "../Watcho/WatchoDashboardTab";
import LoyaltyOverviewCard from "../FinancialSummary/LoyaltyOverviewCard";
import CommunicationHistoryTab from "../CallHandling/CommunicationHistoryTab";

interface UnifiedTabsProps {
  historyData: any;
  vcNumber: string;
  smsId: string;
}

export default function UnifiedTabs({ historyData, vcNumber, smsId }: UnifiedTabsProps) {
  const [activeTab, setActiveTab] = useState("timeline");

  const tabs = [
    { id: "overview", label: "360 Overview" },
    { id: "timeline", label: "History Timeline" },
    { id: "contact", label: "Contact Details 🆕" },
    { id: "packages", label: "Package Tool" },
    { id: "watcho", label: "Watcho 📱" },
    { id: "mod", label: "Movies & PPV 🎬" },
    { id: "complaints", label: "Tickets & Service 🎫" },
    { id: "promos", label: "Offers & Promos 🎁" },
    { id: "migration", label: "Migration 🔄" },
    { id: "comm", label: "Communications 💬" },
    { id: "call", label: "Call Handling" },
    { id: "service", label: "Hardware History" },
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
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <LoyaltyOverviewCard vcNumber={vcNumber} />
            <div
              style={{
                padding: "32px",
                textAlign: "center",
                color: "var(--text-secondary)",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px dashed var(--border-subtle)",
              }}
            >
              <h3>360 Overview</h3>
              <p style={{ marginTop: "8px" }}>
                Consolidated view of active packages, recent alerts, and account
                health.
              </p>
            </div>
          </div>
        )}

        {activeTab === "packages" && (
          <PackageToolBox vcNumber={vcNumber} smsId={smsId} />
        )}

        {activeTab === "watcho" && (
          <WatchoDashboardTab vcNumber={vcNumber} />
        )}

        {activeTab === "mod" && (
          <MODDashboardTab vcNumber={vcNumber} smsId={smsId} />
        )}

        {activeTab === "complaints" && (
          <ComplaintHistoryTab vcNumber={vcNumber} />
        )}

        {activeTab === "promos" && (
          <div style={{ padding: "16px" }}>
            <FestiveOffersTab smsId={smsId} vcNumber={vcNumber} />
            <div style={{ marginTop: "24px" }}>
              <KittyRedemptionPanel smsId={smsId} />
            </div>
            <div style={{ marginTop: "24px" }}>
              <PromoOffersList smsId={smsId} />
            </div>
          </div>
        )}

        {activeTab === "migration" && (
          <div style={{ padding: "16px" }}>
            <PostpaidConversionForm 
              vcNumber={vcNumber} 
              smsId={smsId} 
              onSuccess={(id) => alert(`Lead ${id} submitted for Postpaid Conversion!`)} 
            />
          </div>
        )}

        {activeTab === "comm" && (
          <CommunicationHistoryTab vcNumber={vcNumber} />
        )}

        {activeTab === "call" && (
          <div style={{ padding: "16px" }}>
            <CallTaggingPanel vcNumber={vcNumber} smsId={smsId} agentId="AGENT_001" onSuccess={() => setActiveTab("timeline")} />
          </div>
        )}

        {activeTab === "contact" && (
          <div style={{ padding: "16px" }}>
            <AlternateMobilesPanel smsId={smsId} vcNo={vcNumber} />
          </div>
        )}

        {activeTab === "service" && (
          <div style={{ padding: "16px" }}>
            <ServiceHierarchyCard vcNumber={vcNumber} />
            <div style={{ marginTop: "24px" }}>
              <HardwareManagementTab vcNumber={vcNumber} mobileNo={historyData?.customer?.contact?.rmn || "9999900001"} />
            </div>
          </div>
        )}

        {activeTab === "billing" && (
          <div style={{ padding: "16px" }}>
            <BillingAndSOATab vcNumber={vcNumber} smsId={smsId} />
          </div>
        )}
      </div>
    </div>
  );
}
