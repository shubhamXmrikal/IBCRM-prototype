export type PackageCategory = "BASE" | "ALACARTE" | "ADDON" | "VAS" | "PROMO";
export type SubscriptionStatus = "ACTIVE" | "PENDING_ACTIVATION" | "PENDING_DEACTIVATION" | "INACTIVE";

export interface PackageItem {
  id: string;
  name: string;
  category: PackageCategory;
  price: number;
  isHD: boolean;
  requiresConsent: boolean; // For GetConsentAlaCarteList rules
}

export interface SubscriberSubscription {
  id: string;
  vcNumber: string;
  packageId: string;
  status: SubscriptionStatus;
  activationDate: Date;
  scheduledOptOutDate?: Date; // For advance requests / deactivation gates
  isFixedPayterm: boolean;
}

export interface AdvancePackageRequest {
  id: string;
  vcNumber: string;
  packageId: string;
  requestType: "OPT_IN" | "OPT_OUT";
  scheduledDate: Date;
  status: "PENDING" | "COMPLETED";
}

export interface RollbackHistory {
  id: string;
  vcNumber: string;
  previousPackageId: string;
  changedDate: Date;
  canRollback: boolean; // Rule: Only 1 rollback per cycle
}