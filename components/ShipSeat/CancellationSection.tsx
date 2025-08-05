import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ShowCancelModal from "@/components/NoShowSelectedModal"
import { MAX_INFANT_AGE } from "@/constant"
import { useRequest } from "@/hooks/useRequest"
import useSendOTP from "@/hooks/useSendOTP"
import { useUser } from "@/hooks/useUser"
import { Info, Phone } from "lucide-react"
import { cn, getReadableDateTime } from "@/lib/utils"
import { OTPAccordion } from "@/components/OTPAccordion"
import CaptchaLoad from "@/components/captcha-load"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { H4 } from "@/components/ui/typography"

function customRound(number) {
  return number - Math.floor(number) >= 0.5 ? Math.ceil(number) : Math.floor(number)
}

const CancellationSection = ({ passengersDetails = [], returnPassengersDetails = [], cancellationPolicies, bookingId, tripsDetails }) => {
  const { post } = useRequest()
  const queryClient = useQueryClient()
  const [selectedPassengerToCancel, setSelectedPassengerToCancel] = useState([])
  const { userInfo } = useUser()
  const { sendOTP } = useSendOTP()
  const [step, setStep] = useState(null)
  const [canSubmitOtp, setCanSubmitOtp] = useState(false)

  function passengerCheckboxStatus(checked, passenger) {
    if (checked) {
      setSelectedPassengerToCancel((previousValues) => [...previousValues, passenger])
    } else {
      setSelectedPassengerToCancel((previousValues) => previousValues.filter((existingValue) => existingValue.seatId !== passenger.seatId))
    }
  }

  const { mutate: cancelTicket } = useMutation({
    mutationFn: (data: { status: string; bookingId: string; bookingSeatIds: string[] | number[] }) => post({ url: "v1/booking/seat/status", data }),
    onSuccess: ({ success }) => {
      queryClient.invalidateQueries(["bookingDetails", bookingId])
      if (success) {
        setStep(null)
        setSelectedPassengerToCancel([])
      }
    },
    onError: () => {
      setCanSubmitOtp(true)
    },
  })

  const [showCancellationDetails, setShowCancellationDetails] = useState(false)
  const canChangeStatus = !!userInfo?.permissions?.includes("ONE_SIDE_BOOKING_UPDATE")

  const handleCancellation = (data = {}) => {
    const seatIdsToCancel = [...passengersDetails, ...returnPassengersDetails]
      .filter((passenger) =>
        selectedPassengerToCancel.map((pax) => (canChangeStatus ? pax.seatId : pax.id)).includes(canChangeStatus ? passenger.seatId : passenger.id)
      )
      .map((passenger) => passenger.seatId)

    cancelTicket({ status: "CANCELLED", bookingId, bookingSeatIds: seatIdsToCancel, ...data })
  }

  const handleOtpProceed = async (otp: string | number) => {
    if (!otp) return { success: false }
    handleCancellation({ otp })

    return { canResubmit: canSubmitOtp }
  }

  const handleSendOtp = async () => {
    const { success } = await sendOTP({ mobileNumber: userInfo.mobileNumber, otpType: "BOOKING_UPDATE", bookingId: bookingId })
    return success
  }

  return (
    <div id="cancellationDetails" className={`contentHeading mt-5 mb-10 flex max-h-none w-full flex-col rounded-lg bg-white p-4 shadow-md`}>
      <p className="title">{"Cancellation"}</p>
      {!canChangeStatus ? (
        <>
          <p className="text-base">{"Estimate Refund Amounts"}</p>
          <span className=" text-md my-4 flex place-content-between bg-slate-200 px-4 py-2 font-medium text-slate-900">
            <p>Cancellation Time</p>
            <p>Refund Amount per Passenger</p>
          </span>
          {cancellationPolicies.map((cancellationPolicy, index) => (
            <span className=" mx-4 flex place-content-between border-b border-error-80 py-2" key={index}>
              <p>
                {/*NOTE: startTime is actually end time and vice versa as well */}
                {index
                  ? `${getReadableDateTime(cancellationPolicy.endTime)} to ${getReadableDateTime(cancellationPolicy.startTime)}`
                  : `Before ${getReadableDateTime(cancellationPolicy.startTime)}`}
              </p>
              <p>{cancellationPolicy.refundAmount}</p>
            </span>
          ))}
        </>
      ) : null}

      {showCancellationDetails ? (
        <>
          <p className=" text-md my-4 flex gap-2 bg-error-80 px-4 py-2 font-medium text-error-600">
            <Info className="stroke-1" />
            Convenience & payment fees are non-refundable
          </p>
          <span className="block border-b border-solid border-error-80 pb-2">
            <h6 className="mb-4 text-xl font-medium text-error">Select Passengers for Cancellation</h6>
            <table className="w-full">
              <tbody>
                {!canChangeStatus ? (
                  <>
                    {passengersDetails.map((passengerDetail) => (
                      <tr className="" key={passengerDetail.id}>
                        <td className="flex items-center gap-2 text-xl font-medium md:gap-4">
                          <Checkbox
                            name={"passengerId"}
                            value={"passengerId"}
                            onCheckedChange={(checked) => passengerCheckboxStatus(checked, passengerDetail)}
                          />
                          {passengerDetail.name}
                        </td>
                        <td>
                          {passengerDetail.gender}, {passengerDetail.age}
                        </td>
                        <td className="flex place-content-end items-center">
                          <Phone height={"16px"} />
                          {passengerDetail.mobileNo}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="my-10 w-full">
                      <H4 className="my-2">{`${tripsDetails[0].from} - ${tripsDetails[0].to}`}</H4>
                      {passengersDetails.map((passengerDetail) => (
                        <tr className="flex justify-between" key={passengerDetail.id}>
                          <td className="flex items-center gap-2 text-xl font-medium md:gap-4">
                            <Checkbox
                              name={"passengerId"}
                              value={"passengerId"}
                              onCheckedChange={(checked) => passengerCheckboxStatus(checked, passengerDetail)}
                            />
                            {passengerDetail.name}
                          </td>
                          <td>
                            {passengerDetail.gender}, {passengerDetail.age}
                          </td>
                          <td className="flex place-content-end items-center">
                            <Phone height={"16px"} />
                            {passengerDetail.mobileNo}
                          </td>
                        </tr>
                      ))}
                    </div>
                    {returnPassengersDetails.length ? (
                      <div className="my-10 w-full">
                        <H4 className="my-2">{`${tripsDetails[1].from} - ${tripsDetails[1].to}`}</H4>
                        {returnPassengersDetails.map((passengerDetail) => (
                          <tr className="flex justify-between" key={passengerDetail.id}>
                            <td className="flex items-center gap-2 text-xl font-medium md:gap-4">
                              <Checkbox
                                name={"passengerId"}
                                value={"passengerId"}
                                onCheckedChange={(checked) => passengerCheckboxStatus(checked, passengerDetail)}
                              />
                              {passengerDetail.name}
                            </td>
                            <td>
                              {passengerDetail.gender}, {passengerDetail.age}
                            </td>
                            <td className="flex place-content-end items-center">
                              <Phone height={"16px"} />
                              {passengerDetail.mobileNo}
                            </td>
                          </tr>
                        ))}
                      </div>
                    ) : null}
                  </>
                )}
              </tbody>
            </table>
          </span>
          <span className="mt-6 block">
            {!canChangeStatus ? (
              <>
                <span className="place mb-8 flex place-content-between">
                  <h6 className="text-xl font-medium">Refundable Amount</h6>
                  <h4 className="text-3xl">
                    &#8377;
                    {customRound(
                      selectedPassengerToCancel.filter((pax) => pax.age > MAX_INFANT_AGE).length * cancellationPolicies?.[0]?.refundAmount
                    )}
                  </h4>
                </span>
                {/* <ButtonWithConfirmation
                  variant="destructive"
                  text="CANCEL TICKET"
                  disabled={selectedPassengerToCancel.length <= 0}
                  onClick={() => handleCancellation()}
                  className={cn("w-full")}
                /> */}
                {step !== "step-2" ? (
                  <Button
                    variant="destructive"
                    disabled={selectedPassengerToCancel.length <= 0}
                    className={cn("w-full")}
                    type="button"
                    onClick={() => {
                      handleSendOtp().then((isSuccess) => {
                        if (isSuccess) {
                          setStep("step-2")
                        }
                      })
                    }}
                  >
                    CANCEL TICKET
                  </Button>
                ) : null}
                {step === "step-2" ? (
                  <Accordion type="single" className="selectTravellingAccordion w-full" value={step} onValueChange={(val) => setStep("step-2")}>
                    <OTPAccordion
                      mobileNo={userInfo?.mobileNumber || ""}
                      userMail={userInfo?.email || ""}
                      handleOtpProceed={handleOtpProceed}
                      disabled={false}
                      handleSendOtp={handleSendOtp}
                      canCancel={true}
                      handleCancel={() => setStep(null)}
                    />
                  </Accordion>
                ) : null}
              </>
            ) : (
              <ShowCancelModal
                triggerText={"Cancel Ticket"}
                variant={"destructive"}
                customClass="w-full"
                isTriggerDisabled={selectedPassengerToCancel.length <= 0}
                onSubmit={(data) => handleCancellation(data)}
              />
            )}
          </span>
        </>
      ) : (
        <Button variant="destructive" onClick={() => setShowCancellationDetails(true)} className="mt-6 w-full">
          CANCEL TICKET
        </Button>
      )}
      <CaptchaLoad />
    </div>
  )
}

export default CancellationSection
