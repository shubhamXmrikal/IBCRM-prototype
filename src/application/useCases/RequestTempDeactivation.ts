import { MockVerificationRepository } from "../../infrastructure/apiClients/MockVerificationRepository";
import { TempDeactivationRequest } from "../../domain/verification/VerificationTypes";

export class RequestTempDeactivationUseCase {
  private repository: MockVerificationRepository;

  constructor() {
    this.repository = new MockVerificationRepository();
  }

  /**
   * Evaluates temporary deactivation schedules.
   * Mirrors `InsertTempDeactivationRequest` & `RamadanOpt_Out_In_Request`.
   * @param vcNumber The VC to suspend
   * @param startDate Beginning of suspension
   * @param endDate End of suspension
   * @param reason The reason code/string
   * @param isRamadanRequest Whether this is a special Ramadan opt-in
   */
  async execute(
    vcNumber: string,
    startDate: Date,
    endDate: Date,
    reason: string,
    isRamadanRequest: boolean = false,
  ): Promise<TempDeactivationRequest> {
    const minDays = isRamadanRequest ? 3 : 5; // e.g. Ramadan request can be shorter
    const maxDays = 90;

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < minDays) {
      throw new Error(`Suspension must be at least ${minDays} days.`);
    }
    if (diffDays > maxDays) {
      throw new Error(`Suspension cannot exceed ${maxDays} days.`);
    }

    const request: TempDeactivationRequest = {
      id: `TD-${Date.now()}`,
      vcNumber,
      startDate,
      endDate,
      reason,
      status: "PENDING",
      isRamadanRequest,
    };

    await this.repository.addTempDeactivation(request);
    return request;
  }
}
