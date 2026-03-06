# Core Customer Service — Sub-Group 7: Payment, Grace & Waiver

**Implementation Plan (Next.js Prototype)**

This document outlines the strategy for porting the financial operations methods from the legacy `ibcrm` system into the `prototype-customer-service` project.

---

## 1. Domain Layer Updates (`src/domain/package/`)

### New Financial & Waiver Types
```typescript
export interface WaiverRequest {
  id: string;
  vcNumber: string;
  smsId: string;
  amount: number;
  reasonId: string;
  reasonName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedBy: string;
  requestedOn: Date;
  remarks: string;
  approvedBy?: string;
  approvedOn?: Date;
}

export interface WaiverReason {
  id: string;
  name: string;
}

export interface PaymentReceipt {
  id: string;
  date: Date;
  amount: number;
  mode: "CASH" | "CHEQUE" | "ONLINE" | "UPI";
  type: "CR" | "DR";
  bank?: string;
  referenceNo: string;
  status: string;
}

export interface GraceChargeInfo {
  applies: boolean;
  totalAmount: number;
  preTaxAmount: number;
  taxAmount: number;
}

export interface OutstandingBalance {
  general: number;
  installation: number;
  serviceCall: number;
  payLater: number;
}
```

---

## 2. Application Layer (Use Cases)

1.  **`CheckGraceChargeUseCase`**:
    - Emulates `GraceChargeCheckMonthly`.
    - Calculates penalties for lapsed accounts with GST breakdown.
2.  **`ApplyWaiverUseCase`**:
    - Emulates `InsertWaiverAmountDetails`.
    - Validates eligibility (quota checks) before creating a request.
3.  **`GetWaiverWorkflowUseCase`**:
    - Emulates `GetWaiverDetailsForApproval` and `ApprovalRejectRequestForWaiverAmount`.
    - Handles the lifecycle of a waiver from request to approval.
4.  **`GetPaymentHistoryUseCase`**:
    - Emulates `GetPaymentDetails` and `GetRechargeDetails`.
    - Merges gateway logs with physical receipt history.
5.  **`ValidatePaymentTransferUseCase`**:
    - Emulates `ValidatePaymentTransfer`.
    - Cross-checks VC pairs and cheque/amount data for move-money requests.

---

## 3. Infrastructure Layer (Mock Data)

### `MockFinancialRepository.ts` (Expanded)
- Seed **Waiver Reasons** master data.
- Seed **Payment History** for Rahul Sharma.
- Implement **Waiver Quota** logic (e.g., maximum 2 waivers per month per agent).

---

## 4. Presentation Layer (UI Components)

1.  **`WaiverRequestModal.tsx`**:
    - Form to select reason, amount, and enter remarks.
    - Real-time eligibility check indicator.
2.  **`PaymentHistoryTab.tsx`**:
    - Filterable grid of all recharges, physical receipts, and transfers.
3.  **`OutstandingBalanceSummary.tsx`**:
    - High-visibility widget in the Billing tab showing different OS components.
4.  **`WaiverApprovalQueue.tsx`**:
    - A specialized view for supervisors to batch-approve pending requests.

---

## 5. Implementation Status Tracking

- [x] **Phase 1**: Domain Models (Waiver & Receipt Types).
- [x] **Phase 2**: Mock Repositories (Waiver reasons & Payment logs).
- [x] **Phase 3**: Use Cases (Grace Check, Waiver Request, Transfer Validation).
- [x] **Phase 4**: API Routes (`/api/finance/waivers`, `/api/finance/payments`, `/api/finance/grace-check`).
- [x] **Phase 5**: UI Components (Waiver Form, Payment List).
- [x] **Phase 6**: Wiring — Integrate into the "Billing & SOA" tab.
