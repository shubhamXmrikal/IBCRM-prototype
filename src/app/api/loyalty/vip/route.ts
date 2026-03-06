import { NextRequest, NextResponse } from "next/server";
import { GetSubscriberVIPStatusUseCase } from "../../../../application/useCases/GetSubscriberVIPStatus";
import { EnrollInDishVIPUseCase } from "../../../../application/useCases/EnrollInDishVIP";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vcNumber = searchParams.get("vcNumber");

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  const useCase = new GetSubscriberVIPStatusUseCase();
  const data = await useCase.execute(vcNumber);

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { vcNumber } = body;

  if (!vcNumber) {
    return NextResponse.json({ error: "vcNumber is required" }, { status: 400 });
  }

  try {
    const useCase = new EnrollInDishVIPUseCase();
    const result = await useCase.execute(vcNumber);
    return NextResponse.json({ status: "SUCCESS", ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
