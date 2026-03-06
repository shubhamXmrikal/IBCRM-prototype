import { NextRequest, NextResponse } from "next/server";
import { ApplyWaiverUseCase } from "../../../../application/useCases/ApplyWaiver";
import { MockFinancialRepository } from "../../../../infrastructure/apiClients/MockFinancialRepository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");
  const mode = searchParams.get("mode"); // "reasons" or "history"

  const repo = new MockFinancialRepository();

  if (mode === "reasons") {
    const reasons = await repo.getWaiverReasons();
    return NextResponse.json(reasons);
  }

  if (vcNumber) {
    const history = await repo.getWaiverRequests(vcNumber);
    return NextResponse.json(history);
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  try {
    const useCase = new ApplyWaiverUseCase();
    const requestId = await useCase.execute(body);
    return NextResponse.json({ status: "SUCCESS", requestId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
