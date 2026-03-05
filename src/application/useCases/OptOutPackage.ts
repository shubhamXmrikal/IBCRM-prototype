import { MockPackageRepository } from "../../infrastructure/apiClients/MockPackageRepository";

export class OptOutPackageUseCase {
  private repository: MockPackageRepository;

  constructor() {
    this.repository = new MockPackageRepository();
  }

  async execute(subId: string): Promise<void> {
    await this.repository.updateSubscriptionStatus(subId, "PENDING_DEACTIVATION", new Date());
  }
}
