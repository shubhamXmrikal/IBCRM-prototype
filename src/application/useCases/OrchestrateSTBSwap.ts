import { MockHardwareRepository } from "../../infrastructure/apiClients/MockHardwareRepository";
import { STBSwapRequest } from "../../domain/hardware/HardwareTypes";

export class OrchestrateSTBSwapUseCase {
  private repository: MockHardwareRepository;

  constructor() {
    this.repository = new MockHardwareRepository();
  }

  /**
   * Executes the full STB Swap sequence.
   * Emulates usp_Utilities_SWAPSTB_InsertIntoUpdateMasterNItems + cascade steps.
   */
  async execute(request: STBSwapRequest): Promise<string> {
    // 1. Validate Replacement STB Existence
    const newStb = await this.repository.getSTBDetail(request.newSTBNo);
    if (!newStb) {
      throw new Error("Invalid Replacement STB: Serial number not found in master inventory.");
    }

    // 2. Perform Compatibility Check
    const oldStb = await this.repository.getSTBDetail(request.oldSTBNo);
    if (oldStb) {
      const compatibility = await this.repository.getCompatibility(oldStb.boxCategory, newStb.boxCategory);
      console.log(`[OrchestrateSTBSwap] Compatibility: ${compatibility.message}`);
    }

    // 3. Execute Core Swap
    return this.repository.createSwapRequest(request);
  }
}
