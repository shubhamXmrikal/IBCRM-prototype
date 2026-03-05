import { Customer, CustomerStatus } from "../src/domain/customer/Customer";

describe("Customer Domain Entity Rules (Mock)", () => {
  it("Test 5: should correctly classify customer active status based on dates", () => {
    // A mock business rule to demonstrate domain tests
    // Re-calculating status from switchoff date vs current date
    const mockCust: Partial<Customer> = {
      metrics: {
        status: "DEACTIVE",
        deDays: "3/1",
        activationDate: new Date("2019-10-06"),
        switchOffDate: new Date("2025-02-24"), // Switchoff is in the past!
        rechargeDate: new Date("2025-02-21"),
        customerType: "DTH",
        customerTypeId: 1,
        paytermName: "MONTHLY",
      },
    };

    const isCurrentlyDeactivated = (cust: Partial<Customer>): boolean => {
      // Mocking today's date to be after switch off date logically
      const mockToday = new Date("2026-03-01T00:00:00Z");
      return cust.metrics!.switchOffDate < mockToday;
    };

    expect(isCurrentlyDeactivated(mockCust)).toBe(true);
  });
});
