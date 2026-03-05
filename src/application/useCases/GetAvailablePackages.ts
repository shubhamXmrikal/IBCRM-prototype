import { MockPackageRepository } from "../../infrastructure/apiClients/MockPackageRepository";
import { PackageItem, SubscriberSubscription } from "../../domain/package/PackageTypes";

export class GetAvailablePackagesUseCase {
  private repository: MockPackageRepository;

  constructor() {
    this.repository = new MockPackageRepository();
  }

  async execute(vcNumber: string): Promise<{ catalogue: PackageItem[]; active: SubscriberSubscription[] }> {
    const catalogue = await this.repository.getCatalogue();
    const active = await this.repository.getActiveSubscriptions(vcNumber);

    // Business Rule: Filter out packages that are already active for the user
    const activePackageIds = active.map((sub) => sub.packageId);
    const availableCatalogue = catalogue.filter((pkg) => !activePackageIds.includes(pkg.id));

    return {
      catalogue: availableCatalogue,
      active,
    };
  }
}
