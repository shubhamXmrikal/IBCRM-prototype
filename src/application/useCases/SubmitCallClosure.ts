import { MockCallRepository } from "../../infrastructure/apiClients/MockCallRepository";
import { CallClosureRequest } from "../../domain/call/CallHandlingTypes";

export class SubmitCallClosureUseCase {
  private repository: MockCallRepository;

  constructor() {
    this.repository = new MockCallRepository();
  }

  async execute(request: CallClosureRequest): Promise<{ success: boolean; callbackScheduled: boolean }> {
    const categories = await this.repository.getCallCategories();
    const node = categories.find(c => c.id === request.categoryId);

    if (!node) {
      throw new Error("Invalid category selected.");
    }

    // Business Rule: Selection of a leaf node is mandatory for closure
    if (!node.isLeaf) {
      throw new Error("Closure is only allowed on leaf nodes of the call tree.");
    }

    await this.repository.submitCallClosure(request);

    // Business Rule: If call drop category, trigger callback (simulated)
    const callbackScheduled = node.isCallDropCategory;

    return { success: true, callbackScheduled };
  }
}
