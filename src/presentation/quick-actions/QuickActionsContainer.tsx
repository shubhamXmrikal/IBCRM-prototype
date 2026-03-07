"use client";

import React from "react";

type ActionCategory = "Finance" | "Support" | "Services" | "Hardware" | "Misc";

interface QuickAction {
  id: string;
  label: string;
  category: ActionCategory;
  description: string;
  iconColor: string;
  isCritical?: boolean;
}

const QUICK_ACTIONS: QuickAction[] = [
  // Finance
  { id: "PAY_LATER", label: "Pay Later", category: "Finance", description: "3-day emergency activation for deactive customers.", iconColor: "#f97316" },
  { id: "CARE_DESK_WAIVER", label: "Care Desk Waiver", category: "Finance", description: "Apply monthly kitty-based waivers (L2 only).", iconColor: "#f59e0b" },
  { id: "RESEND_WAIVER", label: "Resend Waiver", category: "Finance", description: "Resend pending waiver approval SMS to customer.", iconColor: "#fbbf24" },
  { id: "ZING_WAIVER", label: "Zing Add-on Waiver", category: "Finance", description: "Specialized waiver for Zing Home Channel OS.", iconColor: "#d97706" },

  // Support
  { id: "CALL_CLOSURE", label: "Call Closure", category: "Support", description: "Standard call tagging and closure workflow.", iconColor: "#10b981" },
  { id: "BACKEND_LEAD", label: "BackEnd Lead", category: "Support", description: "Escalate specialized request to backend office.", iconColor: "#059669" },
  { id: "SMS_RECEIVED", label: "SMS Received", category: "Support", description: "View history of SMS received from customer.", iconColor: "#3b82f6" },
  { id: "SENT_EMAIL", label: "Sent Email", category: "Support", description: "Check status of emails sent to registered address.", iconColor: "#2563eb" },
  { id: "MISSED_CALL", label: "Missed Call Details", category: "Support", description: "Audit history of missed calls/promotional triggers.", iconColor: "#1d4ed8" },

  // Services
  { id: "CHANGE_STATUS", label: "Change Status", category: "Services", description: "Update subscriber life-cycle status (Active/Deactive).", iconColor: "#8b5cf6" },
  { id: "MULTI_TO_INDI", label: "Multi To Individual", category: "Services", description: "Convert multi-TV parent to independent account.", iconColor: "#7c3aed" },
  { id: "UP_DOWN_DETAILS", label: "Upd/Dwn Status", category: "Services", description: "Check status of recent package upgrades/downgrades.", iconColor: "#6d28d9" },
  { id: "ADV_PKG_REQ", label: "Adv Pkg Req", category: "Services", description: "Pre-book future dated package changes.", iconColor: "#4c1d95" },
  { id: "HOTEL_SUBS", label: "Hotel Subs", category: "Services", description: "Specialized workflows for commercial/hotel base.", iconColor: "#4338ca" },

  // Hardware
  { id: "SMRT_OTA", label: "SMRT Stick OTA", category: "Hardware", description: "Trigger software update for SMRT sticks.", iconColor: "#06b6d4" },
  { id: "BOX_SVC_PLAN", label: "Box Ser. Plan", category: "Hardware", description: "Unified hardware protection plan management.", iconColor: "#0891b2" },
  { id: "NFDC_MVOD", label: "NFDC MVOD", category: "Hardware", description: "Process specialized video-on-demand requests.", iconColor: "#0e7490" },
  { id: "OMM_BLOCKING", label: "OMM Blocking", category: "Hardware", description: "Check OMM level hardware blocks.", iconColor: "#ef4444", isCritical: true },

  // Misc
  { id: "ECOM_INST", label: "E-COM Inst.", category: "Misc", description: "Validate e-commerce platform installation requests.", iconColor: "#64748b" },
  { id: "EPRS_TRAN", label: "EPRS Tran", category: "Misc", description: "Check history of EPRS transactions.", iconColor: "#475569" },
  { id: "EPRS_VC", label: "EPRS VC", category: "Misc", description: "EPRS VC mapping and verification.", iconColor: "#334155" },
];

export default function QuickActionsContainer() {
  const [selectedCategory, setSelectedCategory] = React.useState<ActionCategory>("Finance");

  const categories: ActionCategory[] = ["Finance", "Support", "Services", "Hardware", "Misc"];

  const filteredActions = QUICK_ACTIONS.filter(a => a.category === selectedCategory);

  const handleAction = (action: QuickAction) => {
    alert(`Executing: ${action.label}\n\n${action.description}`);
  };

  return (
    <div style={{ display: "flex", height: "100%", backgroundColor: "#ffffff" }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: 140,
        backgroundColor: "#f8fafc",
        borderRight: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        padding: "8px 0"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 16px",
              textAlign: "left",
              backgroundColor: selectedCategory === cat ? "#ffffff" : "transparent",
              border: "none",
              borderRight: selectedCategory === cat ? "2px solid #f97316" : "none",
              color: selectedCategory === cat ? "#f97316" : "#64748b",
              fontWeight: selectedCategory === cat ? 600 : 500,
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Actions Grid */}
      <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        <div style={{ 
          marginBottom: 16, 
          fontSize: 14, 
          fontWeight: 600, 
          color: "#1e293b",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          {selectedCategory} Utilities
          <span style={{ 
            fontSize: 10, 
            fontWeight: 400, 
            color: "#94a3b8", 
            backgroundColor: "#f1f5f9", 
            padding: "2px 6px", 
            borderRadius: 999 
          }}>
            {filteredActions.length} Actions
          </span>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
          gap: 12 
        }}>
          {filteredActions.map(action => (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "12px",
                backgroundColor: "#ffffff",
                border: `1px solid ${action.isCritical ? "#fecaca" : "#e2e8f0"}`,
                borderRadius: 6,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.isCritical ? "#ef4444" : "#f97316";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = action.isCritical ? "#fecaca" : "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
              }}
            >
              {action.isCritical && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "0 24px 24px 0",
                  borderColor: `transparent #ef4444 transparent transparent`,
                }} />
              )}
              
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: 6, 
                backgroundColor: `${action.iconColor}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                color: action.iconColor,
                fontWeight: "bold"
              }}>
                {action.label.charAt(0)}
              </div>
              
              <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 4 }}>
                {action.label}
              </div>
              
              <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.4 }}>
                {action.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
