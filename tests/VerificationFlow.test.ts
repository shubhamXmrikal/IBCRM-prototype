import { VerifyCustomerUseCase } from "../src/application/useCases/VerifyCustomer";
import { RequestTempDeactivationUseCase } from "../src/application/useCases/RequestTempDeactivation";
import { UpdateContactDetailsUseCase } from "../src/application/useCases/UpdateContactDetails";
import { LogServiceRemovalConsentUseCase } from "../src/application/useCases/LogServiceRemovalConsent";

describe("Verification & Identity Flow", () => {
  let verifyUseCase: VerifyCustomerUseCase;
  let tempDeactUseCase: RequestTempDeactivationUseCase;
  let updateContactUseCase: UpdateContactDetailsUseCase;
  let consentLogUseCase: LogServiceRemovalConsentUseCase;

  beforeEach(() => {
    verifyUseCase = new VerifyCustomerUseCase();
    tempDeactUseCase = new RequestTempDeactivationUseCase();
    updateContactUseCase = new UpdateContactDetailsUseCase();
    consentLogUseCase = new LogServiceRemovalConsentUseCase();
  });

  // 1. Verify Customer
  it("Test 1: Jaffer is verified with correct credentials", async () => {
    const status = await verifyUseCase.execute("02563029393", {
      pinCode: "182205",
      lastRechargeAmount: 442,
    });
    expect(status).toBe("VERIFIED");
  });

  it("Test 2: Rahul fails verification and is marked as WOB (since failedAttempts was 1)", async () => {
    const status = await verifyUseCase.execute("09100000001", {
      pinCode: "000000", // Wrong pin
    });
    // It should increment failed attempts to 2, causing WOB
    expect(status).toBe("WOB");
  });

  it("Test 3: Priya is already WOB locked, should throw an error", async () => {
    await expect(
      verifyUseCase.execute("07800009999", { pinCode: "682035" })
    ).rejects.toThrow("Account is WOB Locked. Physical verification required.");
  });

  // 2. Temp Deactivation
  it("Test 4: Request Temp Deactivation for Jaffer", async () => {
    const start = new Date(Date.now() + 1000 * 60 * 60 * 24); // tomorrow
    const end = new Date(start.getTime() + 6 * 1000 * 60 * 60 * 24); // 6 days later

    const req = await tempDeactUseCase.execute("02563029393", start, end, "VACATION");
    expect(req.status).toBe("PENDING");
    expect(req.vcNumber).toBe("02563029393");
    expect(req.isRamadanRequest).toBe(false);
  });

  it("Test 5: Request Temp Deactivation fails if less than minimum days", async () => {
    const start = new Date();
    const end = new Date(start.getTime() + 1 * 1000 * 60 * 60 * 24); // 1 day later

    await expect(
      tempDeactUseCase.execute("02563029393", start, end, "EXAMS")
    ).rejects.toThrow("Suspension must be at least 5 days.");
  });

  // 3. Update Contact Details
  it("Test 6: Fails to update email if it belongs to someone else", async () => {
    await expect(
      updateContactUseCase.execute("02563029393", "rahul.sharma@gmail.com", undefined)
    ).rejects.toThrow("This email is already registered to another subscriber.");
  });

  it("Test 7: Successfully updates to a unique email", async () => {
    await expect(
      updateContactUseCase.execute("02563029393", "jaffer.new@example.com", undefined)
    ).resolves.toBeUndefined(); // Should not throw
  });

  // 4. Log Service Removal Consent
  it("Test 8: Log service removal without explicit consent", async () => {
    const log = await consentLogUseCase.execute("02563029393", "Star Sports Add-on", false, "TEST_AGENT");
    expect(log.isConsentGiven).toBe(false);
    expect(log.serviceRemoved).toBe("Star Sports Add-on");
  });
});