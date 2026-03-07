"use client";

import React from "react";
import { DiagnosticStep, DiagnosticOption } from "../../domain/troubleshooting/types";

interface DiagnosticViewProps {
  step: DiagnosticStep;
  onOptionSelect: (option: DiagnosticOption) => void;
}

export default function DiagnosticView({ step, onOptionSelect }: DiagnosticViewProps) {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          padding: "16px",
          backgroundColor: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "8px",
          color: "#166534",
        }}
      >
        <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>
          {step.process} (Step {step.stepNo})
        </div>
        <div style={{ fontSize: "14px", lineHeight: "1.5" }}>{step.script}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ fontSize: "13px", fontWeight: 600, color: "#475569" }}>
          SELECT RESPONSE:
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {step.options.map((option, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onOptionSelect(option)}
              style={{
                flex: 1,
                padding: "12px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f172a",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#f97316";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff7ed";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff";
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
