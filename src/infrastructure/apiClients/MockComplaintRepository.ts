import { Complaint, ServiceRequest, AppointmentSlot, ComplaintValidationResult } from "../../domain/complaint/ComplaintTypes";
import { mockComplaints, mockAppointmentSlots } from "../mockData/complaintMock";

export class MockComplaintRepository {
  async getByVcNumber(vcNumber: string): Promise<(Complaint | ServiceRequest)[]> {
    return mockComplaints.filter(c => c.vcNumber === vcNumber);
  }

  async getById(id: string): Promise<Complaint | ServiceRequest | null> {
    return mockComplaints.find(c => c.id === id) || null;
  }

  async create(complaint: Complaint | ServiceRequest): Promise<string> {
    const newId = complaint.id || `TKT${Math.floor(100000 + Math.random() * 900000)}`;
    const newEntry = { ...complaint, id: newId, createdOn: new Date() };
    mockComplaints.push(newEntry);
    console.log(`[MockComplaintRepository] New ticket created: ${newId}`);
    return newId;
  }

  async update(id: string, updates: Partial<Complaint | ServiceRequest>): Promise<void> {
    const index = mockComplaints.findIndex(c => c.id === id);
    if (index !== -1) {
      mockComplaints[index] = { ...mockComplaints[index], ...updates };
      console.log(`[MockComplaintRepository] Ticket updated: ${id}`);
    }
  }

  async getAppointmentSlots(): Promise<AppointmentSlot[]> {
    return mockAppointmentSlots;
  }

  async validateEligibility(vcNumber: string): Promise<ComplaintValidationResult> {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const recentComplaints = mockComplaints.filter(c => 
      c.vcNumber === vcNumber && 
      c.createdOn >= threeDaysAgo &&
      c.status !== "CLOSED"
    );

    if (recentComplaints.length >= 2) {
      return {
        isEligible: false,
        message: "Duplicate Check: This subscriber already has 2 active complaints logged in the last 3 days. Please update the existing ticket instead of creating a new one.",
        existingTicketId: recentComplaints[0].id
      };
    }

    return { isEligible: true };
  }
}
