import { PackageItem, SubscriberSubscription, RollbackHistory } from "../../domain/package/PackageTypes";

export const mockPackages: PackageItem[] = [
  { id: "PKG-001", name: "South Sports Basic SD", category: "BASE", price: 200, isHD: false, requiresConsent: false },
  { id: "PKG-002", name: "HD Family Pack", category: "BASE", price: 350, isHD: true, requiresConsent: false },
  { id: "PKG-003", name: "South Premium 4K HD", category: "BASE", price: 500, isHD: true, requiresConsent: false },
  { id: "PKG-004", name: "7 HD Channels Free", category: "PROMO", price: 0, isHD: true, requiresConsent: true },
  { id: "PKG-005", name: "HBO 15-Day Free Trial", category: "PROMO", price: 0, isHD: true, requiresConsent: false },
  { id: "PKG-006", name: "Star Sports Add-on", category: "ADDON", price: 75, isHD: false, requiresConsent: true },
  { id: "PKG-007", name: "English Movies A-la-carte", category: "ALACARTE", price: 45, isHD: false, requiresConsent: false },
  { id: "PKG-008", name: "Cricket Live VAS", category: "VAS", price: 30, isHD: false, requiresConsent: true },
];

export const mockSubscriptions: SubscriberSubscription[] = [
  // Jaffer's active packs
  { id: "SUB-101", vcNumber: "02563029393", packageId: "PKG-001", status: "ACTIVE", activationDate: new Date("2024-01-10"), isFixedPayterm: false },
  // Rahul's active packs
  { id: "SUB-102", vcNumber: "09100000001", packageId: "PKG-002", status: "ACTIVE", activationDate: new Date("2025-05-15"), isFixedPayterm: true },
  { id: "SUB-103", vcNumber: "09100000001", packageId: "PKG-006", status: "ACTIVE", activationDate: new Date("2025-06-01"), isFixedPayterm: false },
  // Priya's active packs
  { id: "SUB-104", vcNumber: "07800009999", packageId: "PKG-003", status: "ACTIVE", activationDate: new Date("2023-11-20"), isFixedPayterm: false },
  { id: "SUB-105", vcNumber: "07800009999", packageId: "PKG-004", status: "PENDING_DEACTIVATION", activationDate: new Date("2024-01-01"), scheduledOptOutDate: new Date("2026-04-01"), isFixedPayterm: false },
];

export const mockRollbackHistory: RollbackHistory[] = [
  // Rahul recently changed from PKG-001 to PKG-002 and is eligible for rollback
  { id: "RB-101", vcNumber: "09100000001", previousPackageId: "PKG-001", changedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), canRollback: true }
];