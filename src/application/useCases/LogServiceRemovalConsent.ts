import { MockVerificationRepository } from "../../infrastructure/apiClients/MockVerificationRepository";
import { ServiceConsentLog } from "../../domain/verification/VerificationTypes";

export class LogServiceRemovalConsentUseCase {
  private repository: MockVerificationRepository;

  constructor() {
    this.repository = new MockVerificationRepository();
  }

  /**
   * Logs an action where a service was removed with tracking for customer consent.
   * Mirrors `save_No_Consent_Service_log` for compliance tracking.
   * @param vcNumber The VC number involved
   * @param serviceRemoved The name of the package/addon removed
   * @param isConsentGiven True if agent confirmed consent
   */
  async execute(
    vcNumber: string,
    serviceRemoved: string,
    isConsentGiven: boolean,
    agentId: string = "AGENT_001",
  ): Promise<ServiceConsentLog> {
    const log: ServiceConsentLog = {
      id: `CONSENT-${Date.now()}`,
      vcNumber,
      serviceRemoved,
      isConsentGiven,
      agentId,
      timestamp: new Date(),
    };

    await this.repository.logServiceRemovalConsent(log);

    if (!isConsentGiven) {
      // In a real system, firing off secondary compliance alerts or emails here
      console.warn(
        `[COMPLIANCE] Service '${serviceRemoved}' removed globally for VC ${vcNumber} WITHOUT explicit consent. Audited by ${agentId}.`,
      );
    }

    return log;
  }
}
