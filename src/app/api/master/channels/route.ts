import { NextResponse } from "next/server";
import { MockFinancialRepository } from "../../../../infrastructure/apiClients/MockFinancialRepository";

export async function GET() {
  const repo = new MockFinancialRepository();
  const channels = await repo.getAllChannels();
  return NextResponse.json(channels);
}
