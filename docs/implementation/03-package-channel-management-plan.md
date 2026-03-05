# Module 03 — Package & Channel Management

**Next.js Implementation Plan**

This document outlines the architecture and implementation steps to replicate the legacy Package & Channel Management workflows (from `03-package-channel-management.md`) within the `prototype-customer-service` codebase using Clean Architecture and mock data.

---

## 1. Domain Layer Updates

### New Types (`src/domain/package/PackageTypes.ts`)

We need to model packages, add-ons, subscriber agreements, and rollback history to encapsulate the core business rules.

```typescript
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
```

---

## 2. Application Layer (Use Cases)

New use cases to orchestrate package and channel business rules:

1. **`GetAvailablePackagesUseCase`**:
   - Replaces `GetSportAddonsForCustomer`, `GetVASAddonsForCustomer`, `GetfreepreviewPackage`.
   - **Business Rule**: Filters the complete catalogue against the subscriber's currently active packages (e.g., suppressing Sport channels if already active).
2. **`OptInPackageUseCase`**:
   - Replaces `ActivateFreeHDAddOns`, `InsertAddOnAdvanceRequestLog`, `SaveConsentAlaCarteDetails`.
   - Takes VC Number, Package ID, Scheduled Date, and Consent Flag.
   - If Scheduled Date is future, creates an `AdvancePackageRequest`.
   - If `requiresConsent` is true, validates that the Consent Flag is provided.
3. **`OptOutPackageUseCase`**:
   - Replaces `OptoutPackage`, `GetAlacarteOPtoutdateList`.
   - **Business Rule**: Validates the "Opt-out Date Gate" to ensure the request is within the allowable monthly window.
   - Schedules the deactivation or sets status to `PENDING_DEACTIVATION`.
4. **`RollbackPackageUseCase`**:
   - Replaces `GetChannalrollBackList`, `LastAgreementPackActivate`.
   - Checks `RollbackHistory` to ensure the subscriber hasn't exceeded the 1 rollback limit per billing cycle.
   - Reverts the current base pack to the `previousPackageId`.

---

## 3. Infrastructure Layer (Mock Data & Repositories)

### `MockPackageRepository.ts`

Creates an in-memory store for:
- A global catalogue of `PackageItem` records.
- `SubscriberSubscription` lists indexed by VC No.
- `AdvancePackageRequest` queues.
- `RollbackHistory` logs.

### Updates to `packageMock.ts` (New File)
- Seed standard packages: e.g., "South Sports Basic SD", "HD Family Pack", "7 HD Free Promotional", "HBO 15-Day Free Trial".
- Attach these subscriptions to our mock users (Jaffer, Rahul, Priya).
- Add a valid rollback history state to Rahul to demonstrate the Rollback feature.

---

## 4. Presentation Layer (UI Components)

We will build the following UI components to replace the bloated legacy "Add-On Pack" tab and its disparate popups:

### 1. `PackageToolBox.tsx` (Main Container)
- **Location**: Rendered within `UnifiedTabs.tsx` under "Package Tool".
- **UI**: A dual-pane interface showing "Currently Active" on the left and "Available Catalogue" on the right.

### 2. `CatalogueGrid.tsx`
- **UI**: Grid of available packages with filters for `ALACARTE`, `ADDON`, `VAS`, `PROMO`.
- Highlights promotional logic (e.g., "7 HD Channels Free").

### 3. `OptInModal.tsx` / `OptOutModal.tsx`
- **Trigger**: Clicking 'Activate' or 'Remove' on a package.
- **UI (Opt-in)**: Asks for Activation Date (supporting advance requests) and features a mandatory "Customer Verbal Consent" checkbox if the package requires it.
- **UI (Opt-out)**: Checks the Opt-Out Gate rule. If outside the window, shows a warning banner explaining the next available opt-out date.

### 4. `RollbackPanel.tsx`
- **Location**: A dedicated section within the Package Tool.
- **UI**: Shows the last package change. If eligible, provides a "Revert to Previous Package" button. Requires agent remarks.

---

## 5. Implementation Phases Tracker

- [x] **Phase 1**: Domain Models (`PackageTypes.ts`) + Mock Data (`packageMock.ts`)
- [x] **Phase 2**: Infrastructure (`MockPackageRepository.ts` with filtering, rollback limit, and advance request logic)
- [x] **Phase 3**: Application Use Cases (`GetAvailablePackages.ts`, `OptInPackage.ts`, `OptOutPackage.ts`, `RollbackPackage.ts`)
- [x] **Phase 4**: API Routes (`/api/packages/catalogue`, `/api/packages/active`, `/api/packages/opt-in`, `/api/packages/rollback`)
- [x] **Phase 5**: UI Components (`PackageToolBox.tsx`, `CatalogueGrid.tsx`, `OptInModal.tsx`, `RollbackPanel.tsx`)
- [x] **Phase 6**: Wiring — Integrate `PackageToolBox.tsx` into `UnifiedTabs.tsx`, ensuring it fetches data based on the currently loaded subscriber's VC Number.
- [x] **Phase 7**: TypeScript compilation and lint verification (`npm run build`).