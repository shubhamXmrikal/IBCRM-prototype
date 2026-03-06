import { MockLoyaltyRepository } from "../../infrastructure/apiClients/MockLoyaltyRepository";
import { LoyaltyWallet, LoyaltyTransaction } from "../../domain/loyalty/LoyaltyTypes";

export class GetUnifiedLoyaltyBalanceUseCase {
  private repository: MockLoyaltyRepository;

  constructor() {
    this.repository = new MockLoyaltyRepository();
  }

  /**
   * Retrieves aggregated loyalty balances and recent transactions.
   * Emulates Mod_kitty_info, usp_CheckKittyAmount, etc.
   */
  async execute(vcNumber: string): Promise<{ wallet: LoyaltyWallet | null; history: LoyaltyTransaction[] }> {
    const wallet = await this.repository.getLoyaltyBalance(vcNumber);
    const history = await this.repository.getLoyaltyHistory(vcNumber);
    
    return { wallet, history };
  }
}
