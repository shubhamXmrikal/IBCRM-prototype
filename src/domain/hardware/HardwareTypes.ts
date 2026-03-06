export interface STBDetail {
  stbNumber: string;
  modelName: string;
  brandName: string;
  boxCategory: string; // Standard, DishNxt, etc.
  modelType: "SD" | "HD" | "4K";
  warrantyStatus: "IN_WARRANTY" | "EXPIRED";
  isDVRReady: boolean;
  isMonoBlock: boolean;
  chipSide?: string; // STB Position (Top/Bottom/Internal)
}

export type SwapType = "STANDARD" | "DOA" | "DISHFLIX";

export interface STBSwapRequest {
  id?: string;
  vcNumber: string;
  oldSTBNo: string;
  newSTBNo: string;
  swapType: SwapType;
  ticketId: string;
  faultCode: string;
  technicianId?: string;
  isAdapterReturned: boolean;
  isRemoteReturned: boolean;
  isAdapterFaulty: boolean;
  stbAdapterBrandId?: string;
  remarks: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  newVCNo?: string; // For TOC scenarios where VC also changes
  createdOn?: Date;
}

export interface CompatibilityResult {
  isRemoteCompatible: boolean;
  isAdapterCompatible: boolean;
  message?: string;
}

export interface DVRActivation {
  smsId: string;
  vcNumber: string;
  stbNumber: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  requestedOn: Date;
  processedOn?: Date;
}

export interface HardwareVoucherResult {
  isVoucherRequired: boolean;
  isOldStb: boolean;
  newSTBSchemeID?: string;
}
