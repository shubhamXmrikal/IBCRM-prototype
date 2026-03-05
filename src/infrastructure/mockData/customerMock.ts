import { Customer } from "../../domain/customer/Customer";

// ── Mock Subscriber 1 — JAFFER RESHT (existing, now expanded) ──────────────
export const mockCustomer1: Customer = {
  id: "33659209",
  smsId: "33659209",
  vcNumber: "02563029393",
  name: "JAFFER RESHT",
  address: {
    line1: "chatroo",
    line2: "",
    landmark: "",
    pin: "182205",
    city: "DODA",
    district: "DODA",
    state: "JAMMU & KASHMIR",
  },
  contact: {
    rmn: "8768687682",
    mobile1: "8768687682",
    mobile2: "",
    mobile3: "",
    email: "Not Available",
    isRMNMob1: true,
    isRMNMob2: false,
    isRMNMob3: false,
    isDNCMob1: false,
    isDNCMob2: false,
    isDNCMob3: false,
  },
  technical: {
    stbNumber: "1946ADE23LT19444",
    stbModel: "STB Dongle",
    brandName: "DishTV",
    modelType: "HD",
    boxCategory: "DishNxt",
    warrantyStatus: "EXPIRED",
    vcLocation: "Dongle STB-HD",
    amcStartDate: "06/10/2019",
    amcExpireDate: "05/10/2020",
  },
  metrics: {
    status: "DEACTIVE",
    deDays: "3/1",
    activationDate: new Date("2019-10-06"),
    switchOffDate: new Date("2025-02-24"),
    rechargeDate: new Date("2025-02-21"),
    lastRechargeDate: new Date("2025-01-23"),
    customerType: "DTH INDIVIDUAL",
    customerTypeId: 1,
    paytermName: "MONTHLY",
    dealerName: "SHOP NO 12 DODA",
    zoneCode: "NORTH",
    schemeCode: "SD200",
    packageName: "South Sports Basic SD",
  },
  financial: {
    lastPaymentAmount: 442,
    lastPaymentMode: "CL",
    lastPaymentDate: new Date("2025-01-23"),
    dccSf: "LUCKY MUSIC CORNER & ELECTRONICS(DCC)",
    topCategory: "Renew Amount: 200",
    fmrValue: 200,
    isAutoRecharge: false,
    isPayLaterActive: false,
    isEligibleForPayLater: true,
  },
  callerContext: {
    callerMobileNo: "8768687682",
    callerMobType: "RMN",
    callerRelationship: "SELF",
    callerAuthority: "HIGH",
    verifierKey: "VK-33659209-A1B2",
    isCustomerVerified: true,
  },
  flags: {
    isVIPCustomer: false,
    isFTASubscriber: false,
    isDishPlusSubs: false,
    isHDSubs: true,
    isPostPaidCust: false,
    isCorporate: false,
    isContractualSubs: false,
    isPreferred: false,
    isDelightCust: false,
    isDishFlix: false,
    isCAS5: false,
    isBillable: true,
    isWOFlag: false,
  },
  isGoMulti: false,
  alerts: [
    {
      id: "msg1",
      message:
        "Sir/Ma'am, humare pass aapke liye ek khaas offer hai, jahan aap apne Dish connection ko 245 rupayee ya usse jyada se recharge karwa kar flat 20% ka cashback paayein.",
      type: "PROMO",
      createdAt: new Date(),
    },
    {
      id: "msg2",
      message: "This is CRICKET FLOATER SUBSCRIBER.",
      type: "INFO",
      createdAt: new Date(),
    },
    {
      id: "msg3",
      message: "This is NTO migrated subscriber",
      type: "INFO",
      createdAt: new Date(),
    },
    {
      id: "msg4",
      message: "This is a Dongle STB Subscriber",
      type: "WARNING",
      createdAt: new Date(),
    },
  ],
};

// ── Mock Subscriber 2 — RAHUL SHARMA (Active, GoMulti Parent) ──────────────
export const mockCustomer2: Customer = {
  id: "41200100",
  smsId: "41200100",
  vcNumber: "09100000001",
  name: "RAHUL SHARMA",
  address: {
    line1: "B-24, Saket Nagar",
    line2: "Near Metro Station",
    landmark: "Opposite HDFC Bank",
    pin: "110017",
    city: "NEW DELHI",
    district: "SOUTH DELHI",
    state: "DELHI",
  },
  contact: {
    rmn: "9999900001",
    mobile1: "9999900001",
    mobile2: "9999900002",
    email: "rahul.sharma@gmail.com",
    isRMNMob1: true,
    isRMNMob2: false,
    isRMNMob3: false,
    isDNCMob1: false,
    isDNCMob2: true,
    isDNCMob3: false,
  },
  technical: {
    stbNumber: "2101XYZ45PQ19001",
    stbModel: "HD Box",
    brandName: "DishTV",
    modelType: "HD",
    boxCategory: "Standard",
    warrantyStatus: "Y",
    instWarranty: "25/03/2026",
    vcLocation: "Standard STB-HD",
  },
  metrics: {
    status: "ACTIVE",
    deDays: "0/0",
    activationDate: new Date("2021-03-25"),
    switchOffDate: new Date("2026-03-25"),
    rechargeDate: new Date("2026-04-01"),
    lastRechargeDate: new Date("2026-02-25"),
    customerType: "DTH INDIVIDUAL",
    customerTypeId: 1,
    paytermName: "MONTHLY",
    dealerName: "DELHI MAIN DEALER",
    zoneCode: "NORTH",
    schemeCode: "HD350",
    packageName: "HD Family Pack",
  },
  financial: {
    lastPaymentAmount: 350,
    lastPaymentMode: "ONLINE",
    lastPaymentDate: new Date("2026-02-25"),
    dccSf: "DELHI ELECTRONICS HUB (DCC)",
    topCategory: "Renew Amount: 350",
    fmrValue: 350,
    isAutoRecharge: true,
    isPayLaterActive: false,
    isEligibleForPayLater: false,
  },
  callerContext: {
    callerMobileNo: "9999900001",
    callerMobType: "RMN",
    callerRelationship: "SELF",
    callerAuthority: "HIGH",
    verifierKey: "VK-41200100-C3D4",
    isCustomerVerified: true,
  },
  flags: {
    isVIPCustomer: false,
    isFTASubscriber: false,
    isDishPlusSubs: true,
    isHDSubs: true,
    isPostPaidCust: false,
    isCorporate: false,
    isContractualSubs: false,
    isPreferred: true,
    isDelightCust: true,
    isDishFlix: true,
    isCAS5: false,
    isBillable: true,
    isWOFlag: false,
  },
  isGoMulti: true, // This is a GoMulti parent
  alerts: [
    {
      id: "gomulti-alert",
      message:
        "This subscriber has GoMulti connections. See linked connections below.",
      type: "INFO",
      createdAt: new Date(),
    },
  ],
};

// ── Mock Subscriber 3 — PRIYA MENON (Suspended, STB-searchable, VIP) ──────
export const mockCustomer3: Customer = {
  id: "55301890",
  smsId: "55301890",
  vcNumber: "07800009999",
  name: "PRIYA MENON",
  address: {
    line1: "12, MG Road",
    line2: "Ernakulam",
    landmark: "Near KSRTC Bus Stand",
    pin: "682035",
    city: "KOCHI",
    district: "ERNAKULAM",
    state: "KERALA",
  },
  contact: {
    rmn: "9876543210",
    mobile1: "9876543210",
    email: "priya.menon@outlook.com",
    isRMNMob1: true,
    isRMNMob2: false,
    isRMNMob3: false,
    isDNCMob1: false,
    isDNCMob2: false,
    isDNCMob3: false,
  },
  technical: {
    stbNumber: "STB9876PRIYA0001",
    stbModel: "4K UHD Box",
    brandName: "DishTV",
    modelType: "4K",
    boxCategory: "DishNxt HD",
    warrantyStatus: "Y",
    instWarranty: "01/06/2025",
    vcLocation: "4K UHD STB",
  },
  metrics: {
    status: "SUSPENDED",
    deDays: "15/0",
    activationDate: new Date("2020-06-01"),
    switchOffDate: new Date("2026-01-15"),
    rechargeDate: new Date("2026-01-15"),
    lastRechargeDate: new Date("2025-12-15"),
    customerType: "DTH INDIVIDUAL",
    customerTypeId: 1,
    paytermName: "QUARTERLY",
    dealerName: "KERALA DISH HUB",
    zoneCode: "SOUTH",
    schemeCode: "4K500",
    packageName: "South Premium 4K HD",
  },
  financial: {
    lastPaymentAmount: 1500,
    lastPaymentMode: "ONLINE",
    lastPaymentDate: new Date("2025-12-15"),
    dccSf: "KOCHI ELECTRONICS WORLD (DCC)",
    topCategory: "Renew Amount: 1500",
    fmrValue: 500,
    isAutoRecharge: false,
    isPayLaterActive: true,
    isEligibleForPayLater: true,
  },
  callerContext: {
    callerMobileNo: "9876543210",
    callerMobType: "RMN",
    callerRelationship: "SELF",
    callerAuthority: "HIGH",
    verifierKey: "VK-55301890-E5F6",
    isCustomerVerified: true,
  },
  flags: {
    isVIPCustomer: true,
    isFTASubscriber: false,
    isDishPlusSubs: false,
    isHDSubs: true,
    isPostPaidCust: false,
    isCorporate: false,
    isContractualSubs: false,
    isPreferred: true,
    isDelightCust: true,
    isDishFlix: false,
    isCAS5: false,
    isBillable: true,
    isWOFlag: false,
  },
  isGoMulti: false,
  alerts: [
    {
      id: "vip-alert",
      message:
        "⭐ VIP Customer — handle with priority. Preferred quarterly recharge.",
      type: "WARNING",
      createdAt: new Date(),
    },
    {
      id: "suspended-alert",
      message: "Account suspended since 15/Jan/2026. Pay Later is active.",
      type: "INFO",
      createdAt: new Date(),
    },
  ],
};

// ── Multi-match scenario — mobile 9999900000 linked to TWO accounts ─────────
// mockCustomer1 and mockCustomer2 both have this registered as MOB2
// When agent searches by MOBILE: 9999900000, disambiguation list is shown
export const mockMultiMatchMobile = "9999900000";

// Convenience lookup map for the repository
export const mockSubscribers: Customer[] = [
  mockCustomer1,
  mockCustomer2,
  mockCustomer3,
];

// Additional mobile aliases for cross-referencing
export const mockMobileIndex: Record<string, string[]> = {
  "8768687682": ["02563029393"], // Jaffer — unique RMN
  "9999900001": ["09100000001"], // Rahul — unique RMN
  "9999900002": ["09100000001"], // Rahul — mob2
  "9876543210": ["07800009999"], // Priya — unique RMN
  "9999900000": ["02563029393", "09100000001"], // SHARED — triggers multi-match
};

export const mockEmailIndex: Record<string, string[]> = {
  "rahul.sharma@gmail.com": ["09100000001"],
  "priya.menon@outlook.com": ["07800009999"],
};

export const mockSTBIndex: Record<string, string> = {
  "1946ADE23LT19444": "02563029393",
  "2101XYZ45PQ19001": "09100000001",
  STB9876PRIYA0001: "07800009999",
};

export const mockSMSIDIndex: Record<string, string> = {
  "33659209": "02563029393",
  "41200100": "09100000001",
  "55301890": "07800009999",
};

// ── GoMulti connections for mockCustomer2 (Rahul Sharma) ───────────────────
import { GoMultiConnection } from "../../domain/customer/SubscriberSearchTypes";

export const mockGoMultiForRahul: {
  parentConnections: GoMultiConnection[];
  childConnections: GoMultiConnection[];
} = {
  parentConnections: [], // Rahul is the parent, no parent above him
  childConnections: [
    {
      smsId: "41200101",
      vcNumber: "09100000002",
      parentSmsId: "41200100",
      parentVcNo: "09100000001",
      status: "ACTIVE",
      subscriberName: "SITA SHARMA",
      modelType: "HD",
      boxType: "Standard",
    },
    {
      smsId: "41200102",
      vcNumber: "09100000003",
      parentSmsId: "41200100",
      parentVcNo: "09100000001",
      status: "DEACTIVE",
      subscriberName: "ROHIT SHARMA",
      modelType: "SD",
      boxType: "Standard",
    },
  ],
};

// ── Agent session audit log (in-memory, simulates usp_CustomerService_InsertVCNo) ──
export const sessionAuditLog: Array<{
  agentId: string;
  vcNumber: string;
  timestamp: Date;
}> = [];
