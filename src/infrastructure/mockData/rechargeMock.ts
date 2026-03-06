import { RechargeValidation, RechargeDueInfo, MigrationOption, PostpaidLead } from "../../domain/recharge/RechargeTypes";

export const mockRechargeValidations: Record<string, RechargeValidation> = {
  "09100000001": { // Rahul Sharma
    vcNumber: "09100000001",
    smsId: "41200100",
    isHD: true,
    status: "ACTIVE",
    statusName: "Active",
    nextRechargeDate: new Date("2026-04-12"),
    isAmnestyAllowed: true,
    isPayLaterAllowed: false,
    isPkgMigAllowed: true,
    isLDPSubscriber: false,
    isWinBackSubs: false,
    isLCOSubs: false,
    subscriptionMode: "Prepaid",
    lastRechargeAmount: 350,
    lastRechargeDate: new Date("2026-03-25"),
    regimeFlag: 1
  },
  "07800009999": { // Priya Menon
    vcNumber: "07800009999",
    smsId: "55301890",
    isHD: true,
    status: "SUSPENDED",
    statusName: "Suspended",
    nextRechargeDate: new Date("2026-03-01"),
    isAmnestyAllowed: false,
    isPayLaterAllowed: true,
    isPkgMigAllowed: false,
    isLDPSubscriber: true,
    isWinBackSubs: false,
    isLCOSubs: false,
    subscriptionMode: "Prepaid",
    regimeFlag: 0
  }
};

export const mockRechargeDueInfo: Record<string, RechargeDueInfo> = {
  "41200100": { // Rahul Sharma
    dueAmount: 0,
    overdueDays: 0,
    daysBeforeChurn: 180
  },
  "55301890": { // Priya Menon
    dueAmount: 450.50,
    overdueDays: 5,
    daysBeforeChurn: 10
  }
};

export const mockMigrationOptions: MigrationOption[] = [
  { packageId: "MIG_01", packageName: "Super Value Annual HD", price: 3200, isBestFit: true },
  { packageId: "MIG_02", packageName: "Family Saver 12M", price: 2800, isBestFit: false }
];

export const mockPostpaidLeads: PostpaidLead[] = [];
