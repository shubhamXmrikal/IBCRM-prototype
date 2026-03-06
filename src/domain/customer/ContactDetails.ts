export interface MobileDetail {
  rid?: string; // rowid/RID
  smsId: string;
  vcNo: string;
  mobileNo: string;
  source: string;
  type: string; // mobile/landline
  relationship: string;
  relationshipId: string;
  classification?: string;
  classificationId?: string;
  authorityLevel?: number;
  administrativeRight?: number;
  active: boolean;
  status: string;
  statusCode?: string;
  createdByName?: string;
  createdOn?: Date;
  modifiedByName?: string;
  modifiedOn?: Date;
  priority?: number;
  boxPlaceRemarks?: string;
  cvFlag?: number;
  clientIpAddress?: string;
}

export interface RelationshipMaster {
  id: string; // RID
  name: string; // RelationshipName
}

export interface DealerContactDetails {
  glCode: string;
  userId: number;
  email: string;
  mobileNo: string;
  company: string;
  contactNo1?: string;
  contactNo2?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
  contactUpdCount?: number;
  isContactUpd?: boolean;
  status?: string;
  statusCode?: string;
}

export interface ContactAuditLog {
  smsId: string;
  mobileNo?: string;
  telephoneOffice?: string;
  telephoneResidence?: string;
  email?: string;
  createdOn: Date;
  createdBy: string;
  centerId?: string;
  oldAddress?: string;
  newAddress?: string;
  newSubsName?: string;
  remarks?: string;
}

export interface TelephonyEvent {
  callerNo: string;
  vcNo: string;
  smsId: string;
  event: string; // "CONNECTED", "DROPPED", etc.
  agentId: string;
  remarks?: string;
  userId: number;
  source: string;
  calledNo: string;
  subscriberName: string;
}
