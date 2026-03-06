# Core Customer Service — Sub-Group 2: Call Handling & History

**Next.js Implementation Plan**

This document outlines the architecture and implementation steps to replicate the legacy Call Handling (Message Tree), Outbound Campaign History, and Telephony closure logic within the `prototype-customer-service` codebase.

---

## 1. Domain Layer Updates

### New Types (`src/domain/call/CallHandlingTypes.ts`)

We need to model the hierarchical call tree and the closure requirements.

```typescript
export interface CallCategoryNode {
  id: string;
  label: string;
  parentId?: string;
  isLeaf: boolean;
  legacyValue?: string; // Maps to CategoryMaster.xml <value>
  isCallDropCategory: boolean; // Triggers Module 11 Callback logic
}

export interface CallClosureRequest {
  vcNumber: string;
  agentId: string;
  categoryId: string; // Must be a leaf node
  remarks: string; // Typed as "ramarks" conceptually for legacy mapping
  interactionType: "INBOUND" | "OUTBOUND";
  isResolved: boolean;
}

export interface OutboundCampaignEntry {
  id: string;
  vcNumber: string;
  campaignName: string;
  callDate: Date;
  status: string;
  agentName: string;
  feedback: string;
}
```

---

## 2. Application Layer (Use Cases)

1.  **`GetCallTreeUseCase`**:
    *   Parses the flattened keys in `CategoryMaster.xml` into a 4-level hierarchical structure.
    *   Example: `E16_4_Insufficient_Slide4...` becomes `E16` -> `Insufficient` -> `Slide4` -> `...`.
2.  **`SubmitCallClosureUseCase`**:
    *   **Business Rule**: Validates that the selected `categoryId` is a leaf node.
    *   **Business Rule**: If `isCallDropCategory` is true, triggers automatic closure and schedules a callback (Module 11 integration simulation).
    *   Saves interaction to the history repository.
3.  **`GetUnifiedHistoryUseCase`**:
    *   Merges traditional Inbound interactions with Campaign/Outbound history (simulating `OutBoundConn` database access).
    *   Ensures asynchronous/independent loading per the `ux-benchmarks.md`.

---

## 3. Infrastructure Layer (Mock Data & Repositories)

### `MockCallRepository.ts`

*   **XML Parsing**: Logic to read `ibcrm/CategoryMaster.xml` and reconstruct the tree.
*   **Campaign Store**: In-memory storage for outbound call history.
*   **Audit Logging**: Simulates `usp_CustomerService_InsertCallTagging`.

### Updates to `interactionMock.ts`

*   Seed `mockOutboundCampaigns` for Jaffer and Rahul.
*   Preserve legacy database typos: `ramarks` and `Catgory`.

---

## 4. Presentation Layer (UI Components)

### 1. `CallTaggingPanel.tsx`

*   **Location**: Dedicated tab or sidebar expansion.
*   **UI**: 4 cascaded dropdowns or a searchable tree-select.
*   **Interaction**: Selecting a leaf node enables the "Close Call" button.

### 2. `HistoryTimeline.tsx` (Enhancement)

*   Add "Campaign" filters to the existing timeline.
*   Include distinct icons for Outbound vs Inbound.

### 3. `Module11CallbackAlert.tsx`

*   Triggered when a "Call Drop" category is selected.
*   Shows a confirmation that a callback has been scheduled automatically.

---

## 5. Implementation Phases Tracker

- [x] **Phase 1**: Domain Models (`CallHandlingTypes.ts`) + XML Parser Utility.
- [x] **Phase 2**: Infrastructure (`MockCallRepository.ts`) + Outbound Campaign mock data.
- [x] **Phase 3**: Application Use Cases (`GetCallTree.ts`, `SubmitCallClosure.ts`, `GetUnifiedHistory.ts`).
- [x] **Phase 4**: API Routes (`/api/calls/categories`, `/api/calls/close`, `/api/calls/history`).
- [x] **Phase 5**: UI Components (`CallTaggingPanel.tsx`, Enhanced `HistoryTimeline.tsx`).
- [x] **Phase 6**: Wiring — Integrate closure logic into the main 360 flow.
- [x] **Phase 7**: Validation — Verify "Leaf Node Mandatory" rule and `IsCallDropCategory` triggers.
