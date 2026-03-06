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
