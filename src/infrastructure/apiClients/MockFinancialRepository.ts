import { SOAHeader, SOATransaction, ServiceEntity, ChannelDetail, GeographyMaster, WaiverReason, WaiverRequest, PaymentReceipt, OutstandingBalance, GraceChargeInfo } from "../../domain/package/FinancialTypes";
import { mockSOAHeader, mockSOATransactions, mockServiceHierarchy, mockChannels, mockGeography, mockWaiverReasons, mockWaiverRequests, mockPaymentReceipts, mockOutstandingBalances } from "../mockData/financialMock";

export class MockFinancialRepository {
  async getSOAHeader(vcNumber: string): Promise<SOAHeader | null> {
    return mockSOAHeader[vcNumber] || null;
  }

  async getSOATransactions(vcNumber: string, viewRPT: number): Promise<SOATransaction[]> {
    // viewRPT simulates the legacy financial year/format routing
    return mockSOATransactions[vcNumber] || [];
  }

  async getServiceHierarchy(vcNumber: string): Promise<ServiceEntity | null> {
    return mockServiceHierarchy[vcNumber] || null;
  }

  async getAllChannels(): Promise<ChannelDetail[]> {
    return mockChannels;
  }

  async getGeographyMaster(): Promise<GeographyMaster[]> {
    return mockGeography;
  }

  async getInvoiceHtml(id: string): Promise<string> {
    return `<html><body><h1>Invoice ${id}</h1><p>This is a mock invoice for Rahul Sharma.</p></body></html>`;
  }

  async getWaiverReasons(): Promise<WaiverReason[]> {
    return mockWaiverReasons;
  }

  async getWaiverRequests(vcNumber: string): Promise<WaiverRequest[]> {
    return mockWaiverRequests.filter(w => w.vcNumber === vcNumber);
  }

  async createWaiverRequest(request: WaiverRequest): Promise<string> {
    const newId = `WAV${Math.floor(1000 + Math.random() * 9000)}`;
    mockWaiverRequests.push({ ...request, id: newId });
    console.log(`[MockFinancialRepository] Waiver requested: ${newId} for ${request.amount}`);
    return newId;
  }

  async getPaymentReceipts(vcNumber: string): Promise<PaymentReceipt[]> {
    return mockPaymentReceipts[vcNumber] || [];
  }

  async getOutstandingBalance(vcNumber: string): Promise<OutstandingBalance | null> {
    return mockOutstandingBalances[vcNumber] || null;
  }

  async checkGraceCharge(smsId: string): Promise<GraceChargeInfo> {
    // Logic: If account was inactive for > 30 days, apply fee (simplified mock)
    return {
      applies: true,
      totalAmount: 23.60,
      preTaxAmount: 20.00,
      taxAmount: 3.60
    };
  }
}
