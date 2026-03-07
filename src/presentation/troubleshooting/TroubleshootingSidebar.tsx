"use client";

import React from "react";
import { TroubleshootingCategory } from "../../domain/troubleshooting/types";
import { MOCK_TROUBLESHOOTING_CATEGORIES } from "../../infrastructure/troubleshooting/mockData";

interface TroubleshootingSidebarProps {
  onSelectCategory: (category: TroubleshootingCategory) => void;
  selectedCategoryId?: string;
}

const colorMap: Record<string, string> = {
  RED: "#ef4444",
  YELLOW: "#f59e0b",
  GREEN: "#22c55e",
  WHITE: "#ffffff",
  BLUE: "#3b82f6",
};

export default function TroubleshootingSidebar({
  onSelectCategory,
  selectedCategoryId,
}: TroubleshootingSidebarProps) {
  const [view, setView] = React.useState<"STANDARD" | "SMRT">("STANDARD");

  const filteredCategories = MOCK_TROUBLESHOOTING_CATEGORIES.filter(
    (cat) => (view === "SMRT" ? cat.isSMRT : !cat.isSMRT)
  );

  return (
    <div
      style={{
        width: 280,
        height: "100%",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc",
      }}
    >
      <div
        style={{
          padding: "12px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        <button
          type="button"
          onClick={() => setView(view === "STANDARD" ? "SMRT" : "STANDARD")}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#f97316",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "8px",
          }}
        >
          {view === "STANDARD" ? "SWITCH TO SMRT STICK" : "SWITCH TO STANDARD"}
        </button>
        <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
          {view === "STANDARD" ? "TECHNICAL CALLS" : "SMRT STICK CALLS"}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        {filteredCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat)}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "10px 12px",
              marginBottom: "4px",
              borderRadius: "4px",
              border: "1px solid #e2e8f0",
              backgroundColor: selectedCategoryId === cat.id ? "#fff7ed" : "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: selectedCategoryId === cat.id ? "#9a3412" : "#1e293b",
                fontWeight: selectedCategoryId === cat.id ? 600 : 500,
              }}
            >
              {cat.name}
            </span>
            {cat.statusColor && (
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: colorMap[cat.statusColor],
                  border: "1px solid #cbd5e1",
                }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        style={{
          padding: "12px",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <button
          type="button"
          style={actionButtonStyle}
          onClick={() => console.log("Warranty Details")}
        >
          WARRANTY DETAILS
        </button>
        <button
          type="button"
          style={actionButtonStyle}
          onClick={() => console.log("LCN List")}
        >
          LCN LIST
        </button>
      </div>
    </div>
  );
}

const actionButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "6px",
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: "4px",
  fontSize: "11px",
  fontWeight: 600,
  color: "#475569",
  cursor: "pointer",
};
