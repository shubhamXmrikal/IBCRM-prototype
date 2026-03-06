import { MockInteractionRepository } from "../../infrastructure/apiClients/MockInteractionRepository";
import { MockCallRepository } from "../../infrastructure/apiClients/MockCallRepository";
import { Interaction, ServiceRequest } from "../../domain/interaction/Interaction";
import { OutboundCampaignEntry } from "../../domain/call/CallHandlingTypes";

export class GetUnifiedHistoryUseCase {
  private interactionRepo: MockInteractionRepository;
  private callRepo: MockCallRepository;

  constructor() {
    this.interactionRepo = new MockInteractionRepository();
    this.callRepo = new MockCallRepository();
  }

  async execute(customerId: string, vcNumber: string): Promise<{
    interactions: Interaction[];
    serviceRequests: ServiceRequest[];
    outboundCampaigns: OutboundCampaignEntry[];
  }> {
    const [inbound, outbound] = await Promise.all([
      this.interactionRepo.getHistoryByCustomerId(customerId),
      this.callRepo.getOutboundHistory(vcNumber)
    ]);

    return {
      interactions: inbound.interactions,
      serviceRequests: inbound.serviceRequests,
      outboundCampaigns: outbound
    };
  }
}
