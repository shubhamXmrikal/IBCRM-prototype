import { MockRechargeRepository } from "../../infrastructure/apiClients/MockRechargeRepository";
import { RechargeValidation } from "../../domain/recharge/RechargeTypes";

export class ValidateRechargeEligibilityUseCase {
  private repository: MockRechargeRepository;

  constructor() {
    this.repository = new MockRechargeRepository();
  }

  /**
   * Validates VC/STB and returns eligibility flags for recharge.
   * Emulates CheckVCSTBDetail.
   */
  async execute(vcNumber: string): Promise<RechargeValidation | null> {
    return this.repository.validateRecharge(vcNumber);
  }
}
