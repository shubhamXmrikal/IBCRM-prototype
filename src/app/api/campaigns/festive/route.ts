import { NextRequest, NextResponse } from "next/server";
import { GetFestiveOffersUseCase } from "../../../../application/useCases/GetFestiveOffers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");
  const vcNumber = searchParams.get("vcNumber");
  const zoneId = searchParams.get("zoneId") || "NORTH";
  const stbType = (searchParams.get("stbType") || "HD") as any;

  if (!smsId || !vcNumber) {
    return NextResponse.json({ error: "smsId and vcNumber are required" }, { status: 400 });
  }

  const useCase = new GetFestiveOffersUseCase();
  const data = await useCase.execute(smsId, vcNumber, zoneId, stbType);

  return NextResponse.json(data);
}
