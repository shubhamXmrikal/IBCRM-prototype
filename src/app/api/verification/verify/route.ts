import { NextResponse } from "next/server";
import { VerifyCustomerUseCase } from "../../../../application/useCases/VerifyCustomer";
import { KYCStatus } from "../../../../domain/verification/VerificationTypes";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vcNumber, answers } = body;

    if (!vcNumber || !answers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const useCase = new VerifyCustomerUseCase();
    const status: KYCStatus = await useCase.execute(vcNumber, answers);

    if (status === "VERIFIED") {
      return NextResponse.json({ status }, { status: 200 });
    } else if (status === "WOB") {
      return NextResponse.json(
        {
          status,
          error: "Account is WOB Locked. Physical verification required.",
        },
        { status: 403 },
      );
    } else {
      return NextResponse.json(
        {
          status,
          error: "Verification failed. Please check the details carefully.",
        },
        { status: 401 },
      );
    }
  } catch (err: any) {
    if (
      err.message === "Account is WOB Locked. Physical verification required."
    ) {
      return NextResponse.json(
        { status: "WOB", error: err.message },
        { status: 403 },
      );
    }
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
