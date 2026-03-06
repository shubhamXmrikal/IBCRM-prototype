export interface OTTPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  bundledApps: string[]; // e.g., ["Zee5", "SonyLiv", "Disney+"]
  durationMonths: number;
}

export interface WatchoSubscriber {
  ottSmsId: string;
  dthSmsId: string;
  vcNumber: string;
  status: "ACTIVE" | "INACTIVE" | "PROSPECT";
  isAutoRenewalEnabled: boolean;
  currentPlanId?: string;
  expiryDate?: Date;
}

export interface WatchoCoupon {
  id: string;
  code: string;
  name: string;
  description: string;
  discountAmount: number;
  isRedeemed: boolean;
}

export interface WatchoEligibility {
  isEligible: boolean;
  reason?: string;
}
