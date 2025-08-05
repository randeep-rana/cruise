import { useCallback, useEffect, useReducer } from "react"
import { MAX_INFANT_AGE } from "@/constant"

import { Booking, Ship } from "@/config/types"
import { useRequest } from "./useRequest"
import { useStorage } from "./useStorage"

const MAX_ADULT_SEATS = 10
const MAX_INFANT_SEATS = 10

type BookingType = "GENERAL" | "VIP"
type Passenger = {
  name: string
  age: number
  gender: string
  relation: string
  isDisablePerson: boolean
  isChecked?: boolean
}

type ShipCartState = {
  step: string
  adultPassengers: Passenger[]
  infantPassengers: Passenger[]
  ship: Ship | null
  booking: Booking | null
  maxAdultSeats: number
  maxInfantSeats: number
  adultLimit: number
  infantLimit: number
  bookingType: BookingType
  availableAdults: Passenger[]
  availableInfants: Passenger[]
}

const initialShipCartState: ShipCartState = {
  step: "step-1",
  adultPassengers: [],
  infantPassengers: [],
  ship: null,
  booking: null,
  maxAdultSeats: 3,
  maxInfantSeats: 0,
  adultLimit: MAX_ADULT_SEATS,
  infantLimit: MAX_INFANT_SEATS,
  bookingType: "GENERAL",
  availableAdults: [
    {
      name: "John Doe",
      age: 30,
      gender: "Male",
      relation: "self",
      isDisablePerson: false,
    },
    {
      name: "Jane Doe",
      age: 30,
      gender: "female",
      relation: "sister",
      isDisablePerson: false,
    },
    {
      name: "Eric",
      age: 30,
      gender: "Male",
      relation: "brother",
      isDisablePerson: false,
    },
  ],
  availableInfants: [],
}

type Action =
  | { type: "ADD_PASSENGER"; payload: Passenger }
  | { type: "REMOVE_PASSENGER"; payload: Passenger }
  | { type: "SET_SEAT_LIMITS"; payload: { adultLimit: number; infantLimit: number } }
  | { type: "SET_SHIP"; payload: Ship }
  | { type: "SET_BOOKING"; payload: Booking }
  | { type: "SET_BOOKING_TYPE"; payload: BookingType }
  | { type: "SET_STEP"; payload: string }
  | { type: "ABANDON_BOOKING"; payload: { step?: string } }
  | { type: "CLEAR_PASSENGERS" }

const isSamePassenger = (a: any, b: any) => {
  // If there's a real ID, compare it. Otherwise fall back to name + age combo
  return a.id ? a.id === b.id : a.name === b.name && a.age === b.age
}

const reducer = (state: ShipCartState, action: Action): ShipCartState => {
  switch (action.type) {
    case "ADD_PASSENGER": {
      const isInfant = action.payload.age <= MAX_INFANT_AGE
      const list = isInfant ? [...state.infantPassengers] : [...state.adultPassengers]
      const existingIndex = list.findIndex((p) => isSamePassenger(p, action.payload))

      if (existingIndex !== -1) {
        list[existingIndex] = action.payload // update existing
      } else {
        list.push(action.payload)
      }

      return {
        ...state,
        infantPassengers: isInfant ? list : state.infantPassengers,
        adultPassengers: !isInfant ? list : state.adultPassengers,
      }
    }

    case "REMOVE_PASSENGER": {
      const isInfant = action.payload.age <= MAX_INFANT_AGE
      const filterFn = (p: Passenger) => !isSamePassenger(p, action.payload)

      return {
        ...state,
        infantPassengers: isInfant ? state.infantPassengers.filter(filterFn) : state.infantPassengers,
        adultPassengers: !isInfant ? state.adultPassengers.filter(filterFn) : state.adultPassengers,
      }
    }

    case "SET_SEAT_LIMITS":
      return {
        ...state,
        adultLimit: action.payload.adultLimit,
        infantLimit: action.payload.infantLimit,
        maxAdultSeats: action.payload.adultLimit,
        maxInfantSeats: action.payload.infantLimit,
      }

    case "SET_SHIP":
      return { ...state, ship: action.payload }

    case "SET_BOOKING":
      return { ...state, booking: action.payload }

    case "SET_BOOKING_TYPE":
      return { ...state, bookingType: action.payload }

    case "SET_STEP":
      return { ...state, step: action.payload }

    case "ABANDON_BOOKING":
      return {
        ...state,
        step: action.payload.step || "step-1",
        booking: null,
        adultPassengers: [],
        infantPassengers: [],
      }

    case "CLEAR_PASSENGERS":
      return {
        ...state,
        adultPassengers: [],
        infantPassengers: [],
      }

    default:
      return state
  }
}

const useShipCart = (bookingType: BookingType = "GENERAL", step = "step-1") => {
  const { post } = useRequest()
  const { Storage } = useStorage()
  const storageKey = `shipCart`
  const savedData = Storage.get(storageKey)

  const [cart, dispatch] = useReducer(reducer, savedData ? { ...savedData } : { ...initialShipCartState, bookingType, step })

  useEffect(() => {
    Storage.set(storageKey, cart)
  }, [cart])

  const addPassenger = (passenger: Passenger) => dispatch({ type: "ADD_PASSENGER", payload: passenger })

  const removePassenger = (passenger: Passenger) => dispatch({ type: "REMOVE_PASSENGER", payload: passenger })

  const setSeatLimits = (adultLimit: number, infantLimit: number) => dispatch({ type: "SET_SEAT_LIMITS", payload: { adultLimit, infantLimit } })

  const setShip = (ship: Ship) => dispatch({ type: "SET_SHIP", payload: ship })

  const setBooking = (booking: Booking) => dispatch({ type: "SET_BOOKING", payload: booking })

  const setBookingType = (type: BookingType) => dispatch({ type: "SET_BOOKING_TYPE", payload: type })

  const setStep = (step: string) => dispatch({ type: "SET_STEP", payload: step })

  const clearPassengers = () => dispatch({ type: "CLEAR_PASSENGERS" })

  const abandonBooking = async (bookingId: string | number, isPaymentInitiated = false) => {
    const { success, message } = await post({
      url: "v1/booking/status",
      data: { status: isPaymentInitiated ? "BOOKING_FAILED" : "ABANDONED", bookingId },
    })
    if (success) dispatch({ type: "ABANDON_BOOKING", payload: {} })
    return { success, message }
  }

  return {
    cart,
    addPassenger,
    removePassenger,
    setSeatLimits,
    setShip,
    setBooking,
    setBookingType,
    setStep,
    abandonBooking,
    clearPassengers,
  }
}

export default useShipCart
