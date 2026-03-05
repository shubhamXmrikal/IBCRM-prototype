import { NextResponse } from "next/server";
import { OptInPackageUseCase } from "../../../../application/useCases/OptInPackage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vcNumber, packageId, requiresConsent, consentGiven, scheduledDate } = body;

    if (!vcNumber || !packageId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const useCase = new OptInPackageUseCase();
    const date = scheduledDate ? new Date(scheduledDate) : undefined;
    
    await useCase.execute(vcNumber, packageId, requiresConsent || false, consentGiven || false, date);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 400 });
  }
}