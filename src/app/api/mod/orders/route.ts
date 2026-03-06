import { NextRequest, NextResponse } from "next/server";
import { OrderMovieUseCase } from "../../../../application/useCases/OrderMovie";
import { ResendMovieAuthorizationUseCase } from "../../../../application/useCases/ResendMovieAuthorization";
import { MockModRepository } from "../../../../infrastructure/apiClients/MockModRepository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const repo = new MockModRepository();
  const orders = await repo.getRequestsByVc(vcNumber);
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, requestId, order } = body;

  if (action === "resend") {
    const useCase = new ResendMovieAuthorizationUseCase();
    const success = await useCase.execute(requestId);
    return NextResponse.json({ success });
  }

  try {
    const useCase = new OrderMovieUseCase();
    const newId = await useCase.execute(order);
    return NextResponse.json({ status: "SUCCESS", id: newId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
