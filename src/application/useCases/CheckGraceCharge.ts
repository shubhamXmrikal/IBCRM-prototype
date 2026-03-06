import { MockFinancialRepository } from "../../infrastructure/apiClients/MockFinancialRepository";
import { GraceChargeInfo } from "../../domain/package/FinancialTypes";

export class CheckGraceChargeUseCase {
  private repository: MockFinancialRepository;

  constructor() {
    this.repository = new MockFinancialRepository();
  }

  /**
   * Checks if a monthly grace charge applies.
   * Emulates GraceChargeCheckMonthly.
   */
  async execute(smsId: string): Promise<GraceChargeInfo> {
    return this.repository.checkGraceCharge(smsId);
  }
}
