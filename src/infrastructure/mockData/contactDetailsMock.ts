import {
  MobileDetail,
  RelationshipMaster,
  DealerContactDetails,
  ContactAuditLog,
} from "../../domain/customer/ContactDetails";

export const mockRelationshipMasters: RelationshipMaster[] = [
  { id: "1", name: "SELF" },
  { id: "2", name: "SPOUSE" },
  { id: "3", name: "SON" },
  { id: "4", name: "DAUGHTER" },
  { id: "5", name: "FATHER" },
  { id: "6", name: "MOTHER" },
  { id: "7", name: "BROTHER" },
  { id: "8", name: "SISTER" },
  { id: "9", name: "FRIEND" },
  { id: "10", name: "OTHER" },
];

export const mockMobileDetails: MobileDetail[] = [
  {
    rid: "1001",
    smsId: "41200100",
    vcNo: "09100000001",
    mobileNo: "9999900001",
    source: "WEB",
    type: "MOBILE",
    relationship: "SELF",
    relationshipId: "1",
    classification: "PRIMARY",
    classificationId: "1",
    authorityLevel: 1,
    administrativeRight: 1,
    active: true,
    status: "ACTIVE",
    createdByName: "SYSTEM",
    createdOn: new Date("2021-03-25"),
    priority: 1,
  },
  {
    rid: "1002",
    smsId: "41200100",
    vcNo: "09100000001",
    mobileNo: "9999900002",
    source: "IVR",
    type: "MOBILE",
    relationship: "SPOUSE",
    relationshipId: "2",
    classification: "SECONDARY",
    classificationId: "2",
    authorityLevel: 2,
    active: true,
    status: "ACTIVE",
    createdByName: "AGENT_007",
    createdOn: new Date("2022-05-10"),
    priority: 2,
  },
];

export const mockDealerContactDetails: Record<string, DealerContactDetails> = {
  "GL001": {
    glCode: "GL001",
    userId: 101,
    email: "dealer1@dishtv.in",
    mobileNo: "9810012345",
    company: "CHOPRA ELECTRONICS",
    contactNo1: "011-22334455",
    modifiedOn: new Date("2024-01-15"),
    modifiedBy: "ADMIN",
    contactUpdCount: 2,
    isContactUpd: false,
  },
};

export const mockContactAuditLogs: ContactAuditLog[] = [
  {
    smsId: "41200100",
    mobileNo: "9999900001",
    email: "rahul.sharma@gmail.com",
    createdOn: new Date("2024-02-10T10:30:00"),
    createdBy: "AGENT_X",
    centerId: "DEL_01",
    remarks: "Updated email address",
  },
];
