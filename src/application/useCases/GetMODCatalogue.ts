import { MockModRepository } from "../../infrastructure/apiClients/MockModRepository";
import { MovieProduct } from "../../domain/mod/MODTypes";

export class GetMODCatalogueUseCase {
  private repository: MockModRepository;

  constructor() {
    this.repository = new MockModRepository();
  }

  async execute(): Promise<MovieProduct[]> {
    return this.repository.getCatalogue();
  }
}
