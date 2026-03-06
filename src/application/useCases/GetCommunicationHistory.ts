import { MockCommunicationRepository } from "../../infrastructure/apiClients/MockCommunicationRepository";
import { CommunicationLog } from "../../domain/communication/CommunicationTypes";

export class GetCommunicationHistoryUseCase {
  private repository: MockCommunicationRepository;

  constructor() {
    this.repository = new MockCommunicationRepository();
  }

  /**
   * Retrieves full outbound message history for a subscriber.
   * Emulates Usp_DLRNotificationMsgLogSelect.
   */
  async execute(vcNumber: string): Promise<CommunicationLog[]> {
    return this.repository.getLogsByVc(vcNumber);
  }
}
