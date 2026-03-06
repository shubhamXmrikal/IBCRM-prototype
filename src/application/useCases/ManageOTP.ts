import { MockCommunicationRepository } from "../../infrastructure/apiClients/MockCommunicationRepository";
import { OTPRequest } from "../../domain/communication/CommunicationTypes";

export class ManageOTPUseCase {
  private repository: MockCommunicationRepository;

  constructor() {
    this.repository = new MockCommunicationRepository();
  }

  /**
   * Generates a new OTP and triggers the SMS.
   * Emulates usp_SERVICE_GenerateOTPForGdCalls.
   */
  async generate(vcNumber: string, mobileNo: string, source: string): Promise<string> {
    const request = await this.repository.createOTP({ vcNumber, mobileNo, source, agentId: "AGENT_001" });
    return request.otpCode;
  }

  /**
   * Validates a provided OTP code.
   * Emulates usp_ValidateOTPForAutoActivation.
   */
  async validate(vcNumber: string, code: string): Promise<boolean> {
    return this.repository.validateOTP(vcNumber, code);
  }
}
