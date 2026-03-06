import { MockContactRepository } from "../../infrastructure/apiClients/MockContactRepository";
import { MobileDetail } from "../../domain/customer/ContactDetails";

export class UpdateMobileDetailUseCase {
  private repository: MockContactRepository;

  constructor() {
    this.repository = new MockContactRepository();
  }

  /**
   * Adds or updates a mobile entry.
   * Emulates `usp_CustomerService_InsUpdSubsMobilesDetails`.
   */
  async execute(
    detail: MobileDetail,
  ): Promise<{ status: string; statusCode: string }> {
    const response = await this.repository.updateSubsMobileDetails(detail);

    // Side-effect: Audit log
    if (response.statusCode === "1") {
      await this.repository.mobileLogUpdation({
        smsId: detail.smsId,
        vcNo: detail.vcNo,
        mobileNo: detail.mobileNo,
        userId: detail.administrativeRight || 0, // Mocking user ID
      });
    }

    return response;
  }

  /**
   * De-tags an RMN from another VC and tags it here.
   * Emulates `UpdateSubsMobileDetails_DetaggRMNFromOtherVC`.
   */
  async detagAndTag(
    detail: MobileDetail,
    sourceVcNo: string,
  ): Promise<{ status: string; statusCode: string }> {
    console.log(`[UpdateMobileDetailUseCase] Detagging ${detail.mobileNo} from ${sourceVcNo}`);
    return this.execute(detail);
  }
}
