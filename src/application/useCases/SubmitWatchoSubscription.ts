import { MockWatchoRepository } from "../../infrastructure/apiClients/MockWatchoRepository";

export class SubmitWatchoSubscriptionUseCase {
  private repository: MockWatchoRepository;

  constructor() {
    this.repository = new MockWatchoRepository();
  }

  /**
   * Submits a plan activation request.
   * Emulates SubmitWatchoSubscriptionPlanRequest.
   */
  async execute(vcNumber: string, planId: string, couponCode?: string): Promise<string> {
    return this.repository.submitSubscription(vcNumber, planId, couponCode);
  }
}
