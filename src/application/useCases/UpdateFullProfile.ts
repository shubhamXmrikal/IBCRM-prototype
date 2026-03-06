import { MockCustomerRepository } from "../../infrastructure/apiClients/MockCustomerRepository";
import { Customer } from "../../domain/customer/Customer";

export class UpdateFullProfileUseCase {
  private repository: MockCustomerRepository;

  constructor() {
    this.repository = new MockCustomerRepository();
  }

  /**
   * Updates full personal information for a subscriber.
   * Emulates `usp_CustomerService_UpdateSubPresonalInfo`.
   */
  async execute(
    smsId: string,
    updates: Partial<Customer>,
    userId: number,
  ): Promise<{ status: string; statusCode: string }> {
    const customer = await this.repository.getBySearchType("SMSID", smsId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Apply updates (in real app, this would be a DB call)
    // Here we're just simulating success
    console.log(`[UpdateFullProfileUseCase] Profile updated for SMSID: ${smsId} by User: ${userId}`);

    return { status: "SUCCESS", statusCode: "1" };
  }
}
