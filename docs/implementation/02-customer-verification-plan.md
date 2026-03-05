# Module 02 — Customer Verification & Identity

**Next.js Implementation Plan**

This document outlines the architecture and implementation steps to replicate the legacy Customer Verification (KYC), Contact Updating, and Temp Deactivation workflows (from `02-customer-verification.md`) within the `prototype-customer-service` codebase using mock data.

---

## 1. Domain Layer Updates

### New Types (`src/domain/verification/VerificationTypes.ts`)

We need to model the verification state, the temporary deactivation requests, and standard auditing logs.

```typescript
export type KYCStatus = "PENDING" | "VERIFIED" | "FAILED" | "WOB"; // WOB = Write Off Block

export interface VerificationProfile {
  vcNumber: string;
  failedAttempts: number; // Tracks IsWOB2TimeCVFail
  kycStatus: KYCStatus;
  lastVerifiedOn?: Date;
  // Verification challenge answers
  verifiableData: {
    pinCode: string;
    lastRechargeAmount: number;
    activationDate: Date;
    motherName?: string;
  };
}

export interface TempDeactivationRequest {
  id: string;
  vcNumber: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "PENDING" | "ACTIVE" | "CANCELLED";
  isRamadanRequest: boolean; // Special business rule flag
}

export interface ServiceConsentLog {
  vcNumber: string;
  serviceRemoved: string;
  agentId: string;
  isConsentGiven: boolean;
  timestamp: Date;
}
```

### Updates to `Customer.ts`

- Ensure `email` and `mobile` fields are read/write conceptually by use cases.

---

## 2. Application Layer (Use Cases)

New use cases to orchestrate business rules:

1. **`VerifyCustomerUseCase`**:
   - Accepts answers to KYC questions.
   - Compares with `VerificationProfile.verifiableData`.
   - If fail: increments `failedAttempts`. If `failedAttempts >= 2`, sets `kycStatus` to `WOB` (Write Off Block).
   - If success: sets `kycStatus` to `VERIFIED` and logs `InsertCustomerVerificationEntityDetail`.
2. **`RequestTempDeactivationUseCase`**:
   - Validates dates (must be within minimum/maximum suspension windows).
   - Flags `isRamadanRequest` if applicable.
   - Saves to repository.
3. **`UpdateContactDetailsUseCase`**:
   - Accepts new email/mobile.
   - **Business Rule**: Checks global repository to ensure email/mobile are not already registered to another `smsId` (`IsEmailExistsWithSubscriber` equivalent).
4. **`LogServiceRemovalConsentUseCase`**:
   - Replicates `save_No_Consent_Service_log` for compliance tracking.

---

## 3. Infrastructure Layer (Mock Data & Repositories)

### `MockVerificationRepository.ts`

Creates an in-memory store for:

- `VerificationProfile` maps (indexed by VC No).
- `TempDeactivationRequest` lists.
- `ServiceConsentLog` lists.

### Updates to `customerMock.ts`

- Populate initial `VerificationProfile` mock data for `JAFFER RESHT`, `RAHUL SHARMA`, and `PRIYA MENON`.
- e.g., Set Rahul Sharma's `failedAttempts` to 1, to test the WOB transition on the next failure.
- Ensure the Mock Repository validates email uniqueness against `mockEmailIndex`.

---

## 4. Presentation Layer (UI Components)

We will build the following UI components to surface these flows:

### 1. `VerificationModal.tsx`

- **Trigger**: Opening an action that requires KYC (e.g., "Change Package" or ticking a required checkbox).
- **UI**: A form asking the agent to verify 2-3 random data points (e.g., "What is the Pin Code?", "Last recharge amount?").
- **State**: If the use case returns "WOB", the UI immediately changes to a locked state, informing the agent that physical verification is now required.

### 2. `ContactUpdatePanel.tsx`

- **Location**: Inside the `SubscriberCard` or a dedicated tab.
- **UI**: Inline editing for Mobile and Email.
- **Validation**: Shows inline error "Email already exists on another account" if the mock repository rejects the uniqueness check.

### 3. `TempDeactivationForm.tsx`

- **Location**: "Action Modals" dropdown or "Services" tab.
- **UI**: Date picker for Start/End date. Calculates total days.
- **Validation**: Rejects if days < Minimum Limit. Features a "Ramadan Opt-In" toggle to simulate the special pipeline.

---

## 5. Implementation Phases Tracker

- [x] **Phase 1**: Domain Models (`VerificationTypes.ts`) + Mock Data (`verificationMock.ts`)
- [x] **Phase 2**: Infrastructure (`MockVerificationRepository.ts` with email/mobile uniqueness logic)
- [x] **Phase 3**: Application Use Cases (`VerifyCustomer.ts`, `RequestTempDeactivation.ts`, `UpdateContactDetails.ts`, `LogServiceRemovalConsent.ts`)
- [x] **Phase 4**: API Routes (`/api/verification/verify`, `/api/verification/deactivate`, `/api/verification/contact`)
- [x] **Phase 5**: UI Components (`VerificationModal.tsx`, `TempDeactivationForm.tsx`, `ContactUpdatePanel.tsx`)
- [x] **Phase 6**: Wiring — `ActionModals.tsx` gated behind KYC, `SubscriberCard.tsx` with inline contact editing, `SearchCustomer.ts` appends KYC status on load
- [x] **Phase 7**: TypeScript compilation verified (`tsc --noEmit` passes)
