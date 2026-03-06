import { MockWatchoRepository } from "../../infrastructure/apiClients/MockWatchoRepository";

export class ManageWatchoAutoRenewalUseCase {
  private repository: MockWatchoRepository;

  constructor() {
    this.repository = new MockWatchoRepository();
  }

  /**
   * Toggles the auto-renewal (SI) flag.
   * Emulates UpdateWatchoAutoRenewalFlag.
   */
  async execute(vcNumber: string, enabled: boolean): Promise<void> {
    return this.repository.updateAutoRenewal(vcNumber, enabled);
  }
}
