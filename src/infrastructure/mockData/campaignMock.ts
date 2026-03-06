import { FestiveOffer, FMRInfo, CampaignStatus, CashbackDetail } from "../../domain/package/CampaignTypes";

export const mockFestiveOffers: FestiveOffer[] = [
  {
    id: "FO_DIWALI_26",
    name: "Diwali Dhamaka HD",
    schemeId: "SCH_HD_PRO",
    offerAmount: 500,
    type: "ANNUAL",
    zoneId: "NORTH",
    stbType: "HD",
    packageName: "HD Family Pack",
    schemeType: "Annual"
  },
  {
    id: "FO_HOLI_26",
    name: "Holi Special",
    schemeId: "SCH_SD_BASE",
    offerAmount: 200,
    type: "MONTHLY",
    zoneId: "WEST",
    stbType: "SD",
    packageName: "South Sports Basic SD",
    schemeType: "Monthly"
  },
  {
    id: "FO_REACT_WIN",
    name: "Winback Bonus",
    schemeId: "SCH_WINBACK",
    offerAmount: 300,
    type: "REACTIVATION",
    zoneId: "ALL",
    stbType: "HD",
    packageName: "HD Family Pack",
    schemeType: "Monthly"
  }
];

export const mockFMRBenefits: Record<string, FMRInfo> = {
  "41200100": { // Rahul Sharma
    smsId: "41200100",
    packageName: "HD Family Pack",
    monthly: 50,
    threeMonth: 150,
    sixMonth: 350
  },
  "55301890": { // Priya Menon
    smsId: "55301890",
    packageName: "4K Premium Pack",
    monthly: 100,
    threeMonth: 300,
    sixMonth: 700
  }
};

export const mockCampaignStatuses: Record<string, CampaignStatus[]> = {
  "41200100": [
    {
      campaignId: "CWC_2026",
      name: "Cricket World Cup 2026 Engagement",
      bonusPoints: 250,
      milestonesReached: ["Registered", "Watched 5 Matches", "First Prediction Correct"],
      engagementLevel: "HIGH",
      smsId: "41200100",
      updatedOn: new Date()
    }
  ]
};

export const mockCashbackDetails: Record<string, CashbackDetail> = {
  "09100000001": { // Rahul Sharma
    isEligible: true,
    amount: 150,
    validFrom: new Date("2026-03-01"),
    validTo: new Date("2026-03-31"),
    remarks: "Cashback for Annual Renewal 2026",
    vcNumber: "09100000001"
  }
};
