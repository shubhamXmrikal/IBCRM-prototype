import { MockAlacarteRepository } from "../../infrastructure/apiClients/MockAlacarteRepository";
import { PromoAlacarte } from "../../domain/package/AlacarteTypes";

export class GetPromotionalOffersUseCase {
  private repository: MockAlacarteRepository;

  constructor() {
    this.repository = new MockAlacarteRepository();
  }

  async execute(smsId: string): Promise<PromoAlacarte[]> {
    return this.repository.getPromotionalOffers(smsId);
  }
}
