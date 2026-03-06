import { MockComplaintRepository } from "../../infrastructure/apiClients/MockComplaintRepository";
import { ComplaintValidationResult } from "../../domain/complaint/ComplaintTypes";

export class ValidateComplaintEligibilityUseCase {
  private repository: MockComplaintRepository;

  constructor() {
    this.repository = new MockComplaintRepository();
  }

  /**
   * Checks if a subscriber can log a new complaint.
   * Emulates ComplaintMorethanTwoWithinThreeDays.
   */
  async execute(vcNumber: string): Promise<ComplaintValidationResult> {
    return this.repository.validateEligibility(vcNumber);
  }
}
