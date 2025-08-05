import { format } from "date-fns"

import { getCurrentIstDate } from "@/lib/utils"

type NavLink = {
  icon: string
  label: string
  name?: string
  href: string
  permission?: string
}

const openLinks: NavLink[] = [
  {
    icon: "pointer",
    label: "Verify Booking",
    name: "Verify Booking",
    href: "/verify-booking",
  },
]

export const profileLink: NavLink[] = [
  {
    icon: "circleUser",
    label: "Profile",
    href: "/app/profile",
  },
]

const customerLinks: NavLink[] = [
  {
    icon: "search",
    label: "Search",
    name: "Book Ticket",
    href: "/app/trip/search",
  },
  {
    icon: "send",
    label: "Bookings",
    name: "View Your Bookings",
    href: "/app/booking",
  },
  ...openLinks,
]

const adminLinks: NavLink[] = [
  {
    icon: "file-spreadsheet",
    label: "Reports",
    name: "Check Reports",
    href: "/app/reports",
  },
  {
    icon: "flightSeat",
    label: "DMFQ",
    name: "Manage DM flexi",
    href: "/app/manage-dm-flexi",
  },
  ...openLinks.filter((link) => link.label !== "Verify Booking"),
]
export const buildPermissionNavLinks = {
  IRCTC_EQ_ALLOTMENT_SEARCH: {
    icon: "flightSeat",
    label: "UEQ",
    name: "UEQ",
    href: "/app/manage-ueq",
  },
  EQ_ALLOTMENT_SEARCH: {
    icon: "flightSeat",
    label: "EQ",
    name: "Manage EQ",
    href: "/app/manage-eq",
  },
}
export const buildNavLinks = () => ({
  NO_USER: [
    {
      icon: "pointer",
      label: "Verify Booking",
      name: "Verify Booking",
      href: "/verify-booking",
    },
    {
      icon: "login",
      label: "Login",
      href: "/auth",
    },
  ],
  UCADA_UEQ: [
    {
      icon: "file-spreadsheet",
      label: "Reports",
      name: "Check Reports",
      href: "/app/reports",
    },
    {
      icon: "flightSeat",
      label: "DMFQ",
      name: "Manage DM flexi",
      href: "/app/manage-dm-flexi",
    },
    ...openLinks.filter((link) => link.label !== "Verify Booking"),
  ],
  CUSTOMER: customerLinks,
  AGENT: [...customerLinks],
  COUNTER: [
    {
      icon: "search",
      label: "Search",
      name: "Book Ticket",
      href: `/app/trip/slot-select?travelDate=${format(getCurrentIstDate(), "yyyy-MM-dd")}`,
    },
    {
      icon: "send",
      label: "Bookings",
      name: "View Your Bookings",
      href: "/app/booking",
      permission: "BOOKING_REPORT",
    },
    {
      icon: "file-spreadsheet",
      label: "Reports",
      name: "Check Reports",
      href: "/app/reports",
    },
    {
      icon: "flightSeat",
      label: "Seat",
      name: "Add Seats",
      href: "/app/manage-slots",
    },
    ...openLinks,
  ],
  UCADA_ADMIN: [...adminLinks],
  IRCTC_ADMIN: [
    {
      icon: "send",
      label: "Bookings",
      name: "View Your Bookings",
      href: "/app/booking",
    },
    {
      icon: "flightSeat",
      label: "Upload",
      name: "Upload",
      href: "/app/upload-booking",
    },
    {
      icon: "flightSeat",
      label: "Inventory",
      name: "",
      href: "/app/inventory",
    },
    {
      icon: "fees",
      label: "Landing Fee",
      name: "",
      href: "/app/landing-fees",
    },
    ...adminLinks,
  ],
  SHUTTLE_OPERATOR: [
    {
      icon: "search",
      label: "Search",
      name: "Book Ticket",
      href: `/app/trip/slot-select?travelDate=${format(getCurrentIstDate(), "yyyy-MM-dd")}`,
    },
    {
      icon: "send",
      label: "Bookings",
      name: "View Your Bookings",
      href: "/app/booking",
      permission: "BOOKING_REPORT",
    },
    {
      icon: "file-spreadsheet",
      label: "Reports",
      name: "Check Reports",
      href: "/app/reports",
    },
    {
      icon: "flightSeat",
      label: "Seat",
      name: "Add Seats",
      href: "/app/manage-slots",
    },
    {
      icon: "flightSeat",
      label: "DMFQ",
      name: "Manage DM flexi",
      href: "/app/manage-dm-flexi",
    },
    ...openLinks,
  ],
  CHARTER_OPERATOR: [
    {
      icon: "search",
      label: "Charter",
      name: "Book Charter",
      href: "/app/charter",
    },
    {
      icon: "file-spreadsheet",
      label: "Reports",
      name: "Check Reports",
      href: "/app/reports",
    },
    {
      icon: "send",
      label: "Bookings",
      name: "View Your Bookings",
      href: "/app/booking",
      permission: "BOOKING_REPORT",
    },
    ...openLinks,
  ],
  default: [...openLinks],
})

const openAppPaths = openLinks.map((link) => link.href)

export const buildRedirectPath = () => {
  const navLinks = buildNavLinks()
  return {
    CUSTOMER: navLinks.CUSTOMER[0].href,
    UCADA_ADMIN: navLinks.UCADA_ADMIN[0].href,
    CHARTER_OPERATOR: navLinks.CHARTER_OPERATOR[0].href,
    COUNTER: navLinks.COUNTER[0].href,
    SHUTTLE_OPERATOR: navLinks.SHUTTLE_OPERATOR[0].href,
    default: "/",
  }
}

export const getNavLinks = (userType: string) => {
  const navLinks = buildNavLinks()
  const links: NavLink[] = navLinks[userType] || navLinks.default
  return links.filter((link) => (userType === "CUSTOMER" || userType === "SHUTTLE_OPERATOR" ? link.icon !== "search" : true))
}

export const getHomePageAction = (userType: string, destinationId?: string) => {
  const navLinks = buildNavLinks()
  const links: NavLink[] = navLinks[userType] || navLinks.CUSTOMER
  let actionLink = links.find((link) => link.href.includes("app/trip"))
  if (destinationId && actionLink) {
    const containsParams = actionLink.href.includes("?")
    actionLink = {
      ...actionLink,
      href: `${actionLink.href}${containsParams ? "&" : "?"}destinationId=${destinationId}`,
    }
  }
  return actionLink
}

export const getRedirectPath = (userType: string) => {
  const redirectPath = buildRedirectPath()
  const path = redirectPath[userType] || redirectPath.default
  return path
}
