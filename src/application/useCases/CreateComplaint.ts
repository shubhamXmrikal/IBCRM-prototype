import { MockComplaintRepository } from "../../infrastructure/apiClients/MockComplaintRepository";
import {
  Complaint,
  ServiceRequest,
} from "../../domain/complaint/ComplaintTypes";

export class CreateComplaintUseCase {
  private repository: MockComplaintRepository;

  constructor() {
    this.repository = new MockComplaintRepository();
  }

  /**
   * Creates a new complaint or service request.
   * Emulates InsertServiceComplaint and InsertServiceComplaintDetails.
   */
  async execute(complaint: Complaint | ServiceRequest): Promise<string> {
    const validation = await this.repository.validateEligibility(
      complaint.vcNumber,
    );

    if (!validation.isEligible) {
      throw new Error(validation.message);
    }

    return this.repository.create(complaint);
  }
}
