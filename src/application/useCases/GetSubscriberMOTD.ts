import { MockAgentRepository } from "../../infrastructure/apiClients/MockAgentRepository";
import { MessageOfTheDay } from "../../domain/agent/AgentTypes";

export class GetSubscriberMOTDUseCase {
  private repository: MockAgentRepository;

  constructor() {
    this.repository = new MockAgentRepository();
  }

  /**
   * Retrieves targeted alerts and proactive info for a subscriber.
   * Emulates usp_CustomerService_GetInformationByVC.
   */
  async execute(smsId: string): Promise<MessageOfTheDay | null> {
    return this.repository.getMOTD(smsId);
  }
}
