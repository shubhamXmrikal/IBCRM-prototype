export type AddOnStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING_ACTIVATION"
  | "PENDING_DEACTIVATION";

export interface Package {
  id: string;
  name: string; // e.g., 'Super Family'
  type: "BASE" | "ALACARTE" | "ADDON";
  price: number;
  currency: string;
  billingCycle: "MONTHLY" | "YEARLY" | "LIFETIME";
}

export interface Subscription {
  id: string;
  customerId: string; // SMSID
  package: Package;
  status: AddOnStatus;
  startDate: Date;
  endDate?: Date; // If applicable
  autoRenew: boolean;
}
