import { MockCampaignRepository } from "../../infrastructure/apiClients/MockCampaignRepository";
import { CampaignStatus } from "../../domain/package/CampaignTypes";

export class GetCampaignEngagementUseCase {
  private repository: MockCampaignRepository;

  constructor() {
    this.repository = new MockCampaignRepository();
  }

  /**
   * Retrieves subscriber-specific campaign engagement (e.g., World Cup 2026).
   * Emulates USP_CustomerService_CWC2019_Details.
   */
  async execute(smsId: string): Promise<CampaignStatus[]> {
    return this.repository.getCampaignStatus(smsId);
  }
}
