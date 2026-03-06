import { MockCampaignRepository } from "../../infrastructure/apiClients/MockCampaignRepository";
import { FMRInfo } from "../../domain/package/CampaignTypes";

export class CalculateFMRBenefitsUseCase {
  private repository: MockCampaignRepository;

  constructor() {
    this.repository = new MockCampaignRepository();
  }

  /**
   * Calculates potential recharge benefits for proposed upgrades.
   * Emulates USP_GetSubscriberFMRValue.
   */
  async execute(smsId: string, schemeId: string): Promise<FMRInfo | null> {
    return this.repository.getFMRInfo(smsId, schemeId);
  }
}
