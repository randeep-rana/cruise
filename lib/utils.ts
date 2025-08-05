import { TIME_ZONE } from "@/constant"
import { ClassValue, clsx } from "clsx"
import { addDays, format, getDate } from "date-fns"
import { utcToZonedTime } from "date-fns-tz"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce(func, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formattedAvailableSeats(seatsAvailable: number): string {
  if (seatsAvailable) {
    if (seatsAvailable > 5) {
      return "#006B58"
    } else if (seatsAvailable > 2) {
      return "#EE9744"
    } else {
      return "#BA1A1A"
    }
  }
}

export function onlyDoubleDigitValues(value) {
  return value > 10 ? value : `0${value}`
}

export function getReadableTime(time) {
  return format(new Date(time), "hh:mm a")
}

export function convertToIST(date) {
  return utcToZonedTime(new Date(date), TIME_ZONE)
}

function convertDateFormat(date?: Date | string) {
  const dateObject = new Date(date)
  const month = ("0" + (dateObject.getMonth() + 1)).slice(-2)
  const day = ("0" + dateObject.getDate()).slice(-2)
  const year = dateObject.getFullYear()
  return `${year}-${month}-${day}`
}

export function getReadableDate(time) {
  return convertDateFormat(time).split("-").reverse().join("/")
}

export function getReadableDateTime(time) {
  return getReadableDate(time) + " " + getReadableTime(time)
}

export function getFomattedTodayDate(): string {
  console.log("TestCalenderIssue2", convertToIST(new Date()))
  return convertDateFormat(convertToIST(new Date()))
}

export function getFormattedTomorrowDate(): string {
  const tomorrow = addDays(new Date(), 1)
  return convertDateFormat(convertToIST(tomorrow))
}

export function getCurrentIstDate(): Date {
  return convertToIST(new Date())
}

export function getDateText(date?: Date) {
  return date ? format(date, "dd MMMM yyyy") : ""
}

export function getDateInWords(date?: Date | string) {
  if (date) {
    return `${getDate(new Date(date))}, ${new Date(date).toLocaleString("default", { month: "long" }).substring(0, 3)} ${new Date(
      date
    ).getFullYear()}`
  }
  return undefined
}

/**
 * Generate an array of dates in YYYY-MM-DD format between two dates (inclusive)
 * @param {Date|string} startDate - The start date
 * @param {Date|string} endDate - The end date
 * @returns {string[]} - Array of dates in YYYY-MM-DD format
 */
export function generateDateRange(startDate: Date | string, endDate: Date | string) {
  // Convert input dates to Date objects if they're strings
  let start = startDate instanceof Date ? startDate : new Date(startDate)
  const end = endDate instanceof Date ? endDate : new Date(endDate)
  // Array to store the dates
  const dateArray = []
  start.setHours(12, 0, 0, 0)
  end.setHours(12, 0, 0, 0)
  // Clone the start date
  const currentDate = new Date(start)

  // Loop until we reach the end date (inclusive)
  while (currentDate <= end) {
    // Format the date as YYYY-MM-DD and add to array
    const formattedDate = DateFormatter(currentDate)
    dateArray.push(formattedDate)

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dateArray
}

export const DateFormatter = (date: Date) => {
  date.setHours(12, 0, 0, 0)
  return date.toISOString().split("T")[0]
}

export function formatDateToAMPM(dateString, returnType = "monthName") {
  // Validate the date string
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided")
  }

  // Get the full date components based on returnType
  let month
  let day = date.getDate()
  let year = date.getFullYear()

  // For yyyy-mm-dd format, ensure month and day are two digits
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0") // Months are 0-based
  const formattedDay = day.toString().padStart(2, "0")

  switch (returnType) {
    case "monthName":
      month = date.toLocaleString("default", { month: "long" })
      break
    case "shortMonth":
      month = date.toLocaleString("default", { month: "short" })
      break
    case "numeric":
      month = date.getMonth() + 1
      break
    case "yyyy-mm-dd":
      // For yyyy-mm-dd, we'll handle the date part separately in the return statement
      break
    default:
      throw new Error(`Unsupported returnType: ${returnType}`)
  }

  // Get hours and minutes (in local timezone)
  let hours = date.getHours()
  const minutes = date.getMinutes()

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM"

  // Convert hours to 12-hour format
  hours = hours % 12
  hours = hours ? hours : 12 // Handle 0 hours case (midnight)

  // Format minutes to always show two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  // Combine everything into a formatted string based on returnType
  if (returnType === "numeric") {
    return `${month}/${day}/${year} ${hours}:${formattedMinutes} ${ampm}`
  } else if (returnType === "yyyy-mm-dd") {
    return `${year}-${formattedMonth}-${formattedDay} ${hours}:${formattedMinutes} ${ampm}`
  }
  return `${month} ${day}, ${year} ${hours}:${formattedMinutes} ${ampm}`
}
