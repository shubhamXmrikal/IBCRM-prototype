import { NextRequest, NextResponse } from "next/server";
import { GetStatementOfAccountUseCase } from "../../../../application/useCases/GetStatementOfAccount";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");
  const viewRPT = parseInt(searchParams.get("viewRPT") || "7");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const useCase = new GetStatementOfAccountUseCase();
  const data = await useCase.execute(vcNumber, viewRPT);

  return NextResponse.json(data);
}
