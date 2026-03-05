import { Customer } from "./Customer";

/**
 * Maps to the legacy @SearchType parameter of usp_CUSTOMERSERVICE_GetSubscriberInfo_Final.
 * Valid values: "VC" | "SMSID" | "MOBILE" | "STB" | "EMAIL" | "RMN"
 */
export type SearchType = "VC" | "SMSID" | "MOBILE" | "STB" | "EMAIL" | "RMN";

/**
 * One row from the multi-match disambiguation query.
 * Maps to usp_CUSTOMERSERVICE_SearchSubsDetailByMobnEmail result row.
 */
export interface SearchSubsDetails {
  vcNumber: string; // VCNo
  smsId: string; // SMSID
  subscriberName: string; // SubscriberName
  address: string; // Address1 + Address2
  city: string; // CityName
  state: string; // StateName
  mobileType: "RMN" | "MOB1" | "MOB2" | "MOB3"; // Which slot this mobile belongs to
}

/**
 * One connection entry from the GoMulti parent/child query.
 * Maps to usp_CustomerService_GetParentChildDetails result row.
 */
export interface GoMultiConnection {
  smsId: string;
  vcNumber: string;
  parentSmsId: string;
  parentVcNo: string;
  status: string;
  subscriberName: string;
  modelType: string;
  boxType: string;
}

/**
 * The dual-resultset return from usp_CustomerService_GetParentChildDetails.
 * ResultSet 1 = parent connections, ResultSet 2 = child connections.
 */
export interface GoMultiResult {
  parentConnections: GoMultiConnection[];
  childConnections: GoMultiConnection[];
}

/**
 * The discriminated union returned by SearchCustomerUseCase.execute().
 *
 * type: 'single'      → one subscriber found, proceed to load 360 view
 * type: 'multi_match' → mobile/email linked to multiple accounts; show picker
 * type: 'not_found'   → no subscriber matched
 */
export type SearchResult =
  | { type: "single"; subscriber: Customer; goMulti?: GoMultiResult }
  | { type: "multi_match"; candidates: SearchSubsDetails[] }
  | { type: "not_found" };
