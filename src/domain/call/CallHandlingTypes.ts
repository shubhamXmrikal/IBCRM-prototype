export interface CallCategoryNode {
  id: string;
  label: string;
  parentId?: string;
  isLeaf: boolean;
  legacyValue?: string; // Maps to CategoryMaster.xml <value>
  isCallDropCategory: boolean; // Triggers Module 11 Callback logic
}

export interface CallClosureRequest {
  vcNumber: string;
  agentId: string;
  categoryId: string; // Must be a leaf node
  remarks: string; // Typed as "ramarks" conceptually for legacy mapping
  interactionType: "INBOUND" | "OUTBOUND";
  isResolved: boolean;
}

export interface OutboundCampaignEntry {
  id: string;
  vcNumber: string;
  campaignName: string;
  callDate: Date;
  status: string;
  agentName: string;
  feedback: string;
}

export interface ComplaintEntry {
  id: string;
  status: 'OPEN' | 'RESOLVED' | 'CLOSED' | string;
  subject: string;
  description: string;
  createdOn: string | Date;
  createdBy: string;
}
