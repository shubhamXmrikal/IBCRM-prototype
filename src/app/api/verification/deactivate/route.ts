import { NextResponse } from "next/server";
import { RequestTempDeactivationUseCase } from "../../../../application/useCases/RequestTempDeactivation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vcNumber, startDate, endDate, reason, isRamadanRequest } = body;

    if (!vcNumber || !startDate || !endDate || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const useCase = new RequestTempDeactivationUseCase();
    const result = await useCase.execute(
      vcNumber,
      start,
      end,
      reason,
      isRamadanRequest,
    );

    return NextResponse.json(
      { success: true, request: result },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 400 },
    );
  }
}
