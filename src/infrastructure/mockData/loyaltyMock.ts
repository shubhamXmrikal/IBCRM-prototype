import { VIPStatus, LoyaltyWallet, LoyaltyTransaction, VIPBenefit } from "../../domain/loyalty/LoyaltyTypes";

export const mockVIPStatus: Record<string, VIPStatus> = {
  "09100000001": { // Rahul Sharma
    isVIP: false,
    isEligible: true,
    eligibilityReason: "Qualified based on high recharge frequency."
  },
  "07800009999": { // Priya Menon
    isVIP: true,
    isEligible: true,
    enrolledOn: new Date("2025-06-01")
  },
  "02563029393": { // Jaffer Resht
    isVIP: false,
    isEligible: false,
    eligibilityReason: "Monthly FMR below threshold for premium tier."
  }
};

export const mockLoyaltyWallets: Record<string, LoyaltyWallet> = {
  "09100000001": {
    dthPoints: 1250,
    movieCredits: 3,
    dishFlixAmount: 0,
    expiryDate: new Date("2026-12-31")
  },
  "07800009999": {
    dthPoints: 5400,
    movieCredits: 8,
    dishFlixAmount: 500,
    expiryDate: new Date("2027-03-15")
  }
};

export const mockLoyaltyTransactions: Record<string, LoyaltyTransaction[]> = {
  "09100000001": [
    { id: "L1", date: new Date("2026-03-25"), points: 100, description: "Earned on Recharge (₹350)", type: "EARNED" },
    { id: "L2", date: new Date("2026-03-05"), points: -50, description: "Redeemed for Alacarte Channel", type: "SPENT" }
  ]
};

export const mockVIPBenefits: VIPBenefit[] = [
  { id: "B1", name: "Priority Support", description: "Direct access to senior tech agents.", icon: "🎧" },
  { id: "B2", name: "Free STB Swap", description: "Zero service charges for hardware replacement.", icon: "🔄" },
  { id: "B3", name: "Bonus Movie Credits", description: "2 free MOD movies every month.", icon: "🍿" }
];
