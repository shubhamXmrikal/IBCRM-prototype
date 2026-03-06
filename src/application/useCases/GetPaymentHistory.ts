import { MockFinancialRepository } from "../../infrastructure/apiClients/MockFinancialRepository";
import { PaymentReceipt } from "../../domain/package/FinancialTypes";

export class GetPaymentHistoryUseCase {
  private repository: MockFinancialRepository;

  constructor() {
    this.repository = new MockFinancialRepository();
  }

  /**
   * Retrieves full payment and recharge history.
   * Emulates GetPaymentDetails and GetRechargeDetails.
   */
  async execute(vcNumber: string): Promise<PaymentReceipt[]> {
    return this.repository.getPaymentReceipts(vcNumber);
  }
}
