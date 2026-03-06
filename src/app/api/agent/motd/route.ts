import { NextRequest, NextResponse } from "next/server";
import { GetSubscriberMOTDUseCase } from "../../../../application/useCases/GetSubscriberMOTD";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const useCase = new GetSubscriberMOTDUseCase();
  const motd = await useCase.execute(smsId);

  return NextResponse.json(motd || { importantMessage: "", proactiveInfo: "" });
}
