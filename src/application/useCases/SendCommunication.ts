import { MockCommunicationRepository } from "../../infrastructure/apiClients/MockCommunicationRepository";
import { CommunicationLog, captureAgentIP } from "../../domain/communication/CommunicationTypes";

export class SendCommunicationUseCase {
  private repository: MockCommunicationRepository;

  constructor() {
    this.repository = new MockCommunicationRepository();
  }

  /**
   * Orchestrates sending and logging of SMS/WhatsApp.
   * Emulates Send_SMS and SendWhatsAppNotification.
   */
  async execute(log: Omit<CommunicationLog, "id" | "sentOn" | "status" | "agentIp">, req: Request): Promise<string> {
    const agentIp = captureAgentIP(req);
    
    // Simulate vendor fallback lookup
    const vendors = await this.repository.getVendors();
    const primary = vendors.find(v => v.isPrimary);
    
    console.log(`[SendCommUseCase] Using primary vendor: ${primary?.name} via ${primary?.gatewayUrl}`);

    return this.repository.logCommunication({
      ...log,
      agentIp,
      sentOn: new Date(),
      status: "SENT"
    });
  }
}
