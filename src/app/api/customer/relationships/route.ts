import { NextResponse } from "next/server";
import { MockContactRepository } from "../../../../infrastructure/apiClients/MockContactRepository";

export async function GET() {
  const repo = new MockContactRepository();
  const relationships = await repo.getRelationshipDtl();
  return NextResponse.json(relationships);
}
