import { MockFinancialRepository } from "../../infrastructure/apiClients/MockFinancialRepository";
import { SOAHeader, SOATransaction } from "../../domain/package/FinancialTypes";

export class GetStatementOfAccountUseCase {
  private repository: MockFinancialRepository;

  constructor() {
    this.repository = new MockFinancialRepository();
  }

  async execute(vcNumber: string, viewRPT: number = 7): Promise<{ header: SOAHeader | null; transactions: SOATransaction[] }> {
    const header = await this.repository.getSOAHeader(vcNumber);
    const transactions = await this.repository.getSOATransactions(vcNumber, viewRPT);

    return { header, transactions };
  }
}
