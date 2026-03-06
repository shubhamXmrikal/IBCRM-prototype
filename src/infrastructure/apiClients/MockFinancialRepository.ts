import { SOAHeader, SOATransaction, ServiceEntity, ChannelDetail, GeographyMaster } from "../../domain/package/FinancialTypes";
import { mockSOAHeader, mockSOATransactions, mockServiceHierarchy, mockChannels, mockGeography } from "../mockData/financialMock";

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
}
