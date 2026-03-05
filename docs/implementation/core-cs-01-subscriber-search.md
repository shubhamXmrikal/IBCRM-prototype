# Core Customer Service — Sub-Group 1: Subscriber Search & Identification

**Implementation Status Tracking**

This document tracks the porting of the 13 core subscriber search methods from the legacy IB_PORTAL (`ibcrm` WebForms) codebase into the Next.js `prototype-customer-service` project.

---

## Connection Routing — The `IsUsedZTConn` Flag

- [ ] **Implementation Status**: Partially modeled. We are aware of the routing split (ZTConnReadOnly vs Primary DB) but since the Next.js prototype uses an in-memory `MockCustomerRepository`, connection routing is abstracted away. In a real backend (e.g., Node.js with SQL Server), this would be handled by a DB connection factory middleware evaluating the agent's IP.

---

## Methods

### 1. `GetSubscriberInfoDetails` — Primary Subscriber Lookup

- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/SearchCustomer.ts` and `src/infrastructure/apiClients/MockCustomerRepository.ts` (`getBySearchType` method).
- **Notes**: Supports VC, SMSID, MOBILE, STB, EMAIL, and RMN search types. Returns the full 80+ field `Customer` domain model. Emulates `usp_CUSTOMERSERVICE_GetSubscriberInfo_Final`.

### 2. `GetSubscriberInfo` — Legacy Lookup by SMSID

- [x] **Implementation Status**: **DONE** (Implicitly).
- **Where**: `MockCustomerRepository.ts` (`getBySearchType("SMSID", ...)`).
- **Notes**: The legacy method returned a subset of fields without telephony context. Our new architecture uses the unified model for all SMSID lookups, simplifying the API surface.

### 3. `ValidateCLIMobileNo` — Internal Corporate Caller Check

- [ ] **Implementation Status**: **PENDING**.
- **Notes**: Needs `usp_CustomerCare_ValidateInternalCorporateUser` emulation. Currently, our mock data includes `CallerMobType` mapping (e.g., RMN), but the distinct Employee verification flow is not yet modelled in the Use Case.

### 4. `GetSubDetailsBySearchText` — Mobile/Email Multi-Match Search

- [x] **Implementation Status**: **DONE**.
- **Where**: `MockCustomerRepository.getMultiMatchCandidates()` and `src/presentation/components/DisambiguationModal/DisambiguationModal.tsx`.
- **Notes**: Triggers automatically when a Mobile or Email search matches >1 account. Returns `SearchSubsDetailsList` equivalent for UI disambiguation. Emulates `usp_CUSTOMERSERVICE_SearchSubsDetailByMobnEmail`.

### 5. `GetSMSID` — Resolve Mobile Number to VC/SMSID List

- [x] **Implementation Status**: **DONE** (Implicitly).
- **Where**: `mockMobileIndex` in `customerMock.ts`.
- **Notes**: Legacy used this for renewal flows specifically (`usp_RENEWAL_GetVCNoByMobile`). Our mock repository uses the mobile index to resolve IDs which satisfies this requirement natively.

### 6. `GetSMSIDByEmail` — Resolve Email to VC/SMSID List

- [x] **Implementation Status**: **DONE** (Implicitly).
- **Where**: `mockEmailIndex` in `customerMock.ts`.
- **Notes**: Similar to method 5, handled natively by the mock index.

### 7. `GetChildParnetDetails` — Multi-TV Parent/Child Resolution

- [x] **Implementation Status**: **DONE**.
- **Where**: `MockCustomerRepository.getGoMultiConnections()` and `src/presentation/components/GoMultiPanel/GoMultiPanel.tsx`.
- **Notes**: Legacy returned two result sets (parents & children). We merged this into a `GoMultiResult` object. The UI successfully renders the hierarchy tree. Emulates `usp_CustomerService_GetParentChildDetails`.

### 8. `InsertLastVCDetails` — Agent Session VC Tracking

- [x] **Implementation Status**: **DONE**.
- **Where**: `MockCustomerRepository.insertSessionAudit()`.
- **Notes**: Silently fires from `SearchCustomerUseCase` on every successful single-match load. Emulates `usp_CustomerService_InsertVCNo`.

### 9. `GetLastVCNo` — Retrieve Agent's Last Loaded Account

- [x] **Implementation Status**: **DONE**.
- **Where**: `MockCustomerRepository.getLastVCNo()`.
- **Notes**: Emulates `usp_CustomerService_GetLastVCNo` for "resume last call" functionality.

### 10. `GetVCDetails` — STB/VC Location via Material Movement

- [ ] **Implementation Status**: **PENDING**.
- **Notes**: This crosses module boundaries into `MaterialMovement`. To be implemented in later phases when hardware inventory logic is built.

### 11. `GetEmployeeId` — Fetch Employee ID from SMSID

- [ ] **Implementation Status**: **PENDING**.
- **Notes**: Belongs with the corporate/employee implementation (Method 3).

### 12. `GETFmrInfo` — FMR (Financial Monthly Recurring) Value Lookup

- [ ] **Implementation Status**: **PARTIALLY DONE**.
- **Where**: `fmrValue` is mapped in `Customer.ts` (financial block).
- **Notes**: The standalone method `USP_GetSubscriberFMRValue` (for proposing new package costs) is not yet implemented. Currently only static mock FMR is provided.

### 13. `GetIsSMRTSoftwareUpgraded` — SMRT Stick Software Version Check

- [ ] **Implementation Status**: **PENDING**.
- **Notes**: Telemetry cross-check logic for SMRT stick firmware is not yet ported.

---

## Data Flow Summary Integration

The data flow established in `page.tsx` now successfully mirrors the legacy `Validate -> Get -> (Disambiguate OR GoMulti) -> Audit` sequence.
