export type TroubleshootingStatusColor = 'RED' | 'YELLOW' | 'GREEN' | 'WHITE' | 'BLUE';

export interface TroubleshootingCategory {
  id: string;
  name: string;
  isSMRT: boolean;
  statusColor?: TroubleshootingStatusColor;
  boxCategory?: number;
}

export interface DiagnosticStep {
  id: string;
  categoryId: string;
  stepNo: string;
  process: string;
  script: string;
  options: DiagnosticOption[];
}

export interface DiagnosticOption {
  label: string;
  nextStepId?: string;
  action?: 'COMPLETE' | 'TECHNICIAN_VISIT' | 'REPAIR' | 'OTA';
  caseHistorySnippet: string;
}
