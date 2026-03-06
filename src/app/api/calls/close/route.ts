import { NextResponse } from "next/server";
import { SubmitCallClosureUseCase } from "../../../../application/useCases/SubmitCallClosure";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const useCase = new SubmitCallClosureUseCase();
    const result = await useCase.execute(body);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 400 });
  }
}
