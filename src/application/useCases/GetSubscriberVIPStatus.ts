import { MockLoyaltyRepository } from "../../infrastructure/apiClients/MockLoyaltyRepository";
import { VIPStatus, VIPBenefit } from "../../domain/loyalty/LoyaltyTypes";

export class GetSubscriberVIPStatusUseCase {
  private repository: MockLoyaltyRepository;

  constructor() {
    this.repository = new MockLoyaltyRepository();
  }

  /**
   * Checks if subscriber is already VIP or eligible.
   * Emulates usp_customerservice_GetISVIPSubscriber and usp_CustomerService_isEligibleDishVIP.
   */
  async execute(vcNumber: string): Promise<{ status: VIPStatus | null; benefits: VIPBenefit[] }> {
    const status = await this.repository.getVIPStatus(vcNumber);
    const benefits = await this.repository.getVIPBenefits();
    return { status, benefits };
  }
}
