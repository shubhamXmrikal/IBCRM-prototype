# Core Customer Service — Sub-Group 8: Recharge & Package Migration

**Implementation Plan (Next.js Prototype)**

This document outlines the strategy for porting the recharge and migration methods from the legacy `ibcrm` system into the `prototype-customer-service` project.

---

## 1. Domain Layer Updates (`src/domain/recharge/`)

### New Recharge & Migration Types
```typescript
export interface RechargeValidation {
  vcNumber: string;
  smsId: string;
  isHD: boolean;
  status: string;
  nextRechargeDate: Date;
  isAmnestyAllowed: boolean;
  isPayLaterAllowed: boolean;
  isPkgMigAllowed: boolean;
  lastRechargeAmount?: number;
  lastRechargeDate?: Date;
}

export interface RechargeDueInfo {
  dueAmount: number;
  overdueDays: number;
  daysBeforeChurn: number;
}

export interface PostpaidLead {
  id: string;
  vcNumber: string;
  subscriberName: string;
  mobileNo: string;
  address: string;
  productType: "DISHFLIX" | "STANDARD";
  status: "PENDING" | "PROCESSED";
}
```

---

## 2. Application Layer (Use Cases)

1.  **`ValidateRechargeEligibilityUseCase`**:
    - Emulates `CheckVCSTBDetail`.
    - Returns the massive 45-flag state for the recharge UI.
2.  **`CalculateRechargeDueUseCase`**:
    - Emulates `GetRechargeDueAmount`.
    - Combines financial due amounts with churn-prevention timers.
3.  **`ConvertPrepaidToPostpaidUseCase`**:
    - Emulates `InsertLeadforProspectivePrepaidCustomer`.
    - Captures lead data for the conversion process.
4.  **`GetMigrationOptionsUseCase`**:
    - Emulates `GetRunningPackageListOldRegime`.
    - Provides "Best Fit" packages for legacy subscribers.

---

## 3. Infrastructure Layer (Mock Data)

### `MockRechargeRepository.ts`
- Seed **Hardware Flags** for mock users (e.g., mark Rahul as "Amnesty Allowed").
- Seed **Churn Timers** (e.g., mark Priya as "10 days before Churn").
- Implement the massive **CheckVCSTB** mapping logic.

---

## 4. Presentation Layer (UI Components)

1.  **`RechargeWorkflowPanel.tsx`**: 
    - A multi-step wizard:
        - **Step 1**: System Validation (VC/STB Check).
        - **Step 2**: Amount Due & Offer Check.
        - **Step 3**: Payment Execution (simulated).
2.  **`PostpaidConversionForm.tsx`**:
    - Lead capture form for account migration.
3.  **`ChurnAlertBanner.tsx`**:
    - High-visibility warning shown if `daysBeforeChurn` is low.

---

## 5. Implementation Status Tracking

- [x] **Phase 1**: Domain Models (Recharge & Migration Types).
- [x] **Phase 2**: Mock Repositories (Hardware validation & Lead store).
- [x] **Phase 3**: Use Cases (Eligibility, Due Calculation, Lead Creation).
- [x] **Phase 4**: API Routes (`/api/recharge/validate`, `/api/recharge/due`, `/api/recharge/postpaid-conversion`).
- [x] **Phase 5**: UI Components (Recharge Wizard, Churn Alerts).
- [x] **Phase 6**: Wiring — Integrate into the sidebar "Recharge Account" button and a new "Migration" tab.
