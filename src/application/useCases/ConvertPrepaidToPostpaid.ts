import { MockRechargeRepository } from "../../infrastructure/apiClients/MockRechargeRepository";
import { PostpaidLead } from "../../domain/recharge/RechargeTypes";

export class ConvertPrepaidToPostpaidUseCase {
  private repository: MockRechargeRepository;

  constructor() {
    this.repository = new MockRechargeRepository();
  }

  /**
   * Creates a lead for conversion to postpaid.
   * Emulates InsertLeadforProspectivePrepaidCustomer.
   */
  async execute(lead: PostpaidLead): Promise<string> {
    // In a real system, we'd validate eligibility here
    return this.repository.createPostpaidLead(lead);
  }
}
