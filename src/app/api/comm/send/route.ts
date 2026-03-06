import { NextRequest, NextResponse } from "next/server";
import { SendCommunicationUseCase } from "../../../../application/useCases/SendCommunication";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  try {
    const useCase = new SendCommunicationUseCase();
    // In Next.js App Router, the second param to use case needs careful passing of the request context
    const logId = await useCase.execute(body, req as any);
    return NextResponse.json({ status: "SUCCESS", logId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
