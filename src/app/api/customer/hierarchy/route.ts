import { NextRequest, NextResponse } from "next/server";
import { GetServiceHierarchyUseCase } from "../../../../application/useCases/GetServiceHierarchy";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const useCase = new GetServiceHierarchyUseCase();
  const hierarchy = await useCase.execute(vcNumber);

  return NextResponse.json(hierarchy);
}
