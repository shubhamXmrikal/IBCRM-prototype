import { SOAHeader, SOATransaction, ServiceEntity, ChannelDetail, GeographyMaster } from "../../domain/package/FinancialTypes";

// ── SOA Header Mock for Rahul Sharma ──────────────────────────────────────
export const mockSOAHeader: Record<string, SOAHeader> = {
  "09100000001": {
    balance: 142.50,
    monthlyRecharge: 350.00,
    bonusPoints: 1250,
    switchOffDate: new Date("2026-04-12"),
    gstIn: "07AAAAA0000A1Z5",
    packNamePrice: "HD Family Pack @ 350",
    statementPeriod: "01/Mar/2026 - 31/Mar/2026"
  }
};

// ── SOA Transactions Mock for Rahul Sharma ────────────────────────────────
export const mockSOATransactions: Record<string, SOATransaction[]> = {
  "09100000001": [
    {
      id: "T001",
      date: new Date("2026-03-25"),
      type: "PAYMENT",
      description: "Online Recharge - Credit Card",
      debit: 0,
      credit: 350.00,
      balance: 142.50,
      referenceNo: "RCG991122"
    },
    {
      id: "T002",
      date: new Date("2026-03-01"),
      type: "DEBIT",
      description: "Monthly Pack Renewal - HD Family Pack",
      debit: 350.00,
      credit: 0,
      balance: -207.50,
      referenceNo: "RNW882233",
      periodFrom: new Date("2026-03-01"),
      periodTo: new Date("2026-03-31")
    },
    {
      id: "T003",
      date: new Date("2026-02-25"),
      type: "PAYMENT",
      description: "Online Recharge - UPI",
      debit: 0,
      credit: 350.00,
      balance: 142.50,
      referenceNo: "UPI773344"
    }
  ]
};

// ── Hierarchy Mock for Rahul Sharma ───────────────────────────────────────
export const mockServiceHierarchy: Record<string, ServiceEntity> = {
  "09100000001": {
    id: "DCC001",
    name: "Saurabh Aggarwal",
    type: "DCC",
    company: "DELHI ELECTRONICS HUB",
    phone: "9811100222",
    email: "s.aggarwal@hub.com",
    address: "B-12, Okhla Phase III, New Delhi",
    escalation: {
      ase: { name: "Amit Kumar", phone: "9822233344", email: "a.kumar@dishtv.in" },
      csm: { name: "Vikram Singh", phone: "9833344455", email: "v.singh@dishtv.in" },
      opsManager: { name: "Rajesh Khanna", phone: "9844455566", email: "r.khanna@dishtv.in" }
    }
  }
};

// ── Channel Master List ───────────────────────────────────────────────────
export const mockChannels: ChannelDetail[] = [
  { code: "101", name: "Star Plus", isHD: false, isHighSecurity: true, category: "GEC", requiresThreeSatellite: false },
  { code: "102", name: "Star Plus HD", isHD: true, isHighSecurity: true, category: "GEC", requiresThreeSatellite: false },
  { code: "201", name: "Star Sports 1", isHD: false, isHighSecurity: false, category: "Sports", requiresThreeSatellite: false },
  { code: "202", name: "Star Sports 1 HD", isHD: true, isHighSecurity: false, category: "Sports", requiresThreeSatellite: false },
  { code: "301", name: "HBO", isHD: false, isHighSecurity: true, category: "Movies", requiresThreeSatellite: true },
  { code: "401", name: "National Geographic", isHD: false, isHighSecurity: false, category: "Infotainment", requiresThreeSatellite: false }
];

// ── Geography Mock ────────────────────────────────────────────────────────
export const mockGeography: GeographyMaster[] = [
  {
    stateId: "1",
    stateName: "Delhi",
    districts: [
      {
        id: "D1",
        name: "South Delhi",
        cities: [
          { id: "C1", name: "Saket", areas: ["J-Block", "M-Block", "PVR Area"] },
          { id: "C2", name: "Malviya Nagar", areas: ["Khirki", "Main Market"] }
        ]
      }
    ]
  },
  {
    stateId: "2",
    stateName: "Maharashtra",
    districts: [
      {
        id: "D2",
        name: "Mumbai City",
        cities: [
          { id: "C3", name: "Andheri", areas: ["West", "East", "Lokhandwala"] },
          { id: "C4", name: "Bandra", areas: ["Linking Road", "Pali Hill"] }
        ]
      }
    ]
  }
];

export const mockWaiverReasons: WaiverReason[] = [
  { id: "1", name: "Goodwill Waiver" },
  { id: "2", name: "Technical Issue - No Signal" },
  { id: "3", name: "Wrong Package Charged" },
  { id: "4", name: "Late Fee Reversal" },
  { id: "5", name: "Retention Offer" }
];

export const mockWaiverRequests: WaiverRequest[] = [
  {
    id: "WAV001",
    vcNumber: "09100000001",
    smsId: "41200100",
    amount: 150,
    reasonId: "1",
    reasonName: "Goodwill Waiver",
    status: "APPROVED",
    requestedBy: "AGENT_001",
    requestedOn: new Date("2026-02-20"),
    remarks: "Subscriber was unable to use service for 3 days due to rain.",
    approvedBy: "MANAGER_DELHI",
    approvedOn: new Date("2026-02-21")
  }
];

export const mockPaymentReceipts: Record<string, PaymentReceipt[]> = {
  "09100000001": [
    {
      id: "RCP001",
      date: new Date("2026-03-25"),
      amount: 350,
      mode: "ONLINE",
      type: "CR",
      referenceNo: "PG_TXN_99881",
      status: "SUCCESS"
    },
    {
      id: "RCP002",
      date: new Date("2026-02-25"),
      amount: 350,
      mode: "CHEQUE",
      type: "CR",
      bank: "HDFC Bank",
      referenceNo: "CHQ_112233",
      status: "REALIZED"
    }
  ]
};

export const mockOutstandingBalances: Record<string, OutstandingBalance> = {
  "09100000001": {
    general: 0,
    installation: 0,
    serviceCall: 250,
    payLater: 0
  }
};
