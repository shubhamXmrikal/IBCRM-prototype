import { MockContactRepository } from "../../infrastructure/apiClients/MockContactRepository";
import { TelephonyEvent } from "../../domain/customer/ContactDetails";

export class LogTelephonyEventUseCase {
  private repository: MockContactRepository;

  constructor() {
    this.repository = new MockContactRepository();
  }

  /**
   * Logs a telephony lifecycle event to Aspect.
   * Emulates `usp_InsertAspectCLIEvent`.
   */
  async execute(event: TelephonyEvent): Promise<number> {
    return this.repository.insertCiscoCLIEvent(event);
  }
}
