import { MockCampaignRepository } from "../../infrastructure/apiClients/MockCampaignRepository";
import { FestiveOffer, FestiveEligibilityResult } from "../../domain/package/CampaignTypes";

export class GetFestiveOffersUseCase {
  private repository: MockCampaignRepository;

  constructor() {
    this.repository = new MockCampaignRepository();
  }

  /**
   * Retrieves available festive offers and checks eligibility.
   * Emulates USP_GetFestiveOfferAccordingToSMSID and GetEligibilityForFestivalOffer.
   */
  async execute(smsId: string, vcNumber: string, zoneId: string, stbType: string): Promise<{ offers: FestiveOffer[], eligibility: FestiveEligibilityResult }> {
    const offers = await this.repository.getFestiveOffers(smsId, zoneId, stbType);
    const eligibility = await this.repository.checkFestiveEligibility(vcNumber);
    
    return { offers, eligibility };
  }
}
