import { DiagnosticStep } from "../../domain/troubleshooting";

export const MOCK_DIAGNOSTIC_STEPS: Record<string, DiagnosticStep> = {
  "1161_1": {
    id: "1161_1",
    categoryId: "1161",
    stepNo: "1",
    process: "VC STATUS CHECK",
    script: "Subscriber is calling for 101. CHANNEL NOT SUBSCRIBED. Please check the account status. Is the account Active?",
    options: [
      { label: "YES, ACTIVE", nextStepId: "1161_2", caseHistorySnippet: "VC Status: Active" },
      { label: "NO, DEACTIVE", action: "COMPLETE", caseHistorySnippet: "VC Status: Deactive. Informed customer to recharge." },
    ],
  },
  "1161_2": {
    id: "1161_2",
    categoryId: "1161",
    stepNo: "2",
    process: "FRONT OF TV CHECK",
    script: "Is the customer in front of the TV?",
    options: [
      { label: "YES", nextStepId: "1161_3", caseHistorySnippet: "Customer in front of TV" },
      { label: "NO", action: "COMPLETE", caseHistorySnippet: "Customer not in front of TV. Callback arranged." },
    ],
  },
  "1161_3": {
    id: "1161_3",
    categoryId: "1161",
    stepNo: "3",
    process: "ERROR MESSAGE PROBE",
    script: "What error message is displaying on the screen?",
    options: [
      { label: "101. NOT SUBSCRIBED", action: "REPAIR", caseHistorySnippet: "Error 101. Triggered automated refresh." },
      { label: "OTHER ERROR", action: "TECHNICIAN_VISIT", caseHistorySnippet: "Other error message. Technician visit required." },
    ],
  },
};
