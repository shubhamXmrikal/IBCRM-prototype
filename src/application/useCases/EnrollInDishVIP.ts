import { MockLoyaltyRepository } from "../../infrastructure/apiClients/MockLoyaltyRepository";

export class EnrollInDishVIPUseCase {
  private repository: MockLoyaltyRepository;

  constructor() {
    this.repository = new MockLoyaltyRepository();
  }

  /**
   * Enrolls a subscriber into the DishVIP premium tier.
   * Emulates usp_CustomerService_InsertDishVIPEnrollment.
   */
  async execute(vcNumber: string): Promise<{ enrolledOn: Date }> {
    const status = await this.repository.getVIPStatus(vcNumber);
    
    if (status?.isVIP) {
      throw new Error("Subscriber is already enrolled in DishVIP.");
    }

    if (!status?.isEligible) {
      throw new Error(`Subscriber is not eligible for DishVIP: ${status?.eligibilityReason}`);
    }

    const enrolledOn = await this.repository.enrollVIP(vcNumber);
    return { enrolledOn };
  }
}
