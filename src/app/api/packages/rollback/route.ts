import { NextResponse } from "next/server";
import { RollbackPackageUseCase } from "../../../../application/useCases/RollbackPackage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vcNumber, rollbackId, remarks } = body;

    if (!vcNumber || !rollbackId || !remarks) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const useCase = new RollbackPackageUseCase();
    await useCase.execute(vcNumber, rollbackId, remarks);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 400 });
  }
}