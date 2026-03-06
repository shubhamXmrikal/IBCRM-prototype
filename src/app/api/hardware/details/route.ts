import { NextRequest, NextResponse } from "next/server";
import { MockHardwareRepository } from "../../../../infrastructure/apiClients/MockHardwareRepository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stbNumber = searchParams.get("stbNumber");
  const mode = searchParams.get("mode"); // "brands" or "details"

  const repo = new MockHardwareRepository();

  if (mode === "brands") {
    const brands = await repo.getAdapterBrands();
    return NextResponse.json(brands);
  }

  if (stbNumber) {
    const details = await repo.getSTBDetail(stbNumber);
    if (!details) return NextResponse.json({ error: "STB not found" }, { status: 404 });
    return NextResponse.json(details);
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
}
