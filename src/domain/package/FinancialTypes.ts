export interface SOAHeader {
  balance: number;
  monthlyRecharge: number;
  bonusPoints: number;
  switchOffDate: Date;
  gstIn?: string;
  packNamePrice: string;
  statementPeriod: string;
}

export interface SOATransaction {
  id: string;
  date: Date;
  type: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  referenceNo: string;
  periodFrom?: Date;
  periodTo?: Date;
}

export interface ServiceEntity {
  id: string;
  name: string;
  type: "DCC" | "DEALER" | "DISTRIBUTOR";
  company: string;
  phone: string;
  email: string;
  address: string;
  escalation: {
    ase?: { name: string; phone: string; email: string };
    csm?: { name: string; phone: string; email: string };
    dsm?: { name: string; phone: string; email: string };
    opsManager?: { name: string; phone: string; email: string };
  };
}

export interface ChannelDetail {
  code: string;
  name: string;
  isHD: boolean;
  isHighSecurity: boolean;
  category: string;
  requiresThreeSatellite: boolean;
}

export interface GeographyMaster {
  stateId: string;
  stateName: string;
  districts: DistrictMaster[];
}

export interface DistrictMaster {
  id: string;
  name: string;
  cities: CityMaster[];
}

export interface CityMaster {
  id: string;
  name: string;
  areas: string[];
}

export interface WaiverRequest {
  id: string;
  vcNumber: string;
  smsId: string;
  amount: number;
  reasonId: string;
  reasonName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedBy: string;
  requestedOn: Date;
  remarks: string;
  approvedBy?: string;
  approvedOn?: Date;
}

export interface WaiverReason {
  id: string;
  name: string;
}

export interface PaymentReceipt {
  id: string;
  date: Date;
  amount: number;
  mode: "CASH" | "CHEQUE" | "ONLINE" | "UPI";
  type: "CR" | "DR";
  bank?: string;
  referenceNo: string;
  status: string;
}

export interface GraceChargeInfo {
  applies: boolean;
  totalAmount: number;
  preTaxAmount: number;
  taxAmount: number;
}

export interface OutstandingBalance {
  general: number;
  installation: number;
  serviceCall: number;
  payLater: number;
}
