import { MockAlacarteRepository } from "../../infrastructure/apiClients/MockAlacarteRepository";

export class RedeemKittyUseCase {
  private repository: MockAlacarteRepository;

  constructor() {
    this.repository = new MockAlacarteRepository();
  }

  async execute(smsId: string, packageIds: string[]): Promise<string> {
    // Emulates InsertAlaCarteKitty transaction
    return this.repository.redeemKitty(smsId, packageIds);
  }
}
