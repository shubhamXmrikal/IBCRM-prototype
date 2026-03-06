export interface MessageOfTheDay {
  importantMessage: string;
  proactiveInfo: string;
  updatedOn: Date;
}

export interface AgentSession {
  agentId: string;
  agentName: string;
  lastVcNo?: string;
  currentVcNo?: string;
  isUsedZTConn: boolean;
  capturedIp: string;
  centerId: string;
}

export interface RepeatCallerReason {
  id: string;
  name: string;
}

export interface WFMStatus {
  agentId: string;
  status: "ACTIVE" | "INACTIVE" | "BREAK";
  centerId: string;
  lastUpdated: Date;
}

/**
 * Routing logic based on Agent IP
 * Emulates private IsUsedZTConn property in DLCustomerService.cs
 */
export const determineSystemRouting = (ip: string): boolean => {
  // Simulate legacy database routing rules
  // In real app, this would check a mapping table
  if (ip.startsWith("10.10.17.") || ip.startsWith("172.16.")) {
    return true; // Routes to ZTConn / ZTConnReadOnly
  }
  return false; // Routes to Default / ServiceCRM
};
