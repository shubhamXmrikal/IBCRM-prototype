import {
  Interaction,
  ServiceRequest,
} from "../../domain/interaction/Interaction";

export const mockInteractions: Interaction[] = [
  {
    id: "INC00123445",
    customerId: "33659209", // Links to Jaffer
    type: "INBOUND",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    category: "Billing Inquiry",
    agentName: "Aman S.",
    status: "CLOSED",
    notes:
      "Customer inquired about recent SMS regarding recharge. Explained the lifetime 20% cashback offer.",
  },
  {
    id: "INC00123488",
    customerId: "33659209", // Links to Jaffer
    type: "SMS",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    category: "Promotional",
    agentName: "System",
    status: "CLOSED",
    notes: "Sent SMS: Recharge with 245 or more for lifetime cashback.",
  },
  {
    id: "INC00123512",
    customerId: "33659209", // Links to Jaffer
    type: "INBOUND",
    date: new Date("2025-01-23"), // Matches payment date
    category: "Payment",
    agentName: "Rashid K.",
    status: "CLOSED",
    notes: "Payment of 442 processed via CL.",
  },
];

export const mockServiceRequests: ServiceRequest[] = [
  {
    id: "SRQ-99882",
    customerId: "33659209",
    type: "INSTALLATION",
    date: new Date("2019-10-04"), // Near activation date
    status: "CLOSED",
    technicianId: "T-10492",
    resolutionRemarks: "Dongle STB-HD installed successfully at Chatroo.",
  },
  {
    id: "SRQ-10452",
    customerId: "33659209",
    type: "REPAIR",
    date: new Date("2024-06-15"),
    status: "CLOSED",
    technicianId: "T-88211",
    resolutionRemarks: "Signal issue resolved. Dish realigned.",
  },
];

export const mockOutboundCampaigns = [
  {
    id: "OB-7721",
    vcNumber: "02563029393", // JAFFER
    campaignName: "Retention Q1 2026",
    callDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: "CONNECTED",
    agentName: "Suresh M.",
    feedback: "Customer interested in base pack upgrade next month.",
  },
  {
    id: "OB-8892",
    vcNumber: "09100000001", // RAHUL
    campaignName: "HD Upsell",
    callDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "NO_ANSWER",
    agentName: "System",
    feedback: "Automated dialer attempt failed.",
  },
];
