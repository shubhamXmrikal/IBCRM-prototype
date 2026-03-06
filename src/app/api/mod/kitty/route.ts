import { NextRequest, NextResponse } from "next/server";
import { MockModRepository } from "../../../../infrastructure/apiClients/MockModRepository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smsId = searchParams.get("smsId");

  if (!smsId) {
    return NextResponse.json({ error: "smsId is required" }, { status: 400 });
  }

  const repo = new MockModRepository();
  const kitty = await repo.getKittyDetails(smsId);
  return NextResponse.json(kitty);
}
