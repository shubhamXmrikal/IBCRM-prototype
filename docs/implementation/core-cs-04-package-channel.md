# Core Customer Service — Sub-Group 4: Package & Channel Display

**Implementation Plan (Next.js Prototype)**

This document outlines the strategy for porting the 22 read-only display methods from the legacy `ibcrm` system into the `prototype-customer-service` project.

---

## 1. Domain Layer Updates (`src/domain/package/`)

### New Financial & Hierarchy Types
```typescript
export interface SOAHeader {
  balance: number;
  monthlyRecharge: number;
  bonusPoints: number;
  switchOffDate: Date;
  gstIn?: string;
  packNamePrice: string;
}

export interface SOATransaction {
  id: string;
  date: Date;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  referenceNo: string;
}

export interface ServiceEntity {
  id: string;
  name: string;
  type: "DCC" | "DEALER" | "DISTRIBUTOR";
  company: string;
  phone: string;
  email: string;
  escalation: {
    ase?: string;
    csm?: string;
    dsm?: string;
    opsManager?: string;
  };
}

export interface ChannelDetail {
  code: string;
  name: string;
  isHD: boolean;
  isHighSecurity: boolean;
  category: string;
}
```

---

## 2. Application Layer (Use Cases)

1.  **`GetStatementOfAccountUseCase`**: 
    - Emulates `GetSOASubsDetails` and `GetSOADetails`. 
    - Handles historical routing logic (simulating `INREPORTING` vs `ZTConnReadOnly`).
2.  **`GetChannelEntitlementsUseCase`**: 
    - Emulates `GetChannelList(SmsID)`.
    - Consolidates channels from base pack, add-ons, and ORA shadow packs.
3.  **`GetServiceHierarchyUseCase`**: 
    - Emulates `GetHierarchyDetails` and `GetHierarchyDetailsByDccID`.
    - Returns the full escalation matrix for the assigned service area.
4.  **`GetGeographyMasterUseCase`**: 
    - Emulates `GetGeographyDeatilByState`.
    - Returns a tree structure for cascading dropdowns in the UI.

---

## 3. Infrastructure Layer (Mock Data)

### `MockFinancialRepository.ts`
- Seed historical transactions for **Rahul Sharma** (VC: `09100000001`).
- Simulate `WebConn` invoice storage for the "Resend Invoice" feature.

### `MockHierarchyRepository.ts`
- Seed the distribution tree for **Chopra Electronics** (Dealer).
- Include the ServiceCRM manager mappings.

---

## 4. Presentation Layer (UI Components)

1.  **`BillingAndSOATab.tsx`**: 
    - A revamped "Billing & SOA" tab.
    - Header with balance and "Resend Latest Invoice" button.
    - Transaction table with "Debit/Credit" styling.
2.  **`ChannelEntitlementModal.tsx`**: 
    - A searchable list visible from the "Package Tool".
    - Allows agents to answer: "Is [Channel Name] included in my pack?"
3.  **`ServiceHierarchyCard.tsx`**: 
    - A visual tree showing the subscriber's assigned service chain.
    - Visible under the "Service & Hardware" tab.

---

## 5. Implementation Status Tracking

- [x] **Phase 1**: Domain Models & Types.
- [x] **Phase 2**: Mock Repositories (SOA Transactions & Hierarchy).
- [x] **Phase 3**: Use Cases (SOA Retrieval & Hierarchy Resolution).
- [x] **Phase 4**: API Routes (`/api/finance/soa`, `/api/customer/hierarchy`, `/api/master/geography`).
- [x] **Phase 5**: UI Components (SOA Table, Hierarchy Tree, Channel Viewer).
- [x] **Phase 6**: Wiring — Integrate into `UnifiedTabs.tsx` ("Billing" and "Service" tabs).
