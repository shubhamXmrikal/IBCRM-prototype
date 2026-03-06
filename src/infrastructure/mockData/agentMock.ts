import { MessageOfTheDay, RepeatCallerReason, AgentSession } from "../../domain/agent/AgentTypes";

export const mockMOTD: Record<string, MessageOfTheDay> = {
  "41200100": { // Rahul Sharma
    importantMessage: "Subscriber pack expires in 3 days. High churn risk.",
    proactiveInfo: "Eligible for DishNxt HD upgrade with zero upfront cost.",
    updatedOn: new Date()
  },
  "55301890": { // Priya Menon
    importantMessage: "VIP Subscriber. Ensure priority handling.",
    proactiveInfo: "Offer 3 months free MOD subscription if annual renewal discussed.",
    updatedOn: new Date()
  }
};

export const mockRepeatReasons: RepeatCallerReason[] = [
  { id: "1", name: "Signal not restored after complaint" },
  { id: "2", name: "Recharge not reflected in account" },
  { id: "3", name: "Technician did not visit at scheduled time" },
  { id: "4", name: "Request for status of previous ticket" }
];

export const currentAgentSession: AgentSession = {
  agentId: "AGENT_001",
  agentName: "Aman S.",
  lastVcNo: "02563029393", // Jaffer
  currentVcNo: undefined,
  isUsedZTConn: true,
  capturedIp: "10.10.17.42",
  centerId: "DEL_01"
};
