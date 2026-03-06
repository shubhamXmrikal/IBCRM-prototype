export type ComplaintStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | "REOPENED";

export interface Complaint {
  id: string;
  vcNumber: string;
  smsId: string;
  category: string;
  categoryId: string;
  status: ComplaintStatus;
  description: string;
  createdOn: Date;
  agentId: string;
  agentName: string;
  resolvedOn?: Date;
  resolvedBy?: string;
  priority: "NORMAL" | "HIGH";
  tatHours: number;
  caseHistory: string;
}

export interface ServiceRequest extends Complaint {
  stbNo: string;
  appointmentDate?: Date;
  appointmentSlotId?: string;
  servicerId?: string;
  servicerName?: string;
  address: {
    line1: string;
    city: string;
    pin: string;
  };
  agonyCount: number; // For escalation tracking ( repeat calls )
}

export interface AppointmentSlot {
  id: string;
  label: string; // e.g., "9 AM - 12 PM"
}

export interface ComplaintValidationResult {
  isEligible: boolean;
  message?: string;
  existingTicketId?: string;
}
