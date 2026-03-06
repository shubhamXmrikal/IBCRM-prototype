import { NextRequest, NextResponse } from "next/server";
import { ConvertPrepaidToPostpaidUseCase } from "../../../../application/useCases/ConvertPrepaidToPostpaid";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  try {
    const useCase = new ConvertPrepaidToPostpaidUseCase();
    const leadId = await useCase.execute(body);
    return NextResponse.json({ status: "SUCCESS", leadId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
