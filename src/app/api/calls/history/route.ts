import { NextResponse } from "next/server";
import { GetUnifiedHistoryUseCase } from "../../../../application/useCases/GetUnifiedHistory";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");
  const vcNumber = searchParams.get("vcNumber");

  if (!customerId || !vcNumber) {
    return NextResponse.json({ error: "Missing customerId or vcNumber" }, { status: 400 });
  }

  try {
    const useCase = new GetUnifiedHistoryUseCase();
    const history = await useCase.execute(customerId, vcNumber);
    return NextResponse.json(history, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
