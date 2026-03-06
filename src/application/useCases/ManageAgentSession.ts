import { MockAgentRepository } from "../../infrastructure/apiClients/MockAgentRepository";
import { AgentSession } from "../../domain/agent/AgentTypes";

export class ManageAgentSessionUseCase {
  private repository: MockAgentRepository;

  constructor() {
    this.repository = new MockAgentRepository();
  }

  /**
   * Tracks the agent's last viewed subscriber.
   * Emulates usp_CustomerService_InsertVCNo.
   */
  async recordSubscriberAccess(agentId: string, vcNo: string): Promise<void> {
    return this.repository.updateLastVC(agentId, vcNo);
  }

  /**
   * Gets the current session details including IP-based routing.
   * Emulates usp_CustomerService_CheckZTConn and GetLastVCNo.
   */
  async getSession(ip: string): Promise<AgentSession> {
    return this.repository.getSession(ip);
  }
}
