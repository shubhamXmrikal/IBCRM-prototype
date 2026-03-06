import { RechargeValidation, RechargeDueInfo, MigrationOption, PostpaidLead } from "../../domain/recharge/RechargeTypes";
import { mockRechargeValidations, mockRechargeDueInfo, mockMigrationOptions, mockPostpaidLeads } from "../mockData/rechargeMock";

export class MockRechargeRepository {
  async validateRecharge(vcNumber: string): Promise<RechargeValidation | null> {
    return mockRechargeValidations[vcNumber] || null;
  }

  async getRechargeDue(smsId: string): Promise<RechargeDueInfo | null> {
    // In our mock, we mapped by VC or SMSID string
    return mockRechargeDueInfo[smsId] || null;
  }

  async getMigrationOptions(smsId: string): Promise<MigrationOption[]> {
    return mockMigrationOptions;
  }

  async createPostpaidLead(lead: PostpaidLead): Promise<string> {
    const newId = `LD${Math.floor(100000 + Math.random() * 900000)}`;
    mockPostpaidLeads.push({ ...lead, id: newId, createdOn: new Date() });
    console.log(`[MockRechargeRepository] Postpaid lead created: ${newId} for VC: ${lead.vcNumber}`);
    return newId;
  }

  async getPostpaidLeads(vcNumber: string): Promise<PostpaidLead[]> {
    return mockPostpaidLeads.filter(l => l.vcNumber === vcNumber);
  }
}
