export interface VIPStatus {
  isVIP: boolean;
  isEligible: boolean;
  eligibilityReason?: string;
  enrolledOn?: Date;
}

export interface LoyaltyWallet {
  dthPoints: number;
  movieCredits: number;
  dishFlixAmount: number;
  expiryDate: Date;
}

export interface LoyaltyTransaction {
  id: string;
  date: Date;
  points: number;
  description: string;
  type: "EARNED" | "SPENT";
}

export interface VIPBenefit {
  id: string;
  name: string;
  description: string;
  icon: string;
}
