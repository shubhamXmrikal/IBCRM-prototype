import { MockVerificationRepository } from "../../infrastructure/apiClients/MockVerificationRepository";
import { KYCStatus } from "../../domain/verification/VerificationTypes";

export class VerifyCustomerUseCase {
  private repository: MockVerificationRepository;

  constructor() {
    this.repository = new MockVerificationRepository();
  }

  /**
   * Evaluates the answers provided by the agent against the verifiable data.
   * Mirrors `CheckCustomerVerificationCiteria` and `InsertCustomerVerificationEntityDetail`.
   * @param vcNumber The VC to verify
   * @param answers The answers submitted in the UI (e.g. { pinCode: "110017", lastRechargeAmount: 350 })
   */
  async execute(
    vcNumber: string,
    answers: {
      pinCode?: string;
      lastRechargeAmount?: number;
      activationDate?: string;
      motherName?: string;
    },
  ): Promise<KYCStatus> {
    const profile = await this.repository.getVerificationProfile(vcNumber);
    if (!profile) throw new Error("Verification profile not found");

    if (profile.kycStatus === "WOB") {
      throw new Error("Account is WOB Locked. Physical verification required.");
    }

    // A simple mock exact match logic - in real scenario, it might be looser or require a 2/3 hit rate
    let isValid = true;
    if (answers.pinCode && answers.pinCode !== profile.verifiableData.pinCode)
      isValid = false;
    if (
      answers.lastRechargeAmount &&
      answers.lastRechargeAmount !== profile.verifiableData.lastRechargeAmount
    )
      isValid = false;
    if (
      answers.motherName &&
      answers.motherName.toLowerCase() !==
        profile.verifiableData.motherName?.toLowerCase()
    )
      isValid = false;
    // (Date parsing omitted for simplicity in this mock protocol)

    if (isValid) {
      await this.repository.updateVerificationStatus(vcNumber, "VERIFIED", 0);
      return "VERIFIED";
    } else {
      const newAttempts = profile.failedAttempts + 1;
      const newStatus = newAttempts >= 2 ? "WOB" : "FAILED";
      await this.repository.updateVerificationStatus(
        vcNumber,
        newStatus,
        newAttempts,
      );
      return newStatus;
    }
  }
}
