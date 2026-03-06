import { NextRequest, NextResponse } from "next/server";
import { CreateComplaintUseCase } from "../../../application/useCases/CreateComplaint";
import { GetComplaintHistoryUseCase } from "../../../application/useCases/GetComplaintHistory";
import { ValidateComplaintEligibilityUseCase } from "../../../application/useCases/ValidateComplaintEligibility";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");
  const mode = searchParams.get("mode"); // "history" or "validate"

  if (!vcNumber) {
    return NextResponse.json(
      { error: "vcNumber is required" },
      { status: 400 },
    );
  }

  if (mode === "validate") {
    const useCase = new ValidateComplaintEligibilityUseCase();
    const result = await useCase.execute(vcNumber);
    return NextResponse.json(result);
  }

  const useCase = new GetComplaintHistoryUseCase();
  const history = await useCase.execute(vcNumber);
  return NextResponse.json(history);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const useCase = new CreateComplaintUseCase();
    const ticketId = await useCase.execute(body);
    return NextResponse.json({ status: "SUCCESS", ticketId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
