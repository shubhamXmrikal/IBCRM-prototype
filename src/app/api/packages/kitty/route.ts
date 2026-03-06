import { NextRequest, NextResponse } from "next/server";
import { GetKittyDetailsUseCase } from "../../../../application/useCases/GetKittyDetails";
import { RedeemKittyUseCase } from "../../../../application/useCases/RedeemKitty";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const useCase = new GetKittyDetailsUseCase();
  const data = await useCase.execute(smsId);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { smsId, packageIds } = body;

  if (!smsId || !packageIds) {
    return NextResponse.json({ error: "smsId and packageIds are required" }, { status: 400 });
  }

  const useCase = new RedeemKittyUseCase();
  const result = await useCase.execute(smsId, packageIds);
  return NextResponse.json({ status: "SUCCESS", formNo: result });
}
