import { MovieProduct, MODRequest, ModKitty, ModValidationResult } from "../../domain/mod/MODTypes";
import { mockMovieCatalogue, mockMODRequests, mockModKitty } from "../mockData/modMock";

export class MockModRepository {
  async getCatalogue(): Promise<MovieProduct[]> {
    return mockMovieCatalogue;
  }

  async getRequestsByVc(vcNumber: string): Promise<MODRequest[]> {
    return mockMODRequests.filter(r => r.vcNumber === vcNumber);
  }

  async getKittyDetails(smsId: string): Promise<ModKitty | null> {
    return mockModKitty[smsId] || null;
  }

  async createOrder(request: MODRequest): Promise<string> {
    const newId = `REQ_MOD_${Math.floor(1000 + Math.random() * 9000)}`;
    mockMODRequests.push({ ...request, id: newId, requestDate: new Date() });
    console.log(`[MockModRepository] MOD Order placed: ${newId} for ${request.productName}`);
    return newId;
  }

  async reAuthorize(requestId: string): Promise<boolean> {
    console.log(`[MockModRepository] Re-authorizing signal for: ${requestId} via CONAX simulated push.`);
    return true;
  }

  async validateOrder(vcNumber: string, productId: string): Promise<ModValidationResult> {
    // 1. Check for duplicate active request (usp_Endeavour_MOD_CheckCode)
    const existing = mockMODRequests.find(r => 
      r.vcNumber === vcNumber && 
      r.productId === productId && 
      r.status === "AUTHORIZED"
    );

    if (existing) {
      return { isEligible: false, reason: "CheckRequestIsAlreadySubmited: This movie is already authorized and active on your STB." };
    }

    return { isEligible: true };
  }
}
