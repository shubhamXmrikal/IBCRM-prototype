import { MockAlacarteRepository } from "../../infrastructure/apiClients/MockAlacarteRepository";
import { KittyAlacarte } from "../../domain/package/AlacarteTypes";

export class GetKittyDetailsUseCase {
  private repository: MockAlacarteRepository;

  constructor() {
    this.repository = new MockAlacarteRepository();
  }

  async execute(smsId: string): Promise<{ balance: number; options: KittyAlacarte[] }> {
    return this.repository.getKittyDetails(smsId);
  }
}
