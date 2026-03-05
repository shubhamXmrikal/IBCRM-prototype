import { Customer } from "../../domain/customer/Customer";
import {
  SearchType,
  SearchSubsDetails,
  GoMultiResult,
  SearchResult,
} from "../../domain/customer/SubscriberSearchTypes";
import {
  mockSubscribers,
  mockMobileIndex,
  mockEmailIndex,
  mockSTBIndex,
  mockSMSIDIndex,
  mockGoMultiForRahul,
  sessionAuditLog,
  mockMultiMatchMobile,
} from "../mockData/customerMock";

/**
 * MockCustomerRepository
 *
 * Simulates the legacy DAL methods that call SQL stored procedures.
 * All methods include a simulated async delay to mimic real DB round-trips.
 *
 * Method → Legacy SP mapping:
 *   getBySearchType()        → usp_CUSTOMERSERVICE_GetSubscriberInfo_Final
 *   getMultiMatchCandidates()→ usp_CUSTOMERSERVICE_SearchSubsDetailByMobnEmail
 *   getGoMultiConnections()  → usp_CustomerService_GetParentChildDetails
 *   insertSessionAudit()     → usp_CustomerService_InsertVCNo
 *   getLastVCNo()            → usp_CustomerService_GetLastVCNo
 */
export class MockCustomerRepository {
  private delay(ms = 400): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private findByVC(vcNumber: string): Customer | null {
    return mockSubscribers.find((s) => s.vcNumber === vcNumber) ?? null;
  }

  /**
   * Primary lookup — mirrors usp_CUSTOMERSERVICE_GetSubscriberInfo_Final.
   *
   * Branches on SearchType:
   *   VC     → direct lookup by vcNumber
   *   SMSID  → resolve via mockSMSIDIndex → lookup by VC
   *   STB    → resolve via mockSTBIndex → lookup by VC
   *   RMN/MOBILE/EMAIL → resolve via index → may produce multi-match
   *
   * Returns:
   *   SearchResult.single      → one subscriber found
   *   SearchResult.multi_match → mobile/email resolves to 2+ accounts
   *   SearchResult.not_found   → nothing matched
   */
  async getBySearchType(
    searchType: SearchType,
    searchBy: string,
  ): Promise<SearchResult> {
    await this.delay();

    switch (searchType) {
      case "VC": {
        const sub = this.findByVC(searchBy);
        if (!sub) return { type: "not_found" };
        return { type: "single", subscriber: sub };
      }

      case "SMSID": {
        const vc = mockSMSIDIndex[searchBy];
        if (!vc) return { type: "not_found" };
        const sub = this.findByVC(vc);
        if (!sub) return { type: "not_found" };
        return { type: "single", subscriber: sub };
      }

      case "STB": {
        const vc = mockSTBIndex[searchBy];
        if (!vc) return { type: "not_found" };
        const sub = this.findByVC(vc);
        if (!sub) return { type: "not_found" };
        return { type: "single", subscriber: sub };
      }

      case "RMN":
      case "MOBILE": {
        const vcList = mockMobileIndex[searchBy] ?? [];
        if (vcList.length === 0) return { type: "not_found" };

        // Multiple accounts on same mobile → disambiguation required
        if (vcList.length > 1) {
          const candidates = await this.getMultiMatchCandidates(
            searchBy,
            "MOBILE",
          );
          return { type: "multi_match", candidates };
        }

        const sub = this.findByVC(vcList[0]);
        if (!sub) return { type: "not_found" };
        return { type: "single", subscriber: sub };
      }

      case "EMAIL": {
        const vcList = mockEmailIndex[searchBy] ?? [];
        if (vcList.length === 0) return { type: "not_found" };

        if (vcList.length > 1) {
          const candidates = await this.getMultiMatchCandidates(
            searchBy,
            "EMAIL",
          );
          return { type: "multi_match", candidates };
        }

        const sub = this.findByVC(vcList[0]);
        if (!sub) return { type: "not_found" };
        return { type: "single", subscriber: sub };
      }

      default:
        return { type: "not_found" };
    }
  }

  /**
   * Multi-match disambiguation — mirrors usp_CUSTOMERSERVICE_SearchSubsDetailByMobnEmail.
   * Returns a light summary list (not full SubscriberInfo) so agent can pick the right account.
   */
  async getMultiMatchCandidates(
    searchText: string,
    searchType: "MOBILE" | "EMAIL",
  ): Promise<SearchSubsDetails[]> {
    await this.delay(200);

    const index = searchType === "MOBILE" ? mockMobileIndex : mockEmailIndex;
    const vcList = index[searchText] ?? [];

    return vcList.map((vc): SearchSubsDetails => {
      const sub = this.findByVC(vc)!;
      const mobileType =
        sub.contact.mobile1 === searchText
          ? "MOB1"
          : sub.contact.mobile2 === searchText
            ? "MOB2"
            : sub.contact.mobile3 === searchText
              ? "MOB3"
              : "RMN";

      return {
        vcNumber: sub.vcNumber,
        smsId: sub.smsId,
        subscriberName: sub.name,
        address: [sub.address.line1, sub.address.line2]
          .filter(Boolean)
          .join(", "),
        city: sub.address.city,
        state: sub.address.state,
        mobileType,
      };
    });
  }

  /**
   * GoMulti parent/child lookup — mirrors usp_CustomerService_GetParentChildDetails.
   * The legacy SP returns two resultsets; here we return both as a combined object.
   */
  async getGoMultiConnections(smsId: string): Promise<GoMultiResult | null> {
    await this.delay(300);

    // Only Rahul (41200100) has GoMulti connections in mock
    if (smsId === "41200100") {
      return mockGoMultiForRahul;
    }
    return null;
  }

  /**
   * Session audit insert — mirrors usp_CustomerService_InsertVCNo.
   * Logs which agent loaded which VC number (compliance requirement).
   */
  async insertSessionAudit(agentId: string, vcNumber: string): Promise<void> {
    await this.delay(100);
    sessionAuditLog.push({ agentId, vcNumber, timestamp: new Date() });
  }

  /**
   * Retrieve last VC number for agent — mirrors usp_CustomerService_GetLastVCNo.
   * Used for "resume last call" on reconnect.
   */
  async getLastVCNo(
    agentId: string,
  ): Promise<{ lastVCNo: string | null; currentVCNo: string | null }> {
    await this.delay(100);
    const entries = sessionAuditLog.filter((e) => e.agentId === agentId);
    const last = entries[entries.length - 1];
    return {
      lastVCNo: last?.vcNumber ?? null,
      currentVCNo: null, // Current session VC — would come from session store in real impl
    };
  }

  // ── Legacy compatibility method (kept for existing tests) ──────────────────
  async getCustomerByVC(vcNumber: string): Promise<Customer | null> {
    await this.delay();
    return this.findByVC(vcNumber);
  }
}
