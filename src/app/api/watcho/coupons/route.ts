import { NextResponse } from "next/server";
import { MockWatchoRepository } from "../../../../infrastructure/apiClients/MockWatchoRepository";

export async function GET() {
  const repo = new MockWatchoRepository();
  const coupons = await repo.getCoupons();
  return NextResponse.json(coupons);
}
