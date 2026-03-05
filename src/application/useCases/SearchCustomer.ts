import {
  SearchType,
  SearchResult,
} from "../../domain/customer/SubscriberSearchTypes";
import { MockCustomerRepository } from "../../infrastructure/apiClients/MockCustomerRepository";
import { MockVerificationRepository } from "../../infrastructure/apiClients/MockVerificationRepository";

/**
 * SearchCustomerUseCase
 *
 * Orchestrates the subscriber search flow.
 * Maps to the legacy CSSubInfoPersonal.aspx.cs [WebMethod] GetSubscriberInfoDetails().
 *
 * Data flow:
 *   1. Validate inputs
 *   2. Call repository.getBySearchType(searchType, searchBy)
 *      - Returns 'single' | 'multi_match' | 'not_found'
 *   3. If single and subscriber isGoMulti → fetch GoMulti connections
 *   4. Log session audit (InsertLastVCDetails equivalent)
 */
export class SearchCustomerUseCase {
  private repository: MockCustomerRepository;
  private verificationRepo: MockVerificationRepository;

  constructor() {
    this.repository = new MockCustomerRepository();
    this.verificationRepo = new MockVerificationRepository();
  }

  async execute(
    searchType: SearchType,
    searchBy: string,
    agentId: string = "AGENT_001",
  ): Promise<SearchResult> {
    // ── Validation (mirrors the WebForms: if SearchBy.trim() == "") ──
    if (!searchBy || searchBy.trim() === "") {
      throw new Error("Search query cannot be empty");
    }

    const trimmedSearch = searchBy.trim();

    // ── Step 1: Primary lookup ──────────────────────────────────────────────
    // Maps to: oBLCustomerService.GetSubscriberInfoDetails(SearchType, SearchBy, CLI, ZtRowID)
    const result = await this.repository.getBySearchType(
      searchType,
      trimmedSearch,
    );

    // ── Step 2: GoMulti resolution (if single result and isGoMulti) ────────
    // Maps to: GetChildParnetDetails(smsId) → usp_CustomerService_GetParentChildDetails
    if (result.type === "single" && result.subscriber.isGoMulti) {
      const goMulti = await this.repository.getGoMultiConnections(
        result.subscriber.smsId,
      );
      if (goMulti) {
        return { type: "single", subscriber: result.subscriber, goMulti };
      }
    }

    // ── Step 3: Session audit (always, on successful single-match load) ─────
    // Maps to: InsertLastVCDetails(VCNo, LoginID) → usp_CustomerService_InsertVCNo
    if (result.type === "single") {
      await this.repository.insertSessionAudit(
        agentId,
        result.subscriber.vcNumber,
      );

      // ── Append KYC Profile ──
      const profile = await this.verificationRepo.getVerificationProfile(
        result.subscriber.vcNumber,
      );
      if (profile) {
        result.subscriber.callerContext.kycStatus = profile.kycStatus;
        result.subscriber.callerContext.failedAttempts = profile.failedAttempts;
      } else {
        // If not in our mock seed, default to unverified
        result.subscriber.callerContext.kycStatus = "PENDING";
        result.subscriber.callerContext.failedAttempts = 0;
      }
    }

    return result;
  }

  // ── Resume-last-call helper ────────────────────────────────────────────────
  // Maps to: GetLastVCNo(loginID) → usp_CustomerService_GetLastVCNo
  async getLastVCNo(
    agentId: string,
  ): Promise<{ lastVCNo: string | null; currentVCNo: string | null }> {
    return this.repository.getLastVCNo(agentId);
  }
}
