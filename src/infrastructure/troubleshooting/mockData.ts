import { TroubleshootingCategory } from "../../domain/troubleshooting";

export const MOCK_TROUBLESHOOTING_CATEGORIES: TroubleshootingCategory[] = [
  { id: "1161", name: "101. CHANNEL NOT SUBSCRIBED", isSMRT: false, statusColor: "WHITE" },
  { id: "102", name: "102. NO ACCOUNT BALANCE", isSMRT: false, statusColor: "RED" },
  { id: "1173", name: "103. UPGRADE TO HD PACK", isSMRT: false, statusColor: "YELLOW" },
  { id: "840", name: "201. VIEWING CARD ERROR", isSMRT: false, statusColor: "GREEN" },
  { id: "956", name: "301. SIGNAL NOT FOUND", isSMRT: false, statusColor: "BLUE" },
  { id: "1440", name: "302. SIGNAL UNAVAILABLE", isSMRT: false },
  { id: "946", name: "303. NOT INSTALLED", isSMRT: false },
  { id: "304", name: "304. TECHNICAL ERROR", isSMRT: false },
  { id: "1579", name: "401. VIEWING CARD NOT FOUND", isSMRT: false },
  { id: "117", name: "STB FAULTY / NOT WORKING", isSMRT: false },
  { id: "811", name: "PICTURE NOT CLEAR", isSMRT: false },
  { id: "743", name: "BLANK SCREEN", isSMRT: false },
  { id: "942", name: "AUDIO PROBLEM", isSMRT: false },
  { id: "1493", name: "REMOTE AUTOMATION", isSMRT: false },
  { id: "2", name: "NO INTERNET (Android)", isSMRT: true },
  { id: "SMRT_1", name: "SMRT STICK NOT WORKING", isSMRT: true },
];
