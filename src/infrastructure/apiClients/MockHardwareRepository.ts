import { STBDetail, STBSwapRequest, DVRActivation, CompatibilityResult, HardwareVoucherResult } from "../../domain/hardware/HardwareTypes";
import { mockSTBInventory, mockPairingIndex, mockSwapRequests, mockDVRActivations, mockAdapterBrands } from "../mockData/hardwareMock";

export class MockHardwareRepository {
  async getSTBDetail(stbNumber: string): Promise<STBDetail | null> {
    return mockSTBInventory.find(s => s.stbNumber === stbNumber) || null;
  }

  async checkPairing(vcNumber: string, stbNumber: string): Promise<boolean> {
    return mockPairingIndex[vcNumber] === stbNumber;
  }

  async getSwapHistory(vcNumber: string): Promise<STBSwapRequest[]> {
    return mockSwapRequests.filter(r => r.vcNumber === vcNumber);
  }

  async createSwapRequest(request: STBSwapRequest): Promise<string> {
    const newId = `SWP${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest = { ...request, id: newId, createdOn: new Date(), status: "COMPLETED" as const };
    
    // Update Pairing Index if swap successful
    mockPairingIndex[request.vcNumber] = request.newSTBNo;
    mockSwapRequests.push(newRequest);
    
    console.log(`[MockHardwareRepository] STB Swap successful: ${newId} (Old: ${request.oldSTBNo} -> New: ${request.newSTBNo})`);
    return newId;
  }

  async getDVRStatus(vcNumber: string): Promise<DVRActivation | null> {
    return mockDVRActivations.find(d => d.vcNumber === vcNumber) || null;
  }

  async activateDVR(activation: DVRActivation): Promise<void> {
    mockDVRActivations.push({ ...activation, status: "ACTIVE", processedOn: new Date() });
    console.log(`[MockHardwareRepository] DVR activated for STB: ${activation.stbNumber}`);
  }

  async getCompatibility(oldModel: string, newModel: string): Promise<CompatibilityResult> {
    // Basic logic for mock: DishNxt models are compatible with each other
    const isCompatible = oldModel.includes("DishNxt") === newModel.includes("DishNxt");
    return {
      isRemoteCompatible: isCompatible,
      isAdapterCompatible: isCompatible,
      message: isCompatible ? "Hardware is compatible." : "Remote and Adapter replacement required for new model."
    };
  }

  async getAdapterBrands() {
    return mockAdapterBrands;
  }

  async validateVoucher(stbNumber: string): Promise<HardwareVoucherResult> {
    return {
      isVoucherRequired: false,
      isOldStb: stbNumber.startsWith("1946"), // Simulated legacy logic
      newSTBSchemeID: "SCH_STB_NEW_99"
    };
  }
}
