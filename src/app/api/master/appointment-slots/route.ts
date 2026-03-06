import { NextResponse } from "next/server";
import { MockComplaintRepository } from "../../../../infrastructure/apiClients/MockComplaintRepository";

export async function GET() {
  const repo = new MockComplaintRepository();
  const slots = await repo.getAppointmentSlots();
  return NextResponse.json(slots);
}
