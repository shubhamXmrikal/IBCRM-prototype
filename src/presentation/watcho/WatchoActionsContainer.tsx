"use client";

import React from "react";

type WatchoCategory = "Subscription" | "Sales" | "Inquiry";

interface WatchoAction {
  id: string;
  label: string;
  category: WatchoCategory;
  description: string;
  iconColor: string;
  isPromo?: boolean;
}

const WATCHO_ACTIONS: WatchoAction[] = [
  // Subscription
  { id: "WATCHO_RENEWAL", label: "Manual Renewal", category: "Subscription", description: "Trigger manual renewal using DTH wallet balance.", iconColor: "#8b5cf6" },
  { id: "WATCHO_RENEWAL_REVERSAL", label: "Renew Reversal", category: "Subscription", description: "Reverse accidental or double renewals within 24h.", iconColor: "#7c3aed" },
  { id: "WATCHO_AUTO_RENEW_CANCEL", label: "Auto-Renew Cancel", category: "Subscription", description: "Disable automatic monthly recurring billing.", iconColor: "#6d28d9" },
  { id: "WATCHO_ACTIVATE_OFFER", label: "Activate Offer", category: "Subscription", description: "Apply a pending voucher or promotional code.", iconColor: "#4c1d95" },

  // Sales
  { id: "WATCHO_PROSPECT", label: "Watcho Prospect", category: "Sales", description: "Personalized OTT pitch based on DTH usage history.", iconColor: "#f97316", isPromo: true },
  { id: "FREEDOM_PLAN", label: "Freedom Plan", category: "Sales", description: "Pitch Watcho for Non-DTH / Generic mobile users.", iconColor: "#fb923c" },
  { id: "VZY_OTT_ACTIVATE", label: "VZY OTT Activate", category: "Sales", description: "One-click activation for VZY bundled subscribers.", iconColor: "#ea580c" },
  
  // Inquiry
  { id: "WATCHO_DETAILS", label: "Subscriber Details", category: "Inquiry", description: "View linked devices, active plans, and expiry dates.", iconColor: "#3b82f6" },
  { id: "COUPON_STATUS", label: "Coupon History", category: "Inquiry", description: "Track redemption status of Watcho promo coupons.", iconColor: "#2563eb" },
  { id: "PLAN_ELIGIBILITY", label: "Pack Eligibility", category: "Inquiry", description: "Check if the DTH account is eligible for upselling.", iconColor: "#1d4ed8" },
];

export default function WatchoActionsContainer() {
  const [selectedCategory, setSelectedCategory] = React.useState<WatchoCategory>("Subscription");

  const categories: WatchoCategory[] = ["Subscription", "Sales", "Inquiry"];

  const filteredActions = WATCHO_ACTIONS.filter(a => a.category === selectedCategory);

  const handleAction = (action: WatchoAction) => {
    alert(`Executing Watcho Action: ${action.label}\n\n${action.description}`);
  };

  return (
    <div style={{ display: "flex", height: "100%", backgroundColor: "#ffffff" }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: 140,
        backgroundColor: "#f5f3ff", // Light purple tint for Watcho
        borderRight: "1px solid #ddd6fe",
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
              borderRight: selectedCategory === cat ? "2px solid #7c3aed" : "none",
              color: selectedCategory === cat ? "#7c3aed" : "#6b7280",
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
          color: "#4c1d95",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}>
          Watcho {selectedCategory}
          <span style={{ 
            fontSize: 10, 
            fontWeight: 400, 
            color: "#7c3aed", 
            backgroundColor: "#ede9fe", 
            padding: "2px 6px", 
            borderRadius: 999 
          }}>
            {filteredActions.length} Actions
          </span>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
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
                border: `1px solid ${action.isPromo ? "#fed7aa" : "#e2e8f0"}`,
                borderRadius: 6,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.isPromo ? "#f97316" : "#7c3aed";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = action.isPromo ? "#fed7aa" : "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05)";
              }}
            >
              {action.isPromo && (
                <div style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "#f97316",
                  color: "#ffffff",
                  fontSize: 8,
                  fontWeight: "bold",
                  padding: "1px 4px",
                  borderRadius: 4,
                  textTransform: "uppercase"
                }}>
                  Promo
                </div>
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
              
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1e1b4b", marginBottom: 4 }}>
                {action.label}
              </div>
              
              <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.4 }}>
                {action.description}
              </div>
            </button>
          ))}
        </div>
        
        {/* Watcho Insights Banner */}
        <div style={{ 
          marginTop: 24, 
          padding: "12px", 
          backgroundColor: "#f5f3ff", 
          borderRadius: 6, 
          border: "1px dashed #c4b5fd",
          display: "flex",
          gap: 12,
          alignItems: "center"
        }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            backgroundColor: "#7c3aed", 
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: 20
          }}>
            ?
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5b21b6" }}>Proactive Pitch Recommendation</div>
            <div style={{ fontSize: 11, color: "#6d28d9" }}>Customer currently has Rs. 150 balance. Pitch the Watcho Mirchi Plan @ Rs. 99.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
