import { Complaint, ServiceRequest, AppointmentSlot } from "../../domain/complaint/ComplaintTypes";

export const mockComplaints: (Complaint | ServiceRequest)[] = [
  {
    id: "C1001",
    vcNumber: "09100000001", // Rahul Sharma
    smsId: "41200100",
    category: "No Signal",
    categoryId: "CAT_SIG_01",
    status: "CLOSED",
    description: "E48-32 error message on all channels",
    createdOn: new Date("2026-02-15T10:00:00"),
    agentId: "AGENT_001",
    agentName: "Sumit Kumar",
    resolvedOn: new Date("2026-02-15T14:30:00"),
    resolvedBy: "SYSTEM",
    priority: "NORMAL",
    tatHours: 4,
    caseHistory: "Heavy rain reported in area. Signal restored automatically."
  },
  {
    id: "SR2001",
    vcNumber: "02563029393", // Jaffer Resht
    smsId: "33659209",
    category: "STB Faulty",
    categoryId: "CAT_HW_02",
    status: "RESOLVED",
    description: "STB not powering on even after adapter change",
    createdOn: new Date("2026-03-01T09:15:00"),
    agentId: "AGENT_002",
    agentName: "Anjali Sharma",
    priority: "HIGH",
    tatHours: 48,
    caseHistory: "Technician visited. STB replaced with refurbished unit.",
    stbNo: "STB_JAF_992",
    servicerId: "SERV_DEL_05",
    servicerName: "Raj Technical Services",
    address: {
      line1: "House No 12, Street 4, Lajpat Nagar",
      city: "New Delhi",
      pin: "110024"
    },
    agonyCount: 1
  }
];

export const mockAppointmentSlots: AppointmentSlot[] = [
  { id: "S1", label: "09:00 AM - 12:00 PM" },
  { id: "S2", label: "12:00 PM - 03:00 PM" },
  { id: "S3", label: "03:00 PM - 06:00 PM" },
  { id: "S4", label: "06:00 PM - 09:00 PM" }
];
