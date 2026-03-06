import { MovieProduct, MODRequest, ModKitty } from "../../domain/mod/MODTypes";

export const mockMovieCatalogue: MovieProduct[] = [
  {
    id: "M101",
    name: "Pathaan (MOD)",
    price: 120,
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-31"),
    category: "MOD",
    requiresThreeSatellite: false
  },
  {
    id: "M102",
    name: "Avatar: The Way of Water",
    price: 150,
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-31"),
    category: "MOD",
    requiresThreeSatellite: true
  },
  {
    id: "P201",
    name: "IPL 2026: Match 12 - DC vs MI",
    price: 49,
    startDate: new Date("2026-03-28T19:30:00"),
    endDate: new Date("2026-03-28T23:30:00"),
    category: "PPV",
    requiresThreeSatellite: false
  },
  {
    id: "M103",
    name: "John Wick: Chapter 4",
    price: 100,
    startDate: new Date("2026-03-15"),
    endDate: new Date("2026-04-15"),
    category: "MOD",
    requiresThreeSatellite: false
  }
];

export const mockMODRequests: MODRequest[] = [
  {
    id: "REQ_MOD_991",
    vcNumber: "09100000001", // Rahul Sharma
    productId: "M101",
    productName: "Pathaan (MOD)",
    status: "AUTHORIZED",
    requestDate: new Date("2026-03-05T14:00:00"),
    startDate: new Date("2026-03-05"),
    endDate: new Date("2026-03-06"),
    price: 120,
    payMode: "BALANCE",
    doneBy: "AGENT_001",
    internalId: "INT_112233"
  }
];

export const mockModKitty: Record<string, ModKitty> = {
  "41200100": { // Rahul Sharma
    smsId: "41200100",
    balance: 3,
    usedCount: 1,
    validUntil: new Date("2026-12-31")
  }
};
