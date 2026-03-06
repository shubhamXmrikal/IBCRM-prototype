import { MockModRepository } from "../../infrastructure/apiClients/MockModRepository";

export class ResendMovieAuthorizationUseCase {
  private repository: MockModRepository;

  constructor() {
    this.repository = new MockModRepository();
  }

  /**
   * Re-pushes authorization signal to CONAX CAS.
   * Emulates InsertResendMODRequest.
   */
  async execute(requestId: string): Promise<boolean> {
    return this.repository.reAuthorize(requestId);
  }
}
