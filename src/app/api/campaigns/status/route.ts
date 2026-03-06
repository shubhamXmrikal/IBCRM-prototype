import { NextRequest, NextResponse } from "next/server";
import { GetCampaignEngagementUseCase } from "../../../../application/useCases/GetCampaignEngagement";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const useCase = new GetCampaignEngagementUseCase();
  const data = await useCase.execute(smsId);

  return NextResponse.json(data);
}
