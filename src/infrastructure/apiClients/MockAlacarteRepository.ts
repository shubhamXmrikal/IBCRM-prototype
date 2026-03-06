import { KittyAlacarte, SummerTicket, PromoAlacarte, FestiveOffer, AlacarteOptOutInfo } from "../../domain/package/AlacarteTypes";
import { mockKittyAlacarte, mockSummerTicket, mockPromoAlacarte, mockFestiveOffers, mockAlacarteOptOut } from "../mockData/alacarteMock";

export class MockAlacarteRepository {
  async getKittyDetails(smsId: string): Promise<{ balance: number; options: KittyAlacarte[] }> {
    return mockKittyAlacarte[smsId] || { balance: 0, options: [] };
  }

  async redeemKitty(smsId: string, packageIds: string[]): Promise<string> {
    console.log(`[MockAlacarteRepository] Redeeming kitty for SMSID: ${smsId}, Packages: ${packageIds.join(", ")}`);
    return "SUCCESS_FORM_KITTY_123";
  }

  async getSummerTickets(smsId: string): Promise<SummerTicket[]> {
    return mockSummerTicket[smsId] || [];
  }

  async processSummerTicket(smsId: string, packageId: string, status: string): Promise<void> {
    console.log(`[MockAlacarteRepository] Summer ticket ${packageId} processed for SMSID: ${smsId} with status: ${status}`);
  }

  async getPromotionalOffers(smsId: string): Promise<PromoAlacarte[]> {
    return mockPromoAlacarte[smsId] || [];
  }

  async getFestiveOffers(): Promise<FestiveOffer[]> {
    return mockFestiveOffers;
  }

  async getAlacarteOptOutInfo(smsId: string): Promise<AlacarteOptOutInfo[]> {
    return mockAlacarteOptOut[smsId] || [];
  }
}
