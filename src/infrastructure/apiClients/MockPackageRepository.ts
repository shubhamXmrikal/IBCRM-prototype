import { PackageItem, SubscriberSubscription, RollbackHistory } from "../../domain/package/PackageTypes";
import { mockPackages, mockSubscriptions, mockRollbackHistory } from "../mockData/packageMock";

export class MockPackageRepository {
  private delay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getCatalogue(): Promise<PackageItem[]> {
    await this.delay();
    return mockPackages;
  }

  async getActiveSubscriptions(vcNumber: string): Promise<SubscriberSubscription[]> {
    await this.delay(150);
    return mockSubscriptions.filter(s => s.vcNumber === vcNumber);
  }

  async getRollbackHistory(vcNumber: string): Promise<RollbackHistory | null> {
    await this.delay(100);
    return mockRollbackHistory.find(r => r.vcNumber === vcNumber && r.canRollback) || null;
  }

  async markRollbackUsed(rollbackId: string): Promise<void> {
    await this.delay(100);
    const rb = mockRollbackHistory.find(r => r.id === rollbackId);
    if (rb) rb.canRollback = false;
  }

  async addSubscription(sub: SubscriberSubscription): Promise<void> {
    await this.delay(150);
    mockSubscriptions.push(sub);
  }

  async updateSubscriptionStatus(subId: string, status: "ACTIVE" | "PENDING_ACTIVATION" | "PENDING_DEACTIVATION" | "INACTIVE", optOutDate?: Date): Promise<void> {
    await this.delay(150);
    const sub = mockSubscriptions.find(s => s.id === subId);
    if (sub) {
      sub.status = status;
      if (optOutDate) sub.scheduledOptOutDate = optOutDate;
    }
  }

  async removeSubscription(subId: string): Promise<void> {
    await this.delay(150);
    const idx = mockSubscriptions.findIndex(s => s.id === subId);
    if (idx !== -1) mockSubscriptions.splice(idx, 1);
  }
}