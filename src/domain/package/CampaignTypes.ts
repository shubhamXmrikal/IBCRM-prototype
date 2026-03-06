export interface FestiveOffer {
  id: string;
  name: string;
  schemeId: string;
  offerAmount: number;
  type: "ANNUAL" | "MONTHLY" | "REACTIVATION";
  zoneId: string;
  stbType: "SD" | "HD" | "4K";
  packageName: string;
  schemeType?: string;
}

export interface FMRInfo {
  monthly: number;
  threeMonth: number;
  sixMonth: number;
  packageName: string;
  smsId: string;
}

export interface CampaignStatus {
  campaignId: string;
  name: string;
  bonusPoints: number;
  milestonesReached: string[];
  engagementLevel: "LOW" | "MEDIUM" | "HIGH";
  smsId: string;
  updatedOn: Date;
}

export interface CashbackDetail {
  isEligible: boolean;
  amount: number;
  validFrom: Date;
  validTo: Date;
  remarks: string;
  vcNumber: string;
}

export interface FestiveEligibilityResult {
  isEligible: boolean;
  vasType?: string;
  cashback?: CashbackDetail;
}
