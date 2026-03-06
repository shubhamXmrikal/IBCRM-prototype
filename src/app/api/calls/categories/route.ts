import { NextResponse } from "next/server";
import { GetCallTreeUseCase } from "../../../../application/useCases/GetCallTree";

export async function GET() {
  try {
    const useCase = new GetCallTreeUseCase();
    const categories = await useCase.execute();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
