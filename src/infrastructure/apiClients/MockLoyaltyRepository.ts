import { VIPStatus, LoyaltyWallet, LoyaltyTransaction, VIPBenefit } from "../../domain/loyalty/LoyaltyTypes";
import { mockVIPStatus, mockLoyaltyWallets, mockLoyaltyTransactions, mockVIPBenefits } from "../mockData/loyaltyMock";

export class MockLoyaltyRepository {
  async getVIPStatus(vcNumber: string): Promise<VIPStatus | null> {
    return mockVIPStatus[vcNumber] || null;
  }

  async enrollVIP(vcNumber: string): Promise<Date> {
    const status = mockVIPStatus[vcNumber];
    if (status) {
      status.isVIP = true;
      status.enrolledOn = new Date();
    }
    console.log(`[MockLoyaltyRepository] Subscriber ${vcNumber} enrolled in DishVIP.`);
    return new Date();
  }

  async getLoyaltyBalance(vcNumber: string): Promise<LoyaltyWallet | null> {
    return mockLoyaltyWallets[vcNumber] || null;
  }

  async getLoyaltyHistory(vcNumber: string): Promise<LoyaltyTransaction[]> {
    return mockLoyaltyTransactions[vcNumber] || [];
  }

  async getVIPBenefits(): Promise<VIPBenefit[]> {
    return mockVIPBenefits;
  }
}
