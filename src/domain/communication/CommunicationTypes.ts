export type CommChannel = "SMS" | "WHATSAPP" | "PUSH" | "EMAIL";
export type CommStatus = "SENT" | "DELIVERED" | "FAILED" | "PENDING";

export interface CommunicationLog {
  id: string;
  vcNumber: string;
  channel: CommChannel;
  recipient: string;
  message: string;
  status: CommStatus;
  sentOn: Date;
  agentId: string;
  agentIp: string;
  processName: string;
}

export interface OTPRequest {
  id: string;
  vcNumber: string;
  mobileNo: string;
  otpCode: string;
  expiresAt: Date;
  isValidated: boolean;
  source: string;
}

export interface SMSVendor {
  id: string;
  name: string;
  isPrimary: boolean;
  gatewayUrl: string;
}

/**
 * IP Capture Utility
 * Replicates legacy logic for detecting proxy IPs vs real client IPs.
 * Legacy: REMOTE_ADDR vs HTTP_X_FORWARDED_FOR
 */
export const captureAgentIP = (req: Request): string => {
  const forwarded = req.headers.get("x-forwarded-for");
  const remoteAddr = req.headers.get("x-real-ip") || "127.0.0.1";

  // Simulate internal network detection (10.10.17.* or 10.10.22.*)
  if (remoteAddr.startsWith("10.10.17.") || remoteAddr.startsWith("10.10.22.")) {
    return forwarded ? forwarded.split(",")[0] : remoteAddr;
  }

  return remoteAddr;
};
