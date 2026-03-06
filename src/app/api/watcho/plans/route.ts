import { NextResponse } from "next/server";
import { MockWatchoRepository } from "../../../../infrastructure/apiClients/MockWatchoRepository";

export async function GET() {
  const repo = new MockWatchoRepository();
  const plans = await repo.getPlans();
  return NextResponse.json(plans);
}
