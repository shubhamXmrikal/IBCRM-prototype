# Core Customer Service — Sub-Group 3: Contact & Mobile Details

**Implementation Status Tracking**

This document tracks the porting of the 15 contact-related methods from `ibcrm` into the Next.js `prototype-customer-service` project.

---

## Methods

### 1. `GetSubMobileDetails` — Primary Contact Panel
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/domain/customer/Customer.ts` (extended model) and `src/infrastructure/mockData/customerMock.ts`.
- **Notes**: Load RMN, alternate mobiles, DNC flags, landlines, email, and social media handles. Emulates `usp_CustomerService_GetSubMobileDetails`.

### 2. `GetSubsMobileDetails` — Full Alternate Mobile List
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/GetAlternateMobiles.ts` and `src/infrastructure/apiClients/MockContactRepository.ts`.
- **Notes**: Detailed list of all mobile numbers with relationship, classification, and authority levels. Emulates `usp_CustomerService_GetSubsAltMobileDetails`.

### 3. `GetRelationshipDtl` — Relationship Master Data
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockContactRepository.ts`.
- **Notes**: Dropdown list for Self, Spouse, Parent, etc. Emulates `usp_CustomerService_GetRelationshipDetails`.

### 4, 5, 6. `UpdateSubsMobileDetails` — Upsert Mobile Entry
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/UpdateMobileDetail.ts`.
- **Notes**: Handles standard update, VAPT-compliant update (IP/CV), and RMN de-tagging from other VCs. Emulates `usp_CustomerService_InsUpdSubsMobilesDetails`.

### 7. `MobileLogUpdation` — Audit Trail
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockContactRepository.ts`.
- **Notes**: Log entry for mobile updates. Emulates `usp_CustomerService_MobileLogUpdation`.

### 8. `DeleteMobileDetails` — Remove Mobile Entry
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockContactRepository.ts`.
- **Notes**: Soft-delete mobile association. Emulates `usp_CustomerService_DeleteMobileDetails`.

### 9. `UpdateSubscriberDetails` — Full Profile Edit
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/UpdateFullProfile.ts`.
- **Notes**: Unified update for name, address, all 3 mobile slots, landlines, email, and social. Emulates `usp_CustomerService_UpdateSubPresonalInfo`.

### 10. `GetContactDetailsUpdateionReport` — Contact Audit Report
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockContactRepository.ts`.
- **Notes**: History of changes to contact info. Emulates `usp_CustomerService_GetContactDetailsUpdatingReport`.

### 11. `UpdateAlternateNumberForMOD` — MOD Notifications
- [x] **Implementation Status**: **DONE**.
- **Where**: `MockContactRepository.ts`.
- **Notes**: Register/update mobile specifically for Movies On Demand. Emulates `usp_Get_MOD_forAlternateNumber`.

### 12, 13. `DealerContactManagement` — Dealer Details
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/DealerContactManagement.ts`.
- **Notes**: CRUD for dealer/distributor contact info. Emulates `usp_CUSTOMERSERVICE_GetDLContactDetails` and `usp_CUSTOMERSERVICE_UpdateDLContactDetails`.

### 14. `InsertCiscoCLIEvent` — Telephony Lifecycle
- [x] **Implementation Status**: **DONE**.
- **Where**: `src/application/useCases/LogTelephonyEvent.ts`.
- **Notes**: Correlation between CRM and Aspect call-centre platform. Emulates `usp_InsertAspectCLIEvent`.

### 15. `InsertSMSDetails` — Automated Notifications
- [x] **Implementation Status**: **DONE**.
- **Where**: Internal logic within `MockContactRepository.updateSubsMobileDetails`.
- **Notes**: Side-effect SMS dispatch (Template ID 13) after mobile update.
