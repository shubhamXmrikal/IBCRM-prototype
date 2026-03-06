import { NextRequest, NextResponse } from "next/server";
import { CheckGraceChargeUseCase } from "../../../../application/useCases/CheckGraceCharge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const useCase = new CheckGraceChargeUseCase();
  const info = await useCase.execute(smsId);
  return NextResponse.json(info);
}
