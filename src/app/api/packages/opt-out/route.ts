import { NextResponse } from "next/server";
import { OptOutPackageUseCase } from "../../../../application/useCases/OptOutPackage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subId } = body;

    if (!subId) {
      return NextResponse.json({ error: "Missing subId" }, { status: 400 });
    }

    const useCase = new OptOutPackageUseCase();
    await useCase.execute(subId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 400 });
  }
}