import { FestiveOffer, FMRInfo, CampaignStatus, CashbackDetail, FestiveEligibilityResult } from "../../domain/package/CampaignTypes";
import { mockFestiveOffers, mockFMRBenefits, mockCampaignStatuses, mockCashbackDetails } from "../mockData/campaignMock";

export class MockCampaignRepository {
  async getFMRInfo(smsId: string, schemeId: string): Promise<FMRInfo | null> {
    return mockFMRBenefits[smsId] || null;
  }

  async getFestiveOffers(smsId: string, zoneId: string, stbType: string): Promise<FestiveOffer[]> {
    // Simulate complex SP filtering (USP_GetFestiveOfferAccordingToSMSID)
    return mockFestiveOffers.filter(o => 
      (o.zoneId === "ALL" || o.zoneId === zoneId) && 
      (o.stbType === stbType)
    );
  }

  async checkFestiveEligibility(vcNumber: string): Promise<FestiveEligibilityResult> {
    // Emulates dual-resultset from usp_CustomerService_GetEligibilityForFestivalOffer
    const cashback = mockCashbackDetails[vcNumber];
    return {
      isEligible: !!cashback && cashback.isEligible,
      vasType: "FESTIVE_BONUS",
      cashback: cashback
    };
  }

  async getCampaignStatus(smsId: string): Promise<CampaignStatus[]> {
    return mockCampaignStatuses[smsId] || [];
  }
}
