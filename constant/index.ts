export const TENANTS = {
  LAKSHADWEEP: "lakshadweep",
  HELIYATRA: "heliyatra",
}

export const isComingSoon = process.env.NEXT_PUBLIC_ENABLE_COMING_SOON === "true"
export const APP_NAME = "WEB"
export const MAX_INFANT_AGE = 1
export const isBookingEnabled = process.env.NEXT_PUBLIC_ENABLE_BOOKING === "true"
export const GACAPTCHA_TOKEN = process.env.NEXT_PUBLIC_GACAPTCHA || ""
export const retryRazorpay = process.env.NEXT_PUBLIC_RAZORPAY_RETRY === "true"
export const isHemkundEnabled = process.env.NEXT_PUBLIC_ENABLE_HEMKUND === "true"
export const isDestinationIdEnabled = process.env.NEXT_PUBLIC_ENABLE_DESTINATION_ID === "true"
export const isKedarnathEnabled = process.env.NEXT_PUBLIC_ENABLE_KEDARNATH === "true"
export const TIME_ZONE = "Asia/Kolkata"
export const TIME_FORMAT = "yyMMdd-HHmm"
export const maxHeliyatraBooking = "Sat Oct 31 2025 05:30:00 GMT+0530 (India Standard Time)"

export const PAYMENT_GATEWAYS = {
  RAZORPAY: "RAZORPAY",
  PAY: "PAY",
}

export const RDS_REPORT_TYPE = {
  ACCOUNTING: "accounting-report",
  DEPOSIT: "deposit-report",
}

export const OPTIONAL_STRING_FILTERS = ["groupId", "remarks", "paymentStatus"]

export const DESTINATIONS = {
  KEDARNATH: {
    id: "167903176039829108",
    name: "Shri Kedarnath Dham",
    headerImg: "https://neon.ipsator.com/c/image/upload/q_75/v1715930019/heliyatra/images/kedarnath-img-572x300.webp",
    bgImg: "https://neon.ipsator.com/c/image/upload/q_75/v1680679106/heliyatra/images/bg-kedarnath-2.webp",
  },
  HEMKUND: {
    id: "171603479546087700",
    name: "Shri Hemkund Sahib",
    headerImg: "https://neon.ipsator.com/c/image/upload/q_75/v1715930018/heliyatra/images/hemkund-sahib-572x300.webp",
    bgImg: "https://neon.ipsator.com/c/image/upload/q_75/v1715930018/heliyatra/images/hemkund-sahib-572x300.webp",
  },
}

export const defaultDestinationId = process.env.NEXT_PUBLIC_DESTINATION_ID || DESTINATIONS.KEDARNATH.id

export const indianStates = [
  { value: "andhra_pradesh", label: "Andhra Pradesh" },
  { value: "arunachal_pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal_pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya_pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil_nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar_pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west_bengal", label: "West Bengal" },
]

export const passwordRules = [
  {
    label: "At least 8 characters",
    check: (val: string) => val.length >= 8,
  },
  {
    label: "Contains both uppercase and lowercase letters",
    check: (val: string) => /[A-Z]/.test(val) && /[a-z]/.test(val),
  },
  {
    label: "Includes a number (0–9)",
    check: (val: string) => /\d/.test(val),
  },
  {
    label: "Includes a symbol (e.g. !, @, #, $)",
    check: (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
  },
]
