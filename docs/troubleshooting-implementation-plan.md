# Implementation Plan: Technical Troubleshooting Feature

## 1. Overview
This document outlines the step-by-step plan to replicate the legacy technical troubleshooting functionality (`CSTechnicalCallNew.aspx`) into the new Next.js prototype, following Clean Architecture principles.

## 2. Domain Layer (`src/domain/troubleshooting`)

### 2.1 Entities
- **TroubleshootingCategory**: Represents an error code or issue (e.g., 101, 301).
    - `id: string`
    - `name: string`
    - `isSMRT: boolean`
    - `statusColor: 'RED' | 'YELLOW' | 'GREEN' | 'WHITE' | 'BLUE'`
- **DiagnosticFlow**: A state machine representing the steps for a specific category.
- **AgentScript**: Verbatim text for the agent to read.

### 2.2 Logic
- **Eligibility Rules**: Logic to filter categories based on `STBBoxCategory` (iDTV, Android, etc.) and `SubscriberStatus`.
- **Alert Logic**: Determining if a `RainFadeAlert` or `VIPFOC` badge should be shown.

## 3. Application Layer (`src/application/troubleshooting`)

### 3.1 Use Cases
- **`GetTroubleshootingListUseCase`**:
    - Orchestrates fetching both standard and SMRT Stick calls.
    - Applies domain filtering rules.
- **`GetDiagnosticScriptUseCase`**:
    - Fetches the appropriate script for a category and step.
- **`LogTroubleshootingComplaintUseCase`**:
    - Generates the `CaseHistory` string based on the agent's path through the diagnostic flow.
    - Proxies the legacy `AddCustomerComplaint` logic.

## 4. Infrastructure Layer (`src/infrastructure`)

### 4.1 API Integration
- Create an API route `/api/customer-service/technical-calls` that calls the legacy stored procedures:
    - `usp_CustomerService_GetTechnicalCalls`
    - `usp_CustomerService_GetSMRTTechnicalCalls`
- Mapping legacy `value` column to `CategoryID` and `Name` to `CategoryName`.

### 4.2 Repositories
- `TroubleshootingRepository`: Fetches category definitions.
- `ScriptRepository`: Fetches scripts via `usp_CustomerService_GetTroubleShootingScript`.

## 5. Presentation Layer (`src/presentation`)

### 5.1 Components
- **TroubleshootingSidebar**:
    - Uses `GetTroubleshootingListUseCase` to render the list.
    - Handles toggling between Standard and SMRT views.
- **DiagnosticContainer**:
    - Replaces the legacy `iframePageBinding`.
    - Dynamically renders components based on the selected `CategoryID`.
- **DiagnosticView (Generic)**:
    - A base component for Yes/No style diagnostics (like `CSIDTVScrembledChannel.aspx`).
    - Props: `script`, `options[]`, `onSelect`.

### 5.2 State Management
- Use a `TroubleshootingContext` to store:
    - `currentCategory`
    - `currentStep`
    - `accumulatedCaseHistory`
    - `subscriberInfo` (VCNo, SMSID, STBModel)

## 6. Detailed Replication of Key Pages

### 6.1 `CSIDTVScrembledChannel.aspx` -> `ScrembledChannelDiagnostic.tsx`
- **Logic to Replicate**:
    - "Customer front of TV?" check.
    - ChipSet/CardNo matching logic via `CheckVCNoSTBNoDetails` WebMethod.
    - Automated "Repairing" call (`TroubleShootingSteps(1)`).
- **UI**: Text input for ChipSet/CardNo and a "Submit" button.

### 6.2 `CSCardRefreshErrorFinal.aspx` -> `CardRefreshDiagnostic.tsx`
- **Logic to Replicate**:
    - Timer integration for "Wait for 15 sec".
    - OTA command trigger for repeat callers.
    - Multi-step branching (Yes -> Next Step, No -> Technician Visit).

## 7. Execution Steps
1. **Scaffold Folder Structure**: Create `src/domain/troubleshooting`, `src/application/troubleshooting`, etc.
2. **Define Category Mock Data**: Create a JSON file with the categories identified in the analysis for immediate UI development.
3. **Build Sidebar Component**: Implement the sidebar with filtering logic.
4. **Implement Base Diagnostic Component**: Create a reusable template for troubleshooting steps.
5. **Convert Top 3 Diagnostic Pages**: Implement `ScrembledChannel`, `SignalNotFound`, and `NoAccountBalance`.
6. **Integrate Alerts**: Add the Rain Fade and VIP FOC notification logic to the main shell.
7. **End-to-End Test**: Verify that selecting a category updates the state and logs the correct case history.
