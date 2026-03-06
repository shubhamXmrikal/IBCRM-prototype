import { NextRequest, NextResponse } from "next/server";
import { OrchestrateSTBSwapUseCase } from "../../../../application/useCases/OrchestrateSTBSwap";
import { MockHardwareRepository } from "../../../../infrastructure/apiClients/MockHardwareRepository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const repo = new MockHardwareRepository();
  const history = await repo.getSwapHistory(vcNumber);
  return NextResponse.json(history);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  try {
    const useCase = new OrchestrateSTBSwapUseCase();
    const swapId = await useCase.execute(body);
    return NextResponse.json({ status: "SUCCESS", swapId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
