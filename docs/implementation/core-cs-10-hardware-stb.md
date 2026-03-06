# Core Customer Service — Sub-Group 10: Hardware & STB

**Implementation Status Tracking**

This document tracks the porting of the Set-Top Box (STB) lifecycle and hardware management methods from the legacy `ibcrm` system into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `CheckVCNoAndSTBNoParingDetails` — Pairing Validation
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/ValidateHardwarePairing.ts` and `HardwareManagementTab.tsx`.
- **Notes**: Verifies the cryptographic link between VC and STB. Emulates pairing status lookups.

### 2. `InsertSTBSwapActivation` — Orchestrated STB Swap
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/OrchestrateSTBSwap.ts` and `STBSwapWizard.tsx`.
- **Notes**: Full 5-step sequence including compatibility checks and material movement tracking. Emulates `usp_Utilities_SWAPSTB_InsertIntoUpdateMasterNItems`.

### 3. `InsertDVRRequestDetails` — DVR Activation
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/ManageDVRActivation.ts`.
- **Notes**: Simulates CAS authorization pushes for recording features.

### 4. `GetSTBModelMatrix` — Hardware Compatibility
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockHardwareRepository.getCompatibility`.
- **Notes**: Checks for remote and adapter compatibility during hardware upgrades.

### 5. `GetCustomerCerviceGetSTBVcPosition` — STB Physical Position
- [x] **Implementation Status**: **DONE**.
- **Where**: `STBDetail.chipSide` in domain and mock data.
- **Notes**: Identifies STB position (ChipSide Top/Bottom/Internal).

---

## Data Flow Summary

The **Hardware History** tab (ID: `service`) in `UnifiedTabs.tsx` now provides:
1. **Active STB Detail**: High-visibility card showing serial, model, warranty, and tech specs.
2. **Swap Wizard**: A multi-step interactive modal for technicians to perform replacements.
3. **Lifecycle History**: A chronological log of all previous hardware swaps for the subscriber.
