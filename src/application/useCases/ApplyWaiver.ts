import { MockFinancialRepository } from "../../infrastructure/apiClients/MockFinancialRepository";
import { WaiverRequest } from "../../domain/package/FinancialTypes";

export class ApplyWaiverUseCase {
  private repository: MockFinancialRepository;

  constructor() {
    this.repository = new MockFinancialRepository();
  }

  /**
   * Submits a new waiver request.
   * Emulates InsertWaiverAmountDetails.
   */
  async execute(request: WaiverRequest): Promise<string> {
    // Business Rule: Check if agent has already exceeded quota for this subscriber
    const existing = await this.repository.getWaiverRequests(request.vcNumber);
    if (existing.length >= 2) {
      throw new Error("Exhausted Count: Maximum 2 waivers allowed for this subscriber in the current period.");
    }

    return this.repository.createWaiverRequest(request);
  }
}
