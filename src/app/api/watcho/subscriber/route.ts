import { NextRequest, NextResponse } from "next/server";
import { GetWatchoSubscriberDetailsUseCase } from "../../../../application/useCases/GetWatchoSubscriberDetails";
import { ManageWatchoAutoRenewalUseCase } from "../../../../application/useCases/ManageWatchoAutoRenewal";
import { SubmitWatchoSubscriptionUseCase } from "../../../../application/useCases/SubmitWatchoSubscription";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const useCase = new GetWatchoSubscriberDetailsUseCase();
  const sub = await useCase.execute(vcNumber);

  if (!sub) {
    return NextResponse.json({ error: "Watcho subscriber not found" }, { status: 404 });
  }

  return NextResponse.json(sub);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, vcNumber, enabled, planId, couponCode } = body;

  if (action === "toggleAutoRenewal") {
    const useCase = new ManageWatchoAutoRenewalUseCase();
    await useCase.execute(vcNumber, enabled);
    return NextResponse.json({ status: "SUCCESS" });
  }

  if (action === "subscribe") {
    const useCase = new SubmitWatchoSubscriptionUseCase();
    const formNo = await useCase.execute(vcNumber, planId, couponCode);
    return NextResponse.json({ status: "SUCCESS", formNo });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
