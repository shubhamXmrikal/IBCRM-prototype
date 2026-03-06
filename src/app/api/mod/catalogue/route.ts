import { NextResponse } from "next/server";
import { GetMODCatalogueUseCase } from "../../../../application/useCases/GetMODCatalogue";

export async function GET() {
  const useCase = new GetMODCatalogueUseCase();
  const catalogue = await useCase.execute();
  return NextResponse.json(catalogue);
}
