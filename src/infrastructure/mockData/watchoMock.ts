import { OTTPlan, WatchoSubscriber, WatchoCoupon } from "../../domain/watcho/WatchoTypes";

export const mockOTTPlans: OTTPlan[] = [
  {
    id: "PLAN_FLEXI",
    name: "Watcho Flexi",
    price: 99,
    description: "Access to 5 premium OTT apps",
    bundledApps: ["Zee5", "SonyLiv", "Discovery+", "Eros Now", "Hungama"],
    durationMonths: 1
  },
  {
    id: "PLAN_SUPER",
    name: "Watcho Super",
    price: 199,
    description: "Access to 10 premium OTT apps including Disney+",
    bundledApps: ["Disney+ Hotstar", "Zee5", "SonyLiv", "Lionsgate Play", "Discovery+", "Eros Now", "Hungama", "ShemarooMe", "EpicOn", "Klikk"],
    durationMonths: 1
  },
  {
    id: "PLAN_MAX",
    name: "Watcho MAX (Annual)",
    price: 1499,
    description: "Full year of 15+ premium OTT apps",
    bundledApps: ["Disney+ Hotstar", "Zee5", "SonyLiv", "Lionsgate Play", "Discovery+", "Eros Now", "Hungama", "ShemarooMe", "EpicOn", "Klikk", "Chaupal", "Oho Gujarati"],
    durationMonths: 12
  }
];

export const mockWatchoSubscribers: Record<string, WatchoSubscriber> = {
  "09100000001": { // Rahul Sharma
    ottSmsId: "W_88223344",
    dthSmsId: "41200100",
    vcNumber: "09100000001",
    status: "ACTIVE",
    isAutoRenewalEnabled: true,
    currentPlanId: "PLAN_SUPER",
    expiryDate: new Date("2026-04-10")
  },
  "07800009999": { // Priya Menon
    ottSmsId: "W_PROSPECT_11",
    dthSmsId: "55301890",
    vcNumber: "07800009999",
    status: "PROSPECT",
    isAutoRenewalEnabled: false
  }
};

export const mockWatchoCoupons: WatchoCoupon[] = [
  {
    id: "CPN_50",
    code: "WATCHO50",
    name: "New User Offer",
    description: "Flat ₹50 off on first subscription",
    discountAmount: 50,
    isRedeemed: false
  },
  {
    id: "CPN_FREE_TRIAL",
    code: "FREE30",
    name: "30 Day Trial",
    description: "100% discount for first month",
    discountAmount: 199,
    isRedeemed: false
  }
];
