import { NextResponse } from "next/server";
import { GetAvailablePackagesUseCase } from "../../../../application/useCases/GetAvailablePackages";
import { MockPackageRepository } from "../../../../infrastructure/apiClients/MockPackageRepository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  try {
    const useCase = new GetAvailablePackagesUseCase();
    const result = await useCase.execute(vcNumber);

    const repo = new MockPackageRepository();
    const rollbackEligible = await repo.getRollbackHistory(vcNumber);

    return NextResponse.json({
      catalogue: result.catalogue,
      active: result.active,
      rollbackEligibility: rollbackEligible
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}