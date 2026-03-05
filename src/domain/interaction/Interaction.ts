export type InteractionType = "INBOUND" | "OUTBOUND" | "SMS" | "EMAIL";
export type InteractionStatus = "OPEN" | "RESOLVED" | "PENDING" | "CLOSED";

export interface Interaction {
  id: string; // TKT / Rqst Id
  customerId: string; // Maps to SMSID
  type: InteractionType;
  date: Date;
  category: string; // e.g., 'Billing', 'Technical'
  agentName: string;
  status: InteractionStatus;
  notes: string;
}

export type ServiceRequestType = "INSTALLATION" | "REPAIR" | "RELOCATION";

export interface ServiceRequest {
  id: string;
  customerId: string;
  type: ServiceRequestType;
  date: Date;
  status: InteractionStatus;
  scheduledDate?: Date;
  technicianId?: string;
  resolutionRemarks?: string;
}
