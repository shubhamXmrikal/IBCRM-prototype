export type KYCStatus = "PENDING" | "VERIFIED" | "FAILED" | "WOB"; // WOB = Write Off Block

export interface VerificationProfile {
  vcNumber: string;
  failedAttempts: number; // Tracks IsWOB2TimeCVFail
  kycStatus: KYCStatus;
  lastVerifiedOn?: Date;
  // Verification challenge answers
  verifiableData: {
    pinCode: string;
    lastRechargeAmount: number;
    activationDate: Date;
    motherName?: string;
  };
}

export interface TempDeactivationRequest {
  id: string;
  vcNumber: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "PENDING" | "ACTIVE" | "CANCELLED";
  isRamadanRequest: boolean; // Special business rule flag
}

export interface ServiceConsentLog {
  id: string;
  vcNumber: string;
  serviceRemoved: string;
  agentId: string;
  isConsentGiven: boolean;
  timestamp: Date;
}
