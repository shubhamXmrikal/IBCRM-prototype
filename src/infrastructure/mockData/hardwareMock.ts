import { STBDetail, STBSwapRequest, DVRActivation } from "../../domain/hardware/HardwareTypes";

export const mockSTBInventory: STBDetail[] = [
  {
    stbNumber: "2101XYZ45PQ19001", // Rahul's Current
    modelName: "HD-S2",
    brandName: "DishTV",
    boxCategory: "Standard",
    modelType: "HD",
    warrantyStatus: "IN_WARRANTY",
    isDVRReady: true,
    isMonoBlock: false,
    chipSide: "Top"
  },
  {
    stbNumber: "1946ADE23LT19444", // Jaffer's Current
    modelName: "D-7000",
    brandName: "DishTV",
    boxCategory: "DishNxt",
    modelType: "HD",
    warrantyStatus: "EXPIRED",
    isDVRReady: false,
    isMonoBlock: true,
    chipSide: "Internal"
  },
  {
    stbNumber: "STB9876PRIYA0001", // Priya's Current
    modelName: "4K-ULTRA",
    brandName: "DishTV",
    boxCategory: "DishNxt HD",
    modelType: "4K",
    warrantyStatus: "IN_WARRANTY",
    isDVRReady: true,
    isMonoBlock: false,
    chipSide: "Bottom"
  },
  // Replacement Stock
  {
    stbNumber: "NEW_STB_001",
    modelName: "HD-S3",
    brandName: "DishTV",
    boxCategory: "Standard",
    modelType: "HD",
    warrantyStatus: "IN_WARRANTY",
    isDVRReady: true,
    isMonoBlock: false
  },
  {
    stbNumber: "NEW_STB_002",
    modelName: "D-8000",
    brandName: "DishTV",
    boxCategory: "DishNxt",
    modelType: "HD",
    warrantyStatus: "IN_WARRANTY",
    isDVRReady: true,
    isMonoBlock: false
  }
];

export const mockPairingIndex: Record<string, string> = {
  "09100000001": "2101XYZ45PQ19001",
  "02563029393": "1946ADE23LT19444",
  "07800009999": "STB9876PRIYA0001"
};

export const mockSwapRequests: STBSwapRequest[] = [];

export const mockDVRActivations: DVRActivation[] = [
  {
    smsId: "55301890", // Priya
    vcNumber: "07800009999",
    stbNumber: "STB9876PRIYA0001",
    status: "ACTIVE",
    requestedOn: new Date("2025-12-15")
  }
];

export const mockAdapterBrands = [
  { id: "1", name: "Samsung" },
  { id: "2", name: "LG" },
  { id: "3", name: "Delta" },
  { id: "4", name: "In-House" }
];
