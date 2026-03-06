import { MockContactRepository } from "../../infrastructure/apiClients/MockContactRepository";
import { MobileDetail } from "../../domain/customer/ContactDetails";

export class GetAlternateMobilesUseCase {
  private repository: MockContactRepository;

  constructor() {
    this.repository = new MockContactRepository();
  }

  /**
   * Loads the full alternate mobile details list for a subscriber.
   * Emulates `usp_CustomerService_GetSubsAltMobileDetails`.
   */
  async execute(
    smsId?: string,
    rid?: string,
    vcNo?: string,
  ): Promise<MobileDetail[]> {
    return this.repository.getSubsMobileDetails(smsId, rid, vcNo);
  }
}
