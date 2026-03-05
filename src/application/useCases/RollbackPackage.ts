import { MockPackageRepository } from "../../infrastructure/apiClients/MockPackageRepository";

export class RollbackPackageUseCase {
  private repository: MockPackageRepository;

  constructor() {
    this.repository = new MockPackageRepository();
  }

  async execute(vcNumber: string, rollbackId: string, remarks: string): Promise<void> {
    if (!remarks || remarks.trim().length === 0) {
      throw new Error("Agent remarks are required for rollback.");
    }

    const history = await this.repository.getRollbackHistory(vcNumber);
    if (!history || history.id !== rollbackId || !history.canRollback) {
      throw new Error("No eligible rollback found or rollback limit exceeded.");
    }

    await this.repository.markRollbackUsed(rollbackId);

    const activeSubs = await this.repository.getActiveSubscriptions(vcNumber);
    const catalogue = await this.repository.getCatalogue();
    const previousPack = catalogue.find(p => p.id === history.previousPackageId);

    if (previousPack) {
      const currentBaseSub = activeSubs.find(s => {
        const p = catalogue.find(c => c.id === s.packageId);
        return p?.category === "BASE";
      });

      if (currentBaseSub) {
        await this.repository.removeSubscription(currentBaseSub.id);
      }

      await this.repository.addSubscription({
        id: `SUB-${Date.now()}`,
        vcNumber,
        packageId: previousPack.id,
        status: "ACTIVE",
        activationDate: new Date(),
        isFixedPayterm: false,
      });
    }
  }
}
