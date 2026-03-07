# Implementation Plan: Temporary Deactivation

Modernizing the legacy `CSTempDeActivation.aspx` into a high-performance, validated Next.js component.

## 1. Architectural Overview

- **Component**: `TempDeactivationModal.tsx`
- **Trigger**: "Temp Deactivation" button in the Sidebar/Bottom Toolbar.
- **Form Management**: React Hook Form with Zod schema validation.
- **UI Components**: 
    - `Calendar` (Date Range Picker)
    - `CheckboxGroup` (for the mandatory checklist)
    - `Alert` (for dynamic script/policy display)

## 2. Business Logic (Migrated from Legacy)

### 2.1 Validation Rules
- **Minimum Duration**: 5 Days (enforced via Zod).
- **Default Multiples**: 15-day increments are preferred (informational alert, not hard block unless policy requires).
- **Deactivation Start**: Minimum `Today + 1`, Maximum `Today + 15` (Advance request limit).
- **Reactivation Date**: Automatically calculated as `Deactivation To Date + 1`.
- **Eligibility**:
    - Blocked for "Pick by Channel" subscribers (`TOC: 10025`).
    - Blocked for "Airport" subscribers (`TOC: 10026`).

### 2.2 Mandatory Checklist (The "Confirm Box")
Subscribers must agree to the following before submission:
1. Understanding that the minimum period is 5 days.
2. Understanding that billing is suspended during this period.
3. Confirmation that no other active requests exist.

## 3. Implementation Steps

### Phase 1: Sidebar Integration
- Add a "Temp Deactivation" item to the `Sidebar` or `BottomToolbar`.
- Implement a state-controlled Modal to house the deactivation form.

### Phase 2: Form Development (`src/components/forms/TempDeactivationForm.tsx`)
- **VC Number**: Prefilled from global subscriber context (read-only).
- **Date Range Picker**:
    - `startDate` (Deactivation From)
    - `endDate` (Deactivation To)
- **Duration Display**: Auto-calculates `endDate - startDate` in real-time.
- **Remarks**: Textarea with character count (Max 250).

### Phase 3: Validation & Auto-Calculation
- Use `useEffect` to watch the `startDate` and `duration` fields.
- Logic: `setValue('endDate', addDays(startDate, duration))` and `setValue('reactivationDate', addDays(endDate, 1))`.

### Phase 4: API & Feedback
- Create a mock API endpoint: `/api/customer-service/temp-deactivation`.
- Implement success/error handling with a "Success Summary" screen showing the Request ID.

## 4. Modernized UI Enhancements

| Legacy Feature | Modern Approach |
| :--- | :--- |
| **Manual Calculation** | Real-time "Days Counter" as the user selects dates. |
| **Pop-up Checklist** | Integrated step-wise form validation (cannot click Submit until all checks are ticked). |
| **Blinking Text** | High-contrast "Policy Alert" banners with iconography. |
| **Iframe Modal** | Responsive React Portal modal with smooth transitions. |

## 5. Testing Strategy

- **Unit Tests**:
    - Verify `reactivationDate` is always `endDate + 1`.
    - Verify form submission is blocked if duration < 5 days.
- **Integration Tests**:
    - Ensure the "Submit" button remains disabled until the checklist is fully checked.
    - Verify the "Airport Subscriber" block logic.
