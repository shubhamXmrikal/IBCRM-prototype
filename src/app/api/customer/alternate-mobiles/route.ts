import { NextRequest, NextResponse } from "next/server";
import { GetAlternateMobilesUseCase } from "../../../../application/useCases/GetAlternateMobiles";
import { UpdateMobileDetailUseCase } from "../../../../application/useCases/UpdateMobileDetail";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const useCase = new GetAlternateMobilesUseCase();
  const mobiles = await useCase.execute(smsId);
  return NextResponse.json(mobiles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const useCase = new UpdateMobileDetailUseCase();
  const result = await useCase.execute(body);
  return NextResponse.json(result);
}
