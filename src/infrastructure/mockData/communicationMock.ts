import { CommunicationLog, OTPRequest, SMSVendor } from "../../domain/communication/CommunicationTypes";

export const mockSMSVendors: SMSVendor[] = [
  { id: "V1", name: "InstaAlerts", isPrimary: true, gatewayUrl: "http://japi.instaalerts.zone/httpapi" },
  { id: "V2", name: "ValueFirst", isPrimary: false, gatewayUrl: "http://vfirst.com/api" }
];

export const mockCommunicationLogs: CommunicationLog[] = [
  {
    id: "LOG_001",
    vcNumber: "09100000001", // Rahul Sharma
    channel: "SMS",
    recipient: "9999900001",
    message: "Your recharge of INR 350 was successful. Ref: PG_TXN_99881",
    status: "DELIVERED",
    sentOn: new Date("2026-03-25T10:05:00"),
    agentId: "SYSTEM",
    agentIp: "172.16.0.45",
    processName: "RECHARGE"
  },
  {
    id: "LOG_002",
    vcNumber: "09100000001",
    channel: "WHATSAPP",
    recipient: "9999900001",
    message: "Hi Rahul, your Star Sports 1 HD add-on has been activated. Enjoy the match!",
    status: "SENT",
    sentOn: new Date("2026-03-26T18:30:00"),
    agentId: "AGENT_001",
    agentIp: "10.10.17.12",
    processName: "PACKAGE_TOOL"
  }
];

export const mockOTPStore: OTPRequest[] = [];
