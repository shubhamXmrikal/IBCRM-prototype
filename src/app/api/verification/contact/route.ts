import { NextResponse } from "next/server";
import { UpdateContactDetailsUseCase } from "../../../../application/useCases/UpdateContactDetails";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { vcNumber, newEmail, newMobile } = body;

    if (!vcNumber) {
      return NextResponse.json(
        { error: "vcNumber is required" },
        { status: 400 },
      );
    }

    const useCase = new UpdateContactDetailsUseCase();
    await useCase.execute(vcNumber, newEmail, newMobile);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 400 },
    );
  }
}
