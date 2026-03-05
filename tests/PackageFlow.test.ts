import { GetAvailablePackagesUseCase } from "../src/application/useCases/GetAvailablePackages";
import { OptInPackageUseCase } from "../src/application/useCases/OptInPackage";
import { OptOutPackageUseCase } from "../src/application/useCases/OptOutPackage";
import { RollbackPackageUseCase } from "../src/application/useCases/RollbackPackage";
import { MockPackageRepository } from "../src/infrastructure/apiClients/MockPackageRepository";

describe("Package & Channel Management Flow", () => {
  let getPackagesUseCase: GetAvailablePackagesUseCase;
  let optInUseCase: OptInPackageUseCase;
  let optOutUseCase: OptOutPackageUseCase;
  let rollbackUseCase: RollbackPackageUseCase;

  beforeEach(() => {
    getPackagesUseCase = new GetAvailablePackagesUseCase();
    optInUseCase = new OptInPackageUseCase();
    optOutUseCase = new OptOutPackageUseCase();
    rollbackUseCase = new RollbackPackageUseCase();
  });

  it("Test 1: Get available packages filters out already active packages for Rahul", async () => {
    const result = await getPackagesUseCase.execute("09100000001");
    // Rahul has PKG-002 and PKG-006 active. So they shouldn't be in the catalogue.
    const catalogueIds = result.catalogue.map((p) => p.id);
    expect(catalogueIds).not.toContain("PKG-002");
    expect(catalogueIds).not.toContain("PKG-006");
    expect(result.active.length).toBe(2);
  });

  it("Test 2: Opt In to a package without consent when required throws an error", async () => {
    await expect(
      optInUseCase.execute("09100000001", "PKG-004", true, false)
    ).rejects.toThrow("Verbal consent is required to activate this package.");
  });

  it("Test 3: Opt In to a package with future schedule", async () => {
    const scheduledDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    await optInUseCase.execute("09100000001", "PKG-007", false, false, scheduledDate);

    const result = await getPackagesUseCase.execute("09100000001");
    const activePack = result.active.find((s) => s.packageId === "PKG-007");
    expect(activePack).toBeDefined();
    expect(activePack?.status).toBe("PENDING_ACTIVATION");
  });

  it("Test 4: Opt Out of an active package", async () => {
    // Rahul's PKG-006 is SUB-103
    await optOutUseCase.execute("SUB-103");
    
    // We instantiate a new GetAvailablePackagesUseCase to check state 
    // State is shared via memory, so we check if the status changed.
    const result = await getPackagesUseCase.execute("09100000001");
    const activePack = result.active.find((s) => s.id === "SUB-103");
    expect(activePack?.status).toBe("PENDING_DEACTIVATION");
  });

  it("Test 5: Rollback package correctly changes base pack and marks rollback as used", async () => {
    // Rahul is eligible for rollback to PKG-001 (RB-101)
    await rollbackUseCase.execute("09100000001", "RB-101", "Agent verified rollback due to miscommunication.");

    const repo = new MockPackageRepository();
    const history = await repo.getRollbackHistory("09100000001");
    // Should be null because it was marked used
    expect(history).toBeNull();

    const result = await getPackagesUseCase.execute("09100000001");
    const activeBase = result.active.find((s) => s.packageId === "PKG-001");
    expect(activeBase).toBeDefined();
    expect(activeBase?.status).toBe("ACTIVE");

    // The old base pack (PKG-002) should be removed
    const oldBase = result.active.find((s) => s.packageId === "PKG-002");
    expect(oldBase).toBeUndefined();
  });

  it("Test 6: Rollback throws error if no remarks provided", async () => {
    await expect(
      rollbackUseCase.execute("09100000001", "RB-101", "")
    ).rejects.toThrow("Agent remarks are required for rollback.");
  });

});