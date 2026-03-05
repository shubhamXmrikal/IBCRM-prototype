import {
  VerificationProfile,
  TempDeactivationRequest,
  ServiceConsentLog,
} from "../../domain/verification/VerificationTypes";

export const mockVerificationProfiles: Record<string, VerificationProfile> = {
  // Jaffer Resht - Normal, verified in the past
  "02563029393": {
    vcNumber: "02563029393",
    failedAttempts: 0,
    kycStatus: "VERIFIED",
    lastVerifiedOn: new Date("2024-01-15T10:30:00Z"),
    verifiableData: {
      pinCode: "182205",
      lastRechargeAmount: 442,
      activationDate: new Date("2019-10-06"),
      motherName: "Fatima",
    },
  },
  // Rahul Sharma - Failed once, next failure triggers WOB
  "09100000001": {
    vcNumber: "09100000001",
    failedAttempts: 1,
    kycStatus: "PENDING",
    verifiableData: {
      pinCode: "110017",
      lastRechargeAmount: 350,
      activationDate: new Date("2021-03-25"),
      motherName: "Sita",
    },
  },
  // Priya Menon - Already WOB locked
  "07800009999": {
    vcNumber: "07800009999",
    failedAttempts: 2,
    kycStatus: "WOB",
    lastVerifiedOn: new Date("2023-11-20T14:15:00Z"),
    verifiableData: {
      pinCode: "682035",
      lastRechargeAmount: 1500,
      activationDate: new Date("2020-06-01"),
      motherName: "Lakshmi",
    },
  },
};

export const mockTempDeactivations: TempDeactivationRequest[] = [];
export const mockConsentLogs: ServiceConsentLog[] = [];
