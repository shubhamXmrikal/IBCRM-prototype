import { MockContactRepository } from "../../infrastructure/apiClients/MockContactRepository";
import { DealerContactDetails } from "../../domain/customer/ContactDetails";

export class DealerContactManagementUseCase {
  private repository: MockContactRepository;

  constructor() {
    this.repository = new MockContactRepository();
  }

  async getDealerContact(glCode: string): Promise<DealerContactDetails | null> {
    return this.repository.getDealerContactDetail(glCode);
  }

  async updateDealerContact(
    detail: DealerContactDetails,
  ): Promise<{ status: string; statusCode: string }> {
    return this.repository.updateDealerDetails(detail);
  }
}
