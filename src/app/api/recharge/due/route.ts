import { NextRequest, NextResponse } from "next/server";
import { CalculateRechargeDueUseCase } from "../../../../application/useCases/CalculateRechargeDue";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const useCase = new CalculateRechargeDueUseCase();
  const dueInfo = await useCase.execute(smsId);

  if (!dueInfo) {
    return NextResponse.json({ error: "Due info not found" }, { status: 404 });
  }

  return NextResponse.json(dueInfo);
}
