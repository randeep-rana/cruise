"use client"

import React, { useState } from "react"
import useShipCart from "@/hooks/useCart"

import SeatLayoutAccordion from "@/components/Accordion/SeatSelectAccordion"
import ContactInfoAccordion from "@/components/ContactInformationAccordion"
import TravelCard from "@/components/LakshDweep/TravelCard"
import { OTPAccordion } from "@/components/OTPAccordion"
import PaymentAccordion from "@/components/PaymentAccordion"
// import PaymentDetailsAccordion from "@/components/PaymentDetailsAccordion"
import { PricingDetails } from "@/components/PricingDetailsCard"
import { SelectTravellingAccordion } from "@/components/SelectTravellingAccordion"
import SeatMap from "@/components/seat-selection/SeatMap"
import { Accordion } from "@/components/ui/accordion"
import { PassengerListCard } from '@/components/PassengerListCard'
import CancellationSection from '@/components/ShipSeat/CancellationSection'

const ShipCart = () => {
  const { cart, setBooking, setBookingType, setStep, addPassenger, removePassenger } = useShipCart("GENERAL", "step-1")

  const isAgentOrCustomer = true
  const seatType = "seatType"
  const travelDate = "travelDate"

  const pricingObj = {
    baseFees: 0,
    taxes: 0,
    convenienceFeeTax: 0,
    fareTax: 0,
  }

  const tripsDetails = [
    {
      name: "name",
      from: "from",
      to: "to",
      date: "date",
      startTime: "startTime",
      endTime: "endTime",
      fromHelipad: "fromHelipad",
      toHelipad: "toHelipad",
      fromAddress: "fromAddress",
      toAddress: "toAddress",
    },
    {
      name: "name",
      from: "from",
      to: "to",
      date: "date",
      startTime: "startTime",
      endTime: "endTime",
      fromHelipad: "fromHelipad",
      toHelipad: "toHelipad",
      fromAddress: "fromAddress",
      toAddress: "toAddress",
    },
  ]

  const dummyPricing = {
    passengersCount: cart.adultPassengers.length + cart.infantPassengers.length,
    baseFees: 1200 * cart.adultPassengers.length,
    taxes: 216 * cart.adultPassengers.length,
    convenienceFees: 50 * cart.adultPassengers.length,
    convenienceFeeTax: 9 * cart.adultPassengers.length,
    tatkalFare: 54 * cart.adultPassengers.length,
    tatkalFareTax: 9 * cart.adultPassengers.length,
    amountPayable: 1829 * cart.adultPassengers.length,
  }

  const dummyBookingData = {
    id: "dummy-booking-id",
    amountPayable: 1899,
    payment: {
      cutOffTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 mins from now
    },
  }

  const dummyUserInfo = {
    email: "johndoe@example.com",
    mobileNumber: "9876543210",
  }

  const refetch = () => {
    console.log("Refetch triggered")
  }

  const handleContactInformationProceed = () => {
    setStep("step-3")
  }

  const handlePassengerClear = () => {
    console.log("Passenger clear")
  }

  const addPilgrims = (pilgrims: any) => {
    console.log("Pilgrims added:", pilgrims)
  }

  const handleBookSeats = () => {
    setStep("step-2")
  }

  const setGovernmentId = (passenger: any) => {
    console.log("Government ID set for passenger:", passenger)
  }

  const handlePayment = () => {
    setStep("step-4")
  }

  const handleReplan = async () => {
    console.log("Replan triggered")
  }

  const userInfo = {
    email: "johndoe@example.com",
    mobileNumber: "9876543210",
    name: "John Doe",
    role: "customer",
  }

  const smapleBookingData = {
    id: "booking_12345",
    amountPayable: 2750,
    payment: {
      cutOffTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes from now
    },
  }

  const confirmed = [
    { name: "Aarav Nair", seatLabel: "2U" },
    { name: "Meera Pillai", seatLabel: "2L" },
    { name: "Riya Menon", seatLabel: "3U" },
  ]

  const waitlisted = [
    { name: "Aarav Nair", seatLabel: "P1" },
    { name: "Meera Pillai", seatLabel: "P2" },
  ]

  const sampleProps = {
    passengersDetails: [
      {
        id: "p1",
        seatId: "s1",
        name: "Ravi Kumar",
        age: 30,
        gender: "Male",
        mobileNo: "9876543210",
      },
      {
        id: "p2",
        seatId: "s2",
        name: "Anjali Sharma",
        age: 28,
        gender: "Female",
        mobileNo: "9876543211",
      },
    ],
    returnPassengersDetails: [
      {
        id: "rp1",
        seatId: "rs1",
        name: "Ravi Kumar",
        age: 30,
        gender: "Male",
        mobileNo: "9876543210",
      },
      {
        id: "rp2",
        seatId: "rs2",
        name: "Anjali Sharma",
        age: 28,
        gender: "Female",
        mobileNo: "9876543211",
      },
    ],
    cancellationPolicies: [
      {
        startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hrs from now
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hrs from now
        refundAmount: 500,
      },
      {
        startTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hrs from now
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hrs from now
        refundAmount: 300,
      },
    ],
    bookingId: "BK123456789",
    tripsDetails: [
      {
        from: "Mumbai",
        to: "Goa",
      },
      {
        from: "Goa",
        to: "Mumbai",
      },
    ],
  }
  


  return (
    <div className="w-full">
      <div className="container flex gap-4 p-4 pt-8">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="col-span-2">
            <TravelCard
              logoSrc="https://neon.ipsator.com/c/image/upload/v1724149756/heliyatra/images/image-1.jpg"
              departureTime="4:35 PM"
              arrivalTime="7:35 PM"
              fromLocation="Kochi"
              fromCode="COK"
              toLocation="Kavaratti"
              toCode="KVT"
              shipName="MV Arabian Queen"
              seatInfo="Seat"
              quotaTitle="Quota"
              quotaType="General"
            />
            <Accordion type="single" className="selectTravellingAccordion w-full" value={cart.step} onValueChange={(val) => setStep(val)}>
              <SelectTravellingAccordion
                cart={cart}
                clearCart={handlePassengerClear}
                addPassenger={addPassenger}
                removePassenger={removePassenger}
                setGovernmentId={setGovernmentId}
                handleBookSeats={handleBookSeats}
                disabled={isAgentOrCustomer ? cart.step !== "step-1" : false}
                setStep={setStep}
              />

              <SeatLayoutAccordion />

              <ContactInfoAccordion handleContactInformationProceed={handleContactInformationProceed} />

              <PaymentAccordion bookingData={smapleBookingData} userInfo={userInfo} clearCart={handleReplan} disabled={cart.step !== "step-3"} />

              <CancellationSection {...sampleProps} />

              {/* <PaymentAccordion bookingData={dummyBookingData} userInfo={dummyUserInfo} clearCart={clearCart} disabled={cart.step !== "step-3"} /> */}
              {/* {cart.step === "2" ? (
                <OTPAccordion
                  mobileNo={userInfo?.mobileNumber || ""} 
                  userMail={userInfo?.email || ""}
                  handleOtpProceed={handleOtpProceed}
                  disabled={cart.step !== "step-2"}
                  clearCart={handleReplan}
                  handleSendOtp={handleSendOtp}
                  isAgent={isAgent}
                />
              ) : null} */}
              {/* {cart.step === "step-3" ? (
                !isAgentOrCustomer ? (
                  <PaymentDetailsAccordion handlePaymentDetailsProceed={handlePaymentDetailsProceed} />
                ) : (
                  <PaymentAccordion bookingData={cart.booking} userInfo={userInfo} clearCart={handleReplan} disabled={cart.step !== "step-3"} />
                )
              ) : null} */}
            </Accordion>
          </div>
          <div className="col-span-1 space-y-9">
            <PricingDetails priceObj={dummyPricing} title={"Price Details"} page="cart" />
            <PassengerListCard
              confirmedPassengers={confirmed}
              waitlistedPassengers={waitlisted}
            />
            {/* <CancellationDetails /> */}
          </div>
        </div>
        {/* <Script id="razorpay-lib" strategy="afterInteractive" src="https://checkout.razorpay.com/v1/checkout.js" />
      <CaptchaLoad /> */}
      </div>
    </div>
  )
}

export default ShipCart
