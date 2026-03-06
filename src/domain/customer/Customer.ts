export type CustomerStatus = "ACTIVE" | "DEACTIVE" | "SUSPENDED";

/**
 * CallerMobType — set by the telephony screen-pop.
 * Maps to CallerMobType from usp_CUSTOMERSERVICE_GetSubscriberInfo_Final.
 * "RMN" = caller's number matches the registered mobile → higher trust
 */
export type CallerMobType = "RMN" | "ALT" | "UNKNOWN" | "NONE";

export interface Customer {
  // ── Identity (from usp_CUSTOMERSERVICE_GetSubscriberInfo_Final) ──
  id: string; // smsid — internal Subscriber Management System ID
  vcNumber: string; // vcno  — VC/smart-card number (primary search key)
  smsId: string; // alias of id, kept explicit for clarity

  name: string; // name

  // ── Address ──
  address: {
    line1: string; // address1 (H.No / Apt)
    line2?: string; // address2 (Lane / Street)
    landmark: string;
    pin: string; // pincode
    city: string; // City
    district: string; // District
    state: string; // State
    localityId?: string; // LocalityID
  };

  // ── Contact ──
  contact: {
    rmn: string; // RMNNo  — Registered Mobile Number
    mobile1: string; // PhoneMobile
    mobile2?: string; // PhoneMobile2
    mobile3?: string; // PhoneMobile3
    email: string; // email
    isEmailConfirmed: boolean; // IsEmailConfirmed
    telephoneRes?: string; // PhoneRes
    telephoneOff?: string; // phoneOffic
    facebook?: string; // Facebook
    twitter?: string; // Twitter
    linkedin?: string; // Linked_in
    termsOfConsent: boolean; // TOC
    // Which mobile slots are RMN-registered
    isRMNMob1: boolean; // IsRMNMob1
    isRMNMob2: boolean; // IsRMNMob2
    isRMNMob3: boolean; // IsRMNMob3
    // Which mobile slots are DNC-registered (Do Not Call)
    isDNCMob1: boolean; // IsDNCMob1
    isDNCMob2: boolean; // IsDNCMob2
    isDNCMob3: boolean; // IsDNCMob3
  };

  // ── Technical / Hardware ──
  technical: {
    stbNumber: string; // stbno
    stbModel: string; // ModelName
    brandName?: string; // brand
    modelType?: string; // ModelType  (e.g., "MPEG4", "HD")
    boxCategory?: string; // BoxCategory (e.g., "DishNxt")
    warrantyStatus: string; // WarrantyStatus ("Y"/"N"/"EXPIRED")
    instWarranty?: string; // InstWarranty
    vcLocation: string; // derived from BrandName + ModelType
    amcStartDate?: string; // amc_start_date
    amcExpireDate?: string; // amc_expiry_date
  };

  // ── Account Metrics ──
  metrics: {
    status: CustomerStatus; // status (1=ACTIVE, 2=DEACTIVE, 3=SUSPENDED)
    deDays: string; // DEDays
    activationDate: Date; // fl_createdon
    switchOffDate: Date; // Last_de_re_date
    rechargeDate: Date; // Recharge_date (next due date)
    lastRechargeDate?: Date; // last_recharge_date
    customerType: string; // TOC (Type of Customer Name)
    customerTypeId: number; // typeofcustomerrowid
    paytermName: string; // Payterm
    dealerName?: string; // DealerName
    zoneCode?: string; // zoneCode
    schemeCode?: string; // schemeCode
    packageName?: string; // PackageName
  };

  // ── Financial ──
  financial: {
    lastPaymentAmount: number;
    lastPaymentMode: string; // e.g., 'CL'
    lastPaymentDate: Date;
    dccSf: string; // DCC/SF string
    topCategory: string; // Wallet/Top Category
    fmrValue?: number; // FMRValue — current monthly recurring value
    isAutoRecharge: boolean; // IsAutoRecharge
    isPayLaterActive: boolean; // IsPayLaterActive
    isEligibleForPayLater: boolean; // IsEligibleForPayLater
  };

  // ── Caller Context (from telephony screen-pop) ──
  callerContext: {
    callerMobileNo?: string; // CallerMob — CLI from telephony
    callerMobType: CallerMobType; // CallerMobType
    callerRelationship?: string; // CallerRelationship
    callerAuthority?: string; // CallerAuthority
    verifierKey?: string; // VerifierKey — security hash for subsequent ops
    isCustomerVerified: boolean; // CustomerVerified
    kycStatus?: "PENDING" | "VERIFIED" | "FAILED" | "WOB"; // Link to KYC profiles
    failedAttempts?: number;
  };

  // ── Flags ──
  flags: {
    isVIPCustomer: boolean; // VIPCust
    isFTASubscriber: boolean; // IsFTASubscriber
    isDishPlusSubs: boolean; // IsDishPlusSubs
    isHDSubs: boolean; // IsHDSubs
    isPostPaidCust: boolean; // IsPostPaidCust
    isCorporate: boolean; // Corporate_Flag
    isContractualSubs: boolean; // IsContractualSubs
    isPreferred: boolean; // Preffered_customer
    isDelightCust: boolean; // IsDelightCust
    isDishFlix: boolean; // IsDishFlix
    isCAS5: boolean; // IsCAS5
    isBillable: boolean; // IsBillable
    isWOFlag: boolean; // WOFlag (Write-off)
  };

  // ── GoMulti ──
  isGoMulti: boolean; // true if parentVCNo is set OR has children
  parentVCNo?: string; // ParentVCNO — set if this is a child connection

  alerts: CustomerAlert[];
}

export interface CustomerAlert {
  id: string;
  message: string;
  type: "INFO" | "WARNING" | "PROMO" | "ERROR";
  createdAt: Date;
}
