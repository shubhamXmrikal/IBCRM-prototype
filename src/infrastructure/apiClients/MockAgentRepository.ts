import { MessageOfTheDay, RepeatCallerReason, AgentSession, determineSystemRouting } from "../../domain/agent/AgentTypes";
import { mockMOTD, mockRepeatReasons, currentAgentSession } from "../mockData/agentMock";

export class MockAgentRepository {
  async getMOTD(smsId: string): Promise<MessageOfTheDay | null> {
    return mockMOTD[smsId] || null;
  }

  async getRepeatReasons(): Promise<RepeatCallerReason[]> {
    return mockRepeatReasons;
  }

  async getSession(ip: string): Promise<AgentSession> {
    const isUsedZTConn = determineSystemRouting(ip);
    return { ...currentAgentSession, capturedIp: ip, isUsedZTConn };
  }

  async updateLastVC(loginId: string, vcNo: string): Promise<void> {
    currentAgentSession.lastVcNo = currentAgentSession.currentVcNo;
    currentAgentSession.currentVcNo = vcNo;
    console.log(`[MockAgentRepo] Agent ${loginId} session updated. Current VC: ${vcNo}`);
  }

  async updateWFMStatus(agentId: string, status: string): Promise<void> {
    console.log(`[MockAgentRepo] WFM Status updated for ${agentId} to ${status}`);
  }
}
