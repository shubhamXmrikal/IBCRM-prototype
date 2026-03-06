# Core Customer Service — Sub-Group 9: MOD & PPV

**Implementation Status Tracking**

This document tracks the porting of the Movies On Demand (MOD) and Pay-Per-View (PPV) methods from the legacy `ibcrm` system into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `GetMODRequestList` — Order History
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetMODCatalogue.ts` and `MODDashboardTab.tsx`.
- **Notes**: Displays currently authorized movies and upcoming PPV events. Emulates `usp_CUSTOMERSERVICE_GetMODRequestList`.

### 2. `OrderMod` — Core Ordering Engine
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/OrderMovie.ts` and `MovieOrderModal.tsx`.
- **Notes**: Full validation sequence (Duplicate Check -> Balance Check) before ordering. Emulates `usp_MOD_OrderMOD`.

### 3. `InsertResendMODRequest` — CAS Signal Push
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/ResendMovieAuthorization.ts`.
- **Notes**: Simulates re-pushing authorization to CONAX. Emulates `usp_CustomerService_ReAuthorizedMODRequest`.

### 4. `ModFreeKitty` — Movie Loyalty
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/infrastructure/mockData/modMock.ts` and `MODDashboardTab.tsx`.
- **Notes**: Displays "Free Movies Remaining" banner and allows redemption in the order wizard. Emulates `usp_CustomerService_GetModFreeKittyUsage`.

### 5. `CheckRequestIsAlreadySubmited` — Duplicate Guard
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockModRepository.validateOrder`.
- **Notes**: Blocks ordering of movies that are already active on the STB.

---

## Data Flow Summary

The new **Movies & PPV 🎬** tab in `UnifiedTabs.tsx` provides:
1. **Kitty Banner**: Real-time view of free movie entitlements.
2. **Movie Grid**: Interactive catalogue for browsing and ordering.
3. **Authorization Panel**: Management of active movie signals with "Resend Signal" functionality.
