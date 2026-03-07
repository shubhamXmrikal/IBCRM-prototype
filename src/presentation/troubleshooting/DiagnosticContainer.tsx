"use client";

import React from "react";
import { TroubleshootingCategory, DiagnosticStep, DiagnosticOption } from "../../domain/troubleshooting/types";
import { MOCK_DIAGNOSTIC_STEPS } from "../../infrastructure/troubleshooting/diagnosticSteps";
import DiagnosticView from "./DiagnosticView";

interface DiagnosticContainerProps {
  category: TroubleshootingCategory;
  onComplete: (caseHistory: string) => void;
}

export default function DiagnosticContainer({ category, onComplete }: DiagnosticContainerProps) {
  const [currentStepId, setCurrentStepId] = React.useState<string | null>(`${category.id}_1`);
  const [caseHistory, setCaseHistory] = React.useState<string[]>([]);

  const currentStep = currentStepId ? MOCK_DIAGNOSTIC_STEPS[currentStepId] : null;

  const handleOptionSelect = (option: DiagnosticOption) => {
    const newHistory = [...caseHistory, option.caseHistorySnippet];
    setCaseHistory(newHistory);

    if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
    } else if (option.action) {
      onComplete(newHistory.join(" -> "));
    }
  };

  if (!currentStep) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "18px", color: "#64748b", fontWeight: 600 }}>
          Diagnostic view for {category.name} is under construction.
        </div>
        <p style={{ color: "#94a3b8", marginTop: "8px" }}>
          In the prototype, try selecting "101. CHANNEL NOT SUBSCRIBED" to see a full flow.
        </p>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
          DIAGNOSING: {category.name}
        </div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>
          Step {currentStep.stepNo} of 3
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <DiagnosticView step={currentStep} onOptionSelect={handleOptionSelect} />
      </div>

      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "#f8fafc",
          fontSize: "12px",
          color: "#64748b",
        }}
      >
        <strong>Accumulated Case History:</strong>{" "}
        {caseHistory.length > 0 ? caseHistory.join(" -> ") : "No steps taken yet."}
      </div>
    </div>
  );
}
