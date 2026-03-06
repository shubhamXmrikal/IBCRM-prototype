import { NextRequest, NextResponse } from "next/server";
import { ValidateRechargeEligibilityUseCase } from "../../../../application/useCases/ValidateRechargeEligibility";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const useCase = new ValidateRechargeEligibilityUseCase();
  const validation = await useCase.execute(vcNumber);

  if (!validation) {
    return NextResponse.json({ error: "Subscriber not found for validation" }, { status: 404 });
  }

  return NextResponse.json(validation);
}
