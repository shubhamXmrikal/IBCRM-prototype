import { SearchCustomerUseCase } from "../src/application/useCases/SearchCustomer";
import { MockCustomerRepository } from "../src/infrastructure/apiClients/MockCustomerRepository";

// We test the real use case with the real mock repository (integrated test)
// This tests the full flow: SearchType branching, GoMulti, multi-match, session audit

describe("SearchCustomerUseCase — Subscriber Search Flow", () => {
  let useCase: SearchCustomerUseCase;

  beforeEach(() => {
    useCase = new SearchCustomerUseCase();
  });

  // ── Single-match paths ────────────────────────────────────────────────────

  it("Test 1: VC search returns single subscriber (JAFFER RESHT)", async () => {
    const result = await useCase.execute("VC", "02563029393");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.name).toBe("JAFFER RESHT");
      expect(result.subscriber.vcNumber).toBe("02563029393");
      expect(result.subscriber.smsId).toBe("33659209");
    }
  });

  it("Test 2: SMSID search resolves to correct subscriber", async () => {
    const result = await useCase.execute("SMSID", "41200100");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.name).toBe("RAHUL SHARMA");
    }
  });

  it("Test 3: STB search resolves to correct subscriber", async () => {
    const result = await useCase.execute("STB", "STB9876PRIYA0001");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.name).toBe("PRIYA MENON");
      expect(result.subscriber.flags?.isVIPCustomer).toBe(true);
    }
  });

  it("Test 4: RMN search with unique mobile returns single subscriber", async () => {
    const result = await useCase.execute("RMN", "9876543210");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.name).toBe("PRIYA MENON");
      // CallerMobType should be RMN since mobile matches
      expect(result.subscriber.callerContext.callerMobType).toBe("RMN");
    }
  });

  it("Test 5: EMAIL search returns single subscriber", async () => {
    const result = await useCase.execute("EMAIL", "rahul.sharma@gmail.com");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.name).toBe("RAHUL SHARMA");
    }
  });

  // ── Multi-match path (disambiguation) ─────────────────────────────────────

  it("Test 6: MOBILE search with shared number returns multi_match", async () => {
    const result = await useCase.execute("MOBILE", "9999900000");
    expect(result.type).toBe("multi_match");
    if (result.type === "multi_match") {
      expect(result.candidates.length).toBe(2);
      // Should include both JAFFER and RAHUL
      const names = result.candidates.map((c) => c.subscriberName);
      expect(names).toContain("JAFFER RESHT");
      expect(names).toContain("RAHUL SHARMA");
    }
  });

  // ── GoMulti path ──────────────────────────────────────────────────────────

  it("Test 7: VC search for GoMulti parent includes child connections", async () => {
    const result = await useCase.execute("VC", "09100000001");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.isGoMulti).toBe(true);
      expect(result.goMulti).not.toBeNull();
      expect(result.goMulti?.childConnections.length).toBe(2);
      expect(result.goMulti?.childConnections[0].subscriberName).toBe(
        "SITA SHARMA",
      );
    }
  });

  // ── Not-found paths ───────────────────────────────────────────────────────

  it("Test 8: Unknown VC returns not_found", async () => {
    const result = await useCase.execute("VC", "00000000000");
    expect(result.type).toBe("not_found");
  });

  it("Test 9: Unknown SMSID returns not_found", async () => {
    const result = await useCase.execute("SMSID", "99999999");
    expect(result.type).toBe("not_found");
  });

  // ── Validation ────────────────────────────────────────────────────────────

  it("Test 10: Empty searchBy throws validation error", async () => {
    await expect(useCase.execute("VC", "")).rejects.toThrow(
      "Search query cannot be empty",
    );
    await expect(useCase.execute("VC", "   ")).rejects.toThrow(
      "Search query cannot be empty",
    );
  });

  it("Test 11: Whitespace is stripped before search", async () => {
    const result = await useCase.execute("VC", "  02563029393  ");
    expect(result.type).toBe("single");
    if (result.type === "single") {
      expect(result.subscriber.name).toBe("JAFFER RESHT");
    }
  });

  // ── Session audit ─────────────────────────────────────────────────────────

  it("Test 12: Session audit is logged after successful single lookup", async () => {
    // The repository's in-memory sessionAuditLog grows on each successful single lookup.
    // We can't import it directly without polluting state; we verify via getLastVCNo instead.
    await useCase.execute("VC", "02563029393", "TEST_AGENT");
    const last = await useCase.getLastVCNo("TEST_AGENT");
    expect(last.lastVCNo).toBe("02563029393");
  });
});
