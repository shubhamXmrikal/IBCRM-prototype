import { MockHardwareRepository } from "../../infrastructure/apiClients/MockHardwareRepository";

export class ValidateHardwarePairingUseCase {
  private repository: MockHardwareRepository;

  constructor() {
    this.repository = new MockHardwareRepository();
  }

  /**
   * Verifies if a VC and STB are cryptographically paired.
   * Emulates usp_CustomerService_CheckVCNoAndSTBNoParing.
   */
  async execute(vcNumber: string, stbNumber: string): Promise<boolean> {
    return this.repository.checkPairing(vcNumber, stbNumber);
  }
}
