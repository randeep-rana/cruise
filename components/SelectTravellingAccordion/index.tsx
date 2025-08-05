"use client"

import { useState } from "react"
import { MAX_INFANT_AGE } from "@/constant"
import * as Form from "@radix-ui/react-form"
import { Contact, Pencil, UserCheck, UserRoundPlus } from "lucide-react"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip } from "../ui/tooltip"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { H3, H4, Subtle } from "../ui/typography"
import SelectTravellingAccordionRow from "./SelectTravellingAccordionRow"

type SelectTravellingAccordionProps = {
  header?: string
  cart: any
  clearCart: () => void
  setGovernmentId: (passenger: any) => void
  addPassenger: (passenger: any) => void
  removePassenger: (passenger: any) => void
  handleBookSeats: () => void
  setStep?: (step: string) => void
  disabled?: boolean
}

export function SelectTravellingAccordion({
  header,
  cart,
  clearCart,
  setGovernmentId,
  addPassenger,
  removePassenger,
  handleBookSeats,
  setStep,
  disabled = false,
}: SelectTravellingAccordionProps) {
  const handleCheck = ({ passengerDetail, checked }) => {
    console.log("handleCheck", passengerDetail, checked)
    if (passengerDetail.age > MAX_INFANT_AGE && cart.adultPassengers.length >= cart.maxAdultSeats && checked) return
    if (passengerDetail.age <= MAX_INFANT_AGE && cart.infantPassengers.length >= cart.maxInfantSeats && checked) return

    console.log("i am herfe")
    checked ? addPassenger(passengerDetail) : removePassenger(passengerDetail)
  }

  const handleIdInput = ({ passengerDetail, governmentIdType, governmentId }) => {
    const newPassenger = { ...passengerDetail, governmentIdType, governmentId }
    setGovernmentId(newPassenger)
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStep?.("step-2")
  }

  const hasPassengers = cart.adultPassengers.length > 0

  return (
    <AccordionItem value="step-5" className="my-4 rounded-lg p-4 shadow-md" onClick={() => setStep?.("step-1")}>
      <AccordionTrigger className="text-primaryLakshadweep-700">
        <div className="flex flex-col">
          <div className="flex items-center">
            <H4 className="text-xl font-medium text-primaryLakshadweep-700">{header || "Travelling Passengers"}</H4>
          </div>
        </div>
      </AccordionTrigger>

      {(cart.step !== "step-1" || disabled) && cart.adultPassengers.length > 0 && (
        <table className="w-full">
          <tbody>
            {[...cart.adultPassengers, ...cart.infantPassengers].map(({ name, gender, age, governmentId, isVerified }, index) => (
              <tr className="border-b last:border-b-0" key={index}>
                <td className="p-2">{name}</td>
                <td className="p-2">{`${gender}, ${age}`}</td>
                <td className="p-2">
                  {isVerified ? (
                    <Tooltip text="E-KYC verified">
                      <Icons.check2 className="inline stroke-1 text-tertiary" />
                    </Tooltip>
                  ) : (
                    <>
                      <Contact className="inline stroke-1 text-gray-800" /> {governmentId}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AccordionContent>
        <Form.Root onSubmit={handleSubmit}>
          {cart.maxAdultSeats > 0 && (
            <div className="contentHeading flex justify-between border-b-2 p-2">
              <p className="text-lg">Adult Passengers</p>
              <p className="text-lg">
                {cart.adultPassengers.length} / {cart.maxAdultSeats} Selected
              </p>
            </div>
          )}

          <table className="w-full">
            <tbody>
              {cart.availableAdults?.map((passenger, index) => {
                const cartData = cart.adultPassengers.find((p) => p.id === passenger.id)
                return (
                  <SelectTravellingAccordionRow
                    key={index}
                    passengerDetail={passenger}
                    handleCheck={handleCheck}
                    handleIdInput={handleIdInput}
                    isSelected={!!cartData}
                    idType={cartData?.governmentIdType || passenger.governmentIdType}
                    idNumber={cartData?.governmentId || passenger.governmentId}
                    maxPassengers={cart.maxAdultSeats}
                    cartPassengerCount={cart.adultPassengers.length}
                    isVerified={cartData?.isVerified}
                  />
                )
              })}

              {cart.maxInfantSeats > 0 && (
                <>
                  <tr>
                    <td colSpan={5}>
                      <div className="contentHeading flex justify-between border-y-2 p-2">
                        <p>Infant Passengers</p>
                        <p>
                          {cart.infantPassengers.length} / {cart.maxInfantSeats} Selected
                        </p>
                      </div>
                    </td>
                  </tr>

                  {cart.availableInfants.map((passenger, index) => {
                    const cartData = cart.infantPassengers.find((p) => p.id === passenger.id)
                    return (
                      <SelectTravellingAccordionRow
                        key={index}
                        passengerDetail={passenger}
                        handleCheck={handleCheck}
                        handleIdInput={handleIdInput}
                        isSelected={!!cartData}
                        idType={cartData?.governmentIdType || passenger.governmentIdType}
                        idNumber={cartData?.governmentId || passenger.governmentId}
                        maxPassengers={cart.maxInfantSeats}
                        cartPassengerCount={cart.infantPassengers.length}
                        infant={true}
                        isVerified={cartData?.isVerified}
                      />
                    )
                  })}
                </>
              )}
            </tbody>
          </table>

          <div className="flex w-full justify-between">
            <div>
              <Button variant="outline" className="mt-4 w-full border-primaryLakshadweep-700 uppercase text-primaryLakshadweep-700">
                <UserRoundPlus className="mr-1 size-4" /> Add New
              </Button>
            </div>

            <div className="">
              <Form.Submit asChild>
                <Button disabled={!hasPassengers} className="mt-4 w-full">
                  BOOK SEAT{cart.adultPassengers.length > 1 ? "S" : ""}
                </Button>
              </Form.Submit>
            </div>
          </div>
        </Form.Root>
      </AccordionContent>
    </AccordionItem>
  )
}
