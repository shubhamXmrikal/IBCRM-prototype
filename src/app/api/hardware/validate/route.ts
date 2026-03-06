import { NextRequest, NextResponse } from "next/server";
import { ValidateHardwarePairingUseCase } from "../../../../application/useCases/ValidateHardwarePairing";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");
  const stbNumber = searchParams.get("stbNumber");

  if (!vcNumber || !stbNumber) {
    return NextResponse.json({ error: "vcNumber and stbNumber are required" }, { status: 400 });
  }

  const useCase = new ValidateHardwarePairingUseCase();
  const isPaired = await useCase.execute(vcNumber, stbNumber);

  return NextResponse.json({ isPaired });
}
