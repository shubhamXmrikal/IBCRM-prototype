import { MockModRepository } from "../../infrastructure/apiClients/MockModRepository";
import { MODRequest } from "../../domain/mod/MODTypes";

export class OrderMovieUseCase {
  private repository: MockModRepository;

  constructor() {
    this.repository = new MockModRepository();
  }

  /**
   * Validates and places a new movie order.
   * Emulates validation sequence: CheckMiscValidationOnMOD -> CheckRequestIsAlreadySubmited -> OrderMod
   */
  async execute(request: MODRequest): Promise<string> {
    const validation = await this.repository.validateOrder(request.vcNumber, request.productId);
    
    if (!validation.isEligible) {
      throw new Error(validation.reason);
    }

    return this.repository.createOrder(request);
  }
}
