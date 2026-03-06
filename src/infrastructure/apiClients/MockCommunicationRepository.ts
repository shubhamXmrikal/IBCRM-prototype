import { CommunicationLog, OTPRequest, SMSVendor } from "../../domain/communication/CommunicationTypes";
import { mockSMSVendors, mockCommunicationLogs, mockOTPStore } from "../mockData/communicationMock";

export class MockCommunicationRepository {
  async getVendors(): Promise<SMSVendor[]> {
    return mockSMSVendors;
  }

  async getLogsByVc(vcNumber: string): Promise<CommunicationLog[]> {
    return mockCommunicationLogs.filter(l => l.vcNumber === vcNumber);
  }

  async logCommunication(log: Omit<CommunicationLog, "id">): Promise<string> {
    const newId = `LOG_${Math.floor(1000 + Math.random() * 9000)}`;
    const fullLog = { ...log, id: newId };
    mockCommunicationLogs.push(fullLog);
    console.log(`[MockCommRepo] ${log.channel} logged to ${log.recipient}: ${log.message.substring(0, 30)}... (AgentIP: ${log.agentIp})`);
    return newId;
  }

  async createOTP(request: Omit<OTPRequest, "id" | "otpCode" | "expiresAt" | "isValidated">): Promise<OTPRequest> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 2);

    const newRequest: OTPRequest = {
      ...request,
      id: `OTP_${Math.floor(1000 + Math.random() * 9000)}`,
      otpCode,
      expiresAt,
      isValidated: false
    };

    mockOTPStore.push(newRequest);
    console.log(`[MockCommRepo] OTP Generated for ${request.mobileNo}: ${otpCode} (Expires: ${expiresAt.toLocaleTimeString()})`);
    return newRequest;
  }

  async validateOTP(vcNumber: string, code: string): Promise<boolean> {
    const index = mockOTPStore.findIndex(r => 
      r.vcNumber === vcNumber && 
      r.otpCode === code && 
      !r.isValidated && 
      r.expiresAt > new Date()
    );

    if (index !== -1) {
      mockOTPStore[index].isValidated = true;
      console.log(`[MockCommRepo] OTP Validated for VC: ${vcNumber}`);
      return true;
    }

    return false;
  }
}
