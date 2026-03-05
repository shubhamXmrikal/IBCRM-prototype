import {
  VerificationProfile,
  TempDeactivationRequest,
  ServiceConsentLog,
  KYCStatus,
} from "../../domain/verification/VerificationTypes";
import {
  mockVerificationProfiles,
  mockTempDeactivations,
  mockConsentLogs,
} from "../mockData/verificationMock";
import { mockEmailIndex, mockMobileIndex } from "../mockData/customerMock";

export class MockVerificationRepository {
  private delay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ── Verification / KYC ──

  async getVerificationProfile(
    vcNumber: string,
  ): Promise<VerificationProfile | null> {
    await this.delay();
    return mockVerificationProfiles[vcNumber] || null;
  }

  async updateVerificationStatus(
    vcNumber: string,
    status: KYCStatus,
    failedAttempts: number,
  ): Promise<void> {
    await this.delay(100);
    const profile = mockVerificationProfiles[vcNumber];
    if (profile) {
      profile.kycStatus = status;
      profile.failedAttempts = failedAttempts;
      if (status === "VERIFIED") {
        profile.lastVerifiedOn = new Date();
      }
    }
  }

  // ── Temp Deactivation ──

  async addTempDeactivation(request: TempDeactivationRequest): Promise<void> {
    await this.delay(200);
    mockTempDeactivations.push(request);
  }

  // ── Service Consent Logging ──

  async logServiceRemovalConsent(log: ServiceConsentLog): Promise<void> {
    await this.delay(100);
    mockConsentLogs.push(log);
  }

  // ── Contact Updates & Validation ──

  async isEmailUnique(
    email: string,
    currentVcNumber: string,
  ): Promise<boolean> {
    await this.delay(150);
    const linkedVCs = mockEmailIndex[email] || [];
    // Uniqueness: the email should either not exist, or only be linked to the current VC
    return (
      linkedVCs.length === 0 ||
      (linkedVCs.length === 1 && linkedVCs[0] === currentVcNumber)
    );
  }

  async isMobileUnique(
    mobile: string,
    currentVcNumber: string,
  ): Promise<boolean> {
    await this.delay(150);
    const linkedVCs = mockMobileIndex[mobile] || [];
    return (
      linkedVCs.length === 0 ||
      (linkedVCs.length === 1 && linkedVCs[0] === currentVcNumber)
    );
  }
}
