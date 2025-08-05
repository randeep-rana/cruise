export type Passenger = {
  utdbId: string
  groupId: string
  governmentIdType: string
  governmentId: string
}

export type Pilgrim = {
  utdbId: string
  groupId: string
  name: string
  photo?: string
  mobileNo: string
  gender: string
  age: number
  emailId?: string
  governmentIdType?: string
  governmentId?: string
  hasBooking: boolean
  manuallyAdded?: boolean
  isVerified: boolean
}

export type CartState = {
  passengers: Passenger[]
  selectedPassengerId: string | null
  bookingId: string | null
  paymentRedirectUrl: string | null
}
export type Flight = {
  slotId: string
  source: {
    location: string
    name: string
  }
  destination: {
    location: string
    name: string
  }
  startTime: string
  endTime: string
  returnType: "SAME_DAY" | "NEXT_DAY"
  availableSeats: number
  operator: {
    logoURL: string
    name: string
  }
  fare: number
  fareTax: number
  convenienceFee: number
  convenienceFeeTax: number
}

export type Ship = {
  slotId: string
  source: {
    location: string
    name: string
  }
  destination: {
    location: string
    name: string
  }
  startTime: string
  endTime: string
  returnType: "SAME_DAY" | "NEXT_DAY"
  availableSeats: number
  operator: {
    logoURL: string
    name: string
  }
  fare: number
  fareTax: number
  convenienceFee: number
  convenienceFeeTax: number
}

export type Seat = {
  id: number
  slotSeat: {
    seatNumber: number
    type: string
    status: string
  }
  traveler: {
    name: string
    mobileNo: string
    gender: string
    age: number
    emailId: string
    governmentIdType: string
    governmentId: string
  }
  bookingSeatStatus: string
  fareAmount: number
  fareTax: number
  refundAmount: number | null
  refundTax: number | null
}

export type Slot = {
  operator: {
    name: string
  }
  source: {
    name: string
    location: string
  }
  destination: {
    name: string
    location: string
  }
  type: string
  returnType: string
  startTime: string
  endTime: string
  seats: Seat[]
}

export type Payment = {
  canPay: boolean
  currentTime: string
  cutOffTime: string
}

export type Booking = {
  id: number
  slots: Slot[]
  noOfPassengers: number
  status: string
  fare: number
  fareTax: number
  convenienceFee: number
  convenienceFeeTax: number
  totalAmount: number
  amountPayable: number
  paymentType: string
  refundAmount: number | null
  refundFare: number | null
  refundFareTax: number | null
  tatkalFare: number | null
  tatkalFareTax: number | null
  bookingSource: string
  boardingDate: string
  bookingType: string
  bookingDate: string
  remarks: string | null
  payment: Payment
}
