export interface RechargeValidation {
  vcNumber: string;
  smsId: string;
  isHD: boolean;
  status: string;
  statusName: string;
  nextRechargeDate: Date;
  isAmnestyAllowed: boolean;
  isPayLaterAllowed: boolean;
  isPkgMigAllowed: boolean;
  isLDPSubscriber: boolean;
  isWinBackSubs: boolean;
  isLCOSubs: boolean;
  subscriptionMode: "Prepaid" | "Postpaid";
  lastRechargeAmount?: number;
  lastRechargeDate?: Date;
  regimeFlag: number; // 0 = Old, 1 = New
}

export interface RechargeDueInfo {
  dueAmount: number;
  overdueDays: number;
  daysBeforeChurn: number;
}

export interface PostpaidLead {
  id: string;
  vcNumber: string;
  smsId: string;
  subscriberName: string;
  mobileNo: string;
  address: string;
  productType: "DISHFLIX" | "STANDARD";
  status: "PENDING" | "PROCESSED";
  createdOn: Date;
  merchantRequestId?: string;
}

export interface MigrationOption {
  packageId: string;
  packageName: string;
  price: number;
  isBestFit: boolean;
}
