import { KittyAlacarte, SummerTicket, PromoAlacarte, FestiveOffer, AlacarteOptOutInfo } from "../../domain/package/AlacarteTypes";

export const mockKittyAlacarte: Record<string, { balance: number; options: KittyAlacarte[] }> = {
  "41200100": { // Rahul Sharma
    balance: 500,
    options: [
      {
        packageId: "K101",
        packageName: "Zee Cinema Alacarte (Kitty)",
        price: 15,
        channelId: "501",
        validUntil: new Date("2026-12-31"),
        isRedeemable: true,
        pointsRequired: 100
      },
      {
        packageId: "K102",
        packageName: "Star Gold Alacarte (Kitty)",
        price: 20,
        channelId: "502",
        validUntil: new Date("2026-12-31"),
        isRedeemable: true,
        pointsRequired: 150
      }
    ]
  }
};

export const mockSummerTicket: Record<string, SummerTicket[]> = {
  "41200100": [
    {
      packageId: "ST2026",
      name: "IPL 2026 Summer Ticket",
      status: "AVAILABLE",
      lockInDays: 90,
      monthlyPrice: 199,
      endDate: new Date("2026-06-30")
    }
  ]
};

export const mockPromoAlacarte: Record<string, PromoAlacarte[]> = {
  "33659209": [ // Jaffer Resht
    {
      id: "P001",
      orderId: "ORD_WIN_992",
      name: "HBO Winback 30 Days",
      billingStartDate: new Date("2025-01-01"),
      billingUptoDate: new Date("2025-01-31"),
      amount: 0,
      type: "WINBACK",
      status: "EXPIRED"
    }
  ],
  "41200100": [
    {
      id: "P002",
      orderId: "ORD_TRIAL_112",
      name: "Sony Pix Free Trial",
      billingStartDate: new Date("2026-03-01"),
      billingUptoDate: new Date("2026-03-15"),
      amount: 0,
      type: "TRIAL",
      status: "ACTIVE"
    }
  ]
};

export const mockFestiveOffers: FestiveOffer[] = [
  {
    id: "FO_DIWALI_26",
    name: "Diwali Dhamaka 2026",
    schemeId: "SCH_ANNUAL_GOLD",
    benefitDescription: "Switch to Annual Gold and get 2 months extra + Free HD Add-on",
    validFrom: new Date("2026-10-01"),
    validTo: new Date("2026-11-15")
  }
];

export const mockAlacarteOptOut: Record<string, AlacarteOptOutInfo[]> = {
  "41200100": [
    {
      smsId: "41200100",
      packageId: "AL_101",
      packageName: "Colors TV",
      activationLastDate: "2026-02-01",
      activeDays: 34,
      remainingDays: 26
    }
  ]
};
