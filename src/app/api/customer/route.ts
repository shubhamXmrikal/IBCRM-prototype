import { NextResponse } from "next/server";
import { SearchCustomerUseCase } from "../../../application/useCases/SearchCustomer";
import { MockInteractionRepository } from "../../../infrastructure/apiClients/MockInteractionRepository";
import { SearchType } from "../../../domain/customer/SubscriberSearchTypes";

/**
 * GET /api/customer?searchType=VC&searchBy=02563029393&agentId=AGENT_001
 *
 * Mirrors the legacy CSSubInfoPersonal.aspx.cs [WebMethod] GetSubscriberInfoDetails.
 *
 * Response shapes:
 *   200 { type: 'single', subscriber, goMulti?, history }  — one account found
 *   200 { type: 'multi_match', candidates }                — disambiguation required
 *   400 { error: 'searchBy is required' }                  — missing param
 *   404 { error: 'Customer not found' }                    — no match
 *   500 { error: 'Internal server error' }                  — unexpected
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const searchTypeRaw = (
    searchParams.get("searchType") ?? "VC"
  ).toUpperCase() as SearchType;
  const searchBy = searchParams.get("searchBy") ?? searchParams.get("vc"); // backwards-compatible
  const agentId = searchParams.get("agentId") ?? "AGENT_001";

  const validSearchTypes: SearchType[] = [
    "VC",
    "SMSID",
    "MOBILE",
    "STB",
    "EMAIL",
    "RMN",
  ];
  const searchType: SearchType = validSearchTypes.includes(searchTypeRaw)
    ? searchTypeRaw
    : "VC";

  if (!searchBy || searchBy.trim() === "") {
    return NextResponse.json(
      { error: "searchBy is required" },
      { status: 400 },
    );
  }

  try {
    const useCase = new SearchCustomerUseCase();
    const result = await useCase.execute(searchType, searchBy, agentId);

    // ── not_found ─────────────────────────────────────────────────────────
    if (result.type === "not_found") {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    // ── multi_match — return disambiguation list, no 360 data ─────────────
    if (result.type === "multi_match") {
      return NextResponse.json(
        { type: "multi_match", candidates: result.candidates },
        { status: 200 },
      );
    }

    // ── single — return full 360 payload ──────────────────────────────────
    const interactionRepo = new MockInteractionRepository();
    const history = await interactionRepo.getHistoryByCustomerId(
      result.subscriber.id,
    );

    return NextResponse.json(
      {
        type: "single",
        subscriber: result.subscriber,
        goMulti: result.goMulti ?? null,
        history,
      },
      { status: 200 },
    );
  } catch (err: any) {
    if (err.message === "Search query cannot be empty") {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
