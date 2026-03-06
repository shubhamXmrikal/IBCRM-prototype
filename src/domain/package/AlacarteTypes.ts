export interface KittyAlacarte {
  packageId: string;
  packageName: string;
  price: number;
  channelId: string;
  validUntil: Date;
  isRedeemable: boolean;
  pointsRequired: number;
}

export interface SummerTicket {
  packageId: string;
  name: string;
  status: "OPTED_IN" | "OPTED_OUT" | "AVAILABLE";
  lockInDays: number;
  monthlyPrice: number;
  endDate?: Date;
}

export interface PromoAlacarte {
  id: string;
  orderId: string;
  name: string;
  billingStartDate: Date;
  billingUptoDate: Date;
  amount: number;
  type: "FREE" | "TRIAL" | "WINBACK";
  status: "ACTIVE" | "EXPIRED";
}

export interface FestiveOffer {
  id: string;
  name: string;
  schemeId: string;
  benefitDescription: string;
  validFrom: Date;
  validTo: Date;
}

export interface AlacarteOptOutInfo {
  smsId: string;
  packageId: string;
  packageName: string;
  activationLastDate: string;
  activeDays: number;
  remainingDays: number;
  optOutDate?: Date;
}
