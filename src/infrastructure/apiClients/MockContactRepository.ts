import {
  MobileDetail,
  RelationshipMaster,
  DealerContactDetails,
  ContactAuditLog,
  TelephonyEvent,
} from "../../domain/customer/ContactDetails";
import {
  mockMobileDetails,
  mockRelationshipMasters,
  mockDealerContactDetails,
  mockContactAuditLogs,
} from "../mockData/contactDetailsMock";
import { mockSubscribers } from "../mockData/customerMock";

export class MockContactRepository {
  async getSubsMobileDetails(
    smsId?: string,
    rid?: string,
    vcNo?: string,
  ): Promise<MobileDetail[]> {
    return mockMobileDetails.filter((m) => {
      if (rid) return m.rid === rid;
      if (smsId) return m.smsId === smsId;
      if (vcNo) return m.vcNo === vcNo;
      return true;
    });
  }

  async getRelationshipDtl(): Promise<RelationshipMaster[]> {
    return mockRelationshipMasters;
  }

  async updateSubsMobileDetails(
    detail: MobileDetail,
  ): Promise<{ status: string; statusCode: string }> {
    if (detail.rid) {
      const index = mockMobileDetails.findIndex((m) => m.rid === detail.rid);
      if (index !== -1) {
        mockMobileDetails[index] = { ...mockMobileDetails[index], ...detail };
      }
    } else {
      const newRid = (
        Math.max(...mockMobileDetails.map((m) => parseInt(m.rid || "0"))) + 1
      ).toString();
      mockMobileDetails.push({ ...detail, rid: newRid });
    }

    // Side-effect: Internal SMS dispatch would happen here in a real DL
    console.log(`[MockContactRepository] SMS dispatched for ${detail.mobileNo} (Flag=13)`);

    return { status: "SUCCESS", statusCode: "1" };
  }

  async deleteMobileDetails(rid: string): Promise<void> {
    const index = mockMobileDetails.findIndex((m) => m.rid === rid);
    if (index !== -1) {
      mockMobileDetails.splice(index, 1);
    }
  }

  async mobileLogUpdation(log: {
    smsId: string;
    vcNo: string;
    mobileNo: string;
    userId: number;
  }): Promise<void> {
    console.log(`[MockContactRepository] Mobile log updated for SMSID: ${log.smsId}`);
  }

  async getContactAuditReport(smsId: string): Promise<ContactAuditLog[]> {
    return mockContactAuditLogs.filter((l) => l.smsId === smsId);
  }

  async updateAlternateNumberForMOD(
    mobileNo: string,
    smsId: string,
    vcNo: string,
    email: string,
  ): Promise<{ status: string; statusCode: string }> {
    console.log(`[MockContactRepository] MOD alternate number updated for ${smsId}`);
    return { status: "SUCCESS", statusCode: "1" };
  }

  async getDealerContactDetail(glCode: string): Promise<DealerContactDetails | null> {
    return mockDealerContactDetails[glCode] || null;
  }

  async updateDealerDetails(
    detail: DealerContactDetails,
  ): Promise<{ status: string; statusCode: string }> {
    mockDealerContactDetails[detail.glCode] = detail;
    return { status: "SUCCESS", statusCode: "1" };
  }

  async insertCiscoCLIEvent(event: TelephonyEvent): Promise<number> {
    console.log(`[MockContactRepository] Telephony event logged: ${event.event}`);
    return Math.floor(Math.random() * 100000);
  }
}
