export interface MovieProduct {
  id: string;
  name: string;
  price: number;
  startDate: Date;
  endDate: Date;
  category: "MOD" | "PPV";
  requiresThreeSatellite: boolean;
  posterUrl?: string;
}

export interface MODRequest {
  id: string;
  vcNumber: string;
  productId: string;
  productName: string;
  status: "AUTHORIZED" | "EXPIRED" | "FAILED" | "PENDING";
  requestDate: Date;
  startDate: Date;
  endDate: Date;
  price: number;
  payMode: "BALANCE" | "KITTY" | "CASH";
  doneBy: string;
  internalId: string;
}

export interface ModKitty {
  smsId: string;
  balance: number; // Number of free movies remaining
  usedCount: number;
  validUntil: Date;
}

export interface ModValidationResult {
  isEligible: boolean;
  reason?: string;
}
