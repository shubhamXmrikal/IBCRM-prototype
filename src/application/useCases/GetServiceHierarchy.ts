import { MockFinancialRepository } from "../../infrastructure/apiClients/MockFinancialRepository";
import { ServiceEntity } from "../../domain/package/FinancialTypes";

export class GetServiceHierarchyUseCase {
  private repository: MockFinancialRepository;

  constructor() {
    this.repository = new MockFinancialRepository();
  }

  async execute(vcNumber: string): Promise<ServiceEntity | null> {
    return this.repository.getServiceHierarchy(vcNumber);
  }
}
