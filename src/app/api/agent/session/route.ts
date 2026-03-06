import { NextRequest, NextResponse } from "next/server";
import { ManageAgentSessionUseCase } from "../../../../application/useCases/ManageAgentSession";
import { captureAgentIP } from "../../../../domain/communication/CommunicationTypes";

export async function GET(req: NextRequest) {
  const ip = captureAgentIP(req as any);
  const useCase = new ManageAgentSessionUseCase();
  const session = await useCase.getSession(ip);
  return NextResponse.json(session);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { agentId, vcNo } = body;

  if (!agentId || !vcNo) {
    return NextResponse.json({ error: "agentId and vcNo are required" }, { status: 400 });
  }

  const useCase = new ManageAgentSessionUseCase();
  await useCase.recordSubscriberAccess(agentId, vcNo);
  return NextResponse.json({ status: "SUCCESS" });
}
