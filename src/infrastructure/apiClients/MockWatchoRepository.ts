import { OTTPlan, WatchoSubscriber, WatchoCoupon, WatchoEligibility } from "../../domain/watcho/WatchoTypes";
import { mockOTTPlans, mockWatchoSubscribers, mockWatchoCoupons } from "../mockData/watchoMock";

export class MockWatchoRepository {
  async getPlans(): Promise<OTTPlan[]> {
    return mockOTTPlans;
  }

  async getSubscriber(vcNumber: string): Promise<WatchoSubscriber | null> {
    return mockWatchoSubscribers[vcNumber] || null;
  }

  async updateAutoRenewal(vcNumber: string, enabled: boolean): Promise<void> {
    if (mockWatchoSubscribers[vcNumber]) {
      mockWatchoSubscribers[vcNumber].isAutoRenewalEnabled = enabled;
      console.log(`[MockWatchoRepository] Auto-renewal for ${vcNumber} set to: ${enabled}`);
    }
  }

  async getCoupons(): Promise<WatchoCoupon[]> {
    return mockWatchoCoupons;
  }

  async submitSubscription(vcNumber: string, planId: string, couponCode?: string): Promise<string> {
    const sub = mockWatchoSubscribers[vcNumber];
    if (sub) {
      sub.status = "ACTIVE";
      sub.currentPlanId = planId;
      sub.expiryDate = new Date();
      sub.expiryDate.setMonth(sub.expiryDate.getMonth() + 1);
    }
    console.log(`[MockWatchoRepository] Watcho Subscription submitted for ${vcNumber}, Plan: ${planId}, Coupon: ${couponCode || "NONE"}`);
    return "W_UP_992211";
  }

  async checkEligibility(smsId: string): Promise<WatchoEligibility> {
    // Simulated rule: If SMSID is empty or some mock condition
    return { isEligible: true };
  }
}
