# Core Customer Service — Sub-Group 6: Complaint & Service Request Logging

**Implementation Plan (Next.js Prototype)**

This document outlines the architecture and implementation steps to replicate the legacy Complaint and Service Request workflows from the `ibcrm` system.

---

## 1. Domain Layer Updates (`src/domain/complaint/`)

### New Complaint & Service Types
We need to model the lifecycle of a ticket and the technical data required for field service.

```typescript
export type ComplaintStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED" | "REOPENED";

export interface Complaint {
  id: string;
  vcNumber: string;
  smsId: string;
  category: string;
  categoryId: string;
  status: ComplaintStatus;
  description: string;
  createdOn: Date;
  agentId: string;
  agentName: string;
  resolvedOn?: Date;
  resolvedBy?: string;
  priority: "NORMAL" | "HIGH";
  tatHours: number;
}

export interface ServiceRequest extends Complaint {
  stbNo: string;
  appointmentDate?: Date;
  appointmentSlotId?: string;
  servicerId?: string;
  servicerName?: string;
  address: {
    line1: string;
    city: string;
    pin: string;
  };
  agonyCount: number; // For escalation tracking
}

export interface AppointmentSlot {
  id: string;
  label: string; // e.g., "9 AM - 12 PM"
}
```

---

## 2. Application Layer (Use Cases)

1.  **`CreateComplaintUseCase`**:
    - Handles standard CRM complaints and complex Service Complaints.
    - Emulates `InsertServiceComplaint` and `InsertServiceComplaintDetails`.
2.  **`GetComplaintHistoryUseCase`**:
    - Aggregates Inbound CRM and Inbound Service calls.
    - Emulates `GetInboundCRMCalls` and `GetInboundServiceCalls`.
3.  **`UpdateComplaintUseCase`**:
    - Handles status transitions and resolution remarks.
    - Emulates `UpdateServiceComplaintDetails`.
4.  **`ValidateComplaintEligibilityUseCase`**:
    - Checks for duplicate complaints within 3 days.
    - Emulates `ComplaintMorethanTwoWithinThreeDays`.
5.  **`GetAppointmentSlotsUseCase`**:
    - Master data retrieval for technician scheduling.

---

## 3. Infrastructure Layer (Mock Data)

### `MockComplaintRepository.ts`
- Seed **Active Complaints** for Rahul Sharma (to test the "Duplicate Check").
- Seed **Historical Service Requests** for Jaffer Resht (STB replacement history).
- Implement the "Agony Count" increment logic for repeat callers.

---

## 4. Presentation Layer (UI Components)

1.  **`ComplaintHistoryTab.tsx`**: 
    - Replaces the legacy Inbound/Service tabs with a unified, filterable history grid.
    - Highlights TAT status and Priority.
2.  **`LogComplaintModal.tsx`**:
    - A multi-step form:
        - **Step 1**: Category selection (reusing Call Tree logic).
        - **Step 2**: Description & Priority.
        - **Step 3 (Optional)**: Technician appointment & Address verification (for technical categories).
3.  **`EscalationBadge.tsx`**:
    - Visual indicator shown if a subscriber has a high "Agony Count" or pending escalations.

---

## 5. Implementation Status Tracking

- [x] **Phase 1**: Domain Models & Specialized Types.
- [x] **Phase 2**: Infrastructure (Mock Store for Tickets & Appointments).
- [x] **Phase 3**: Use Cases (Creation, History, Validation).
- [x] **Phase 4**: API Routes (`/api/complaints`, `/api/master/appointment-slots`).
- [x] **Phase 5**: UI Components (Logging Form, History Grid).
- [x] **Phase 6**: Wiring — Integrate into `UnifiedTabs.tsx` and `CallTaggingPanel.tsx`.
