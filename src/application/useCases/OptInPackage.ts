import { MockPackageRepository } from "../../infrastructure/apiClients/MockPackageRepository";

export class OptInPackageUseCase {
  private repository: MockPackageRepository;

  constructor() {
    this.repository = new MockPackageRepository();
  }

  async execute(vcNumber: string, packageId: string, requiresConsent: boolean, consentGiven: boolean, scheduledDate?: Date): Promise<void> {
    if (requiresConsent && !consentGiven) {
      throw new Error("Verbal consent is required to activate this package.");
    }

    const isFuture = scheduledDate && scheduledDate.getTime() > Date.now();

    if (isFuture) {
      await this.repository.addSubscription({
        id: `SUB-${Date.now()}`,
        vcNumber,
        packageId,
        status: "PENDING_ACTIVATION",
        activationDate: scheduledDate,
        isFixedPayterm: false,
      });
    } else {
      await this.repository.addSubscription({
        id: `SUB-${Date.now()}`,
        vcNumber,
        packageId,
        status: "ACTIVE",
        activationDate: new Date(),
        isFixedPayterm: false,
      });
    }
  }
}
