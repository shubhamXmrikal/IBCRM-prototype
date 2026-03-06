import { MockRechargeRepository } from "../../infrastructure/apiClients/MockRechargeRepository";
import { RechargeDueInfo } from "../../domain/recharge/RechargeTypes";

export class CalculateRechargeDueUseCase {
  private repository: MockRechargeRepository;

  constructor() {
    this.repository = new MockRechargeRepository();
  }

  /**
   * Calculates financial due and churn timers.
   * Emulates GetRechargeDueAmount.
   */
  async execute(smsId: string): Promise<RechargeDueInfo | null> {
    return this.repository.getRechargeDue(smsId);
  }
}
