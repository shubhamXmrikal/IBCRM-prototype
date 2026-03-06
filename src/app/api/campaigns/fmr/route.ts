import { NextRequest, NextResponse } from "next/server";
import { CalculateFMRBenefitsUseCase } from "../../../../application/useCases/CalculateFMRBenefits";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");
  const schemeId = searchParams.get("schemeId");

  if (!smsId || !schemeId) {
    return NextResponse.json({ error: "smsId and schemeId are required" }, { status: 400 });
  }

  const useCase = new CalculateFMRBenefitsUseCase();
  const data = await useCase.execute(smsId, schemeId);

  return NextResponse.json(data || { monthly: 0, threeMonth: 0, sixMonth: 0 });
}
