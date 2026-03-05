# Customer Service Prototype Architecture

This prototype utilizes **Clean Architecture** and **Domain-Driven Design (DDD)** principles to decouple the UI from the business logic, making the repository easier to test, extend, and maintain.

## 1. Bounded Contexts & Domain Modules

The legacy CustomerService module (`BLCustomerService.cs`, 590+ methods) has been logically split into distinct bounded contexts.

### Context: Customer Identity & Profile

- **Entities:** `Customer` (Root), `Contact`, `TechnicalDetails`, `FinancialDetails`
- **Scope:** Handles all static data around the subscriber, location, STB, and last payment dates. Replaces legacy `GetSubscriberInfoDetails` and `GetCustomerVerificationDetails`.

### Context: Interaction & Service History

- **Entities:** `Interaction`, `ServiceRequest`
- **Scope:** Defines records for calls (Inbound/Outbound), SMS, Emails, and technician service requests (Installation/Repair). Replaces legacy `GetComplaintHistoryList` and `GetStatusCount`.

### Context: Subscription & Packages

- **Entities:** `Package`, `Subscription`
- **Scope:** Rules for Add-ons, Base packs, A-la-carte channels, and validations around ST2 migration or Payterm offers.

## 2. Layered Breakdown

```
src/
├── domain/        (Core Business entities & Validation logic. No external dependencies)
├── application/   (Use Cases/Interactors like SearchCustomer. Orchestrates domain objects with infra)
├── infrastructure/(External I/O: API Clients for legacy SOAP/REST endpoints, Mock data repos)
└── presentation/  (Next.js App Router UI, React Components, Layouts, CSS)
```

## 3. Legacy Feature to Use Case Mapping

| Legacy ASP.NET Method                                         | New DDD Use Case (Application Layer)      |
| ------------------------------------------------------------- | ----------------------------------------- |
| `BLCustomerService.GetSubscriberInfoDetails`                  | `SearchCustomerUseCase.execute()`         |
| `BLCustomerService.GetComplaintHistoryList`                   | `GetCustomerHistoryUseCase.execute()`     |
| `BLAddonsForCustomer.GetVASAddonsForCustomer`                 | `GetAvailablePackagesUseCase.execute()`   |
| `BLCustomerVerificationDetails.InsertTempDeactivationRequest` | `SubmitTempDeactivationUseCase.execute()` |

By isolating these Use Cases, they can be tested via Unit Tests without spinning up a browser or a full IIS server.
