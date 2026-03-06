import { NextRequest, NextResponse } from "next/server";
import { ManageOTPUseCase } from "../../../../application/useCases/ManageOTP";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, vcNumber, mobileNo, code, source } = body;

  const useCase = new ManageOTPUseCase();

  if (action === "generate") {
    const otp = await useCase.generate(vcNumber, mobileNo, source || "CRM");
    return NextResponse.json({ status: "SENT", otp }); // In real app, don't return OTP in response body
  }

  if (action === "validate") {
    const isValid = await useCase.validate(vcNumber, code);
    return NextResponse.json({ isValid });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
