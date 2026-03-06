import { MockHardwareRepository } from "../../infrastructure/apiClients/MockHardwareRepository";
import { DVRActivation } from "../../domain/hardware/HardwareTypes";

export class ManageDVRActivationUseCase {
  private repository: MockHardwareRepository;

  constructor() {
    this.repository = new MockHardwareRepository();
  }

  /**
   * Activates DVR recording features.
   * Emulates dual-write to CONAX and ZTConn.
   */
  async execute(activation: DVRActivation): Promise<void> {
    const stb = await this.repository.getSTBDetail(activation.stbNumber);
    
    if (!stb || !stb.isDVRReady) {
      throw new Error("Hardware Constraint: This STB model does not support DVR recording features.");
    }

    return this.repository.activateDVR(activation);
  }
}
