import { MockComplaintRepository } from "../../infrastructure/apiClients/MockComplaintRepository";
import { Complaint, ServiceRequest } from "../../domain/complaint/ComplaintTypes";

export class GetComplaintHistoryUseCase {
  private repository: MockComplaintRepository;

  constructor() {
    this.repository = new MockComplaintRepository();
  }

  /**
   * Retrieves full complaint and service history for a subscriber.
   * Emulates GetInboundCRMCalls and GetInboundServiceCalls.
   */
  async execute(vcNumber: string): Promise<(Complaint | ServiceRequest)[]> {
    return this.repository.getByVcNumber(vcNumber);
  }
}
