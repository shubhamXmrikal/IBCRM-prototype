import { MockCallRepository } from "../../infrastructure/apiClients/MockCallRepository";
import { CallCategoryNode } from "../../domain/call/CallHandlingTypes";

export class GetCallTreeUseCase {
  private repository: MockCallRepository;

  constructor() {
    this.repository = new MockCallRepository();
  }

  async execute(): Promise<CallCategoryNode[]> {
    return this.repository.getCallCategories();
  }
}
