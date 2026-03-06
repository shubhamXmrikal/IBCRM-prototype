import fs from "fs";
import path from "path";
import { CallCategoryNode, CallClosureRequest, OutboundCampaignEntry } from "../../domain/call/CallHandlingTypes";
import { parseCallCategoryXml } from "../../lib/callTreeParser";
import { mockOutboundCampaigns } from "../mockData/interactionMock";

export class MockCallRepository {
  private categoryCache: CallCategoryNode[] | null = null;

  private async delay(ms = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getCallCategories(): Promise<CallCategoryNode[]> {
    if (this.categoryCache) return this.categoryCache;

    try {
      // In a real implementation, this path would be in config
      // Relative from prototype-customer-service/src/infrastructure/apiClients/MockCallRepository.ts
      // to ibcrm/CategoryMaster.xml
      const xmlPath = path.resolve(process.cwd(), "..", "ibcrm", "CategoryMaster.xml");
      const xmlContent = fs.readFileSync(xmlPath, "utf-8");
      this.categoryCache = parseCallCategoryXml(xmlContent);
      return this.categoryCache;
    } catch (error) {
      console.error("Failed to read CategoryMaster.xml", error);
      return [];
    }
  }

  async getOutboundHistory(vcNumber: string): Promise<OutboundCampaignEntry[]> {
    await this.delay(500);
    return (mockOutboundCampaigns as any[]).filter(c => c.vcNumber === vcNumber);
  }

  async submitCallClosure(request: CallClosureRequest): Promise<void> {
    await this.delay(200);
    console.log(`[AUDIT] Call closed for VC ${request.vcNumber} by Agent ${request.agentId}. Category: ${request.categoryId}, Resolved: ${request.isResolved}`);
    // Conceptually saves to interaction history
  }
}
