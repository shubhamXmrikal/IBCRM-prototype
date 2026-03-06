import { NextRequest, NextResponse } from "next/server";
import { GetCommunicationHistoryUseCase } from "../../../../application/useCases/GetCommunicationHistory";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const useCase = new GetCommunicationHistoryUseCase();
  const history = await useCase.execute(vcNumber);

  return NextResponse.json(history);
}
