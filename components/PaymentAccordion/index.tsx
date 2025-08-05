import Link from "next/link"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import "./index.scss"
import { memo, useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PAYMENT_GATEWAYS } from "@/constant"
import useRazorpay from "@/hooks/useRazorpay"
import { useRequest } from "@/hooks/useRequest"
import useResendOTPTimer from "@/hooks/useResendOTPTimer"
import { differenceInSeconds } from "date-fns"
import { Frown } from "lucide-react"

import { getCurrentIstDate } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { Button } from "../ui/button"
import ButtonWithConfirmation from "../ui/button-with-confirmation"
import Loader from "../ui/loader"
import { H3, H4, P } from "../ui/typography"

const CustomTitle = () => {
  return (
    <h2 className="text-4xl font-normal text-primary">
      Uh-oh
      <Frown className="ml-2 mb-1 inline-block" />
    </h2>
  )
}

const CustomDescription = () => {
  return (
    <P className="text-dark">
      You could not complete the payment within time so we had to release the seats for booking by all users. <br />
      To check latest availability & continue booking a ticket press continue.
    </P>
  )
}

function PaymentAccordion({ bookingData, userInfo, clearCart, disabled, page = "cart", refetch = () => {} }) {
  // console.log("booking data", bookingData, userInfo)

  const router = useRouter()
  const pgForm = useRef(null)
  const { post } = useRequest()
  const { displayRazorpay } = useRazorpay(page)
  const { push } = useRouter()
  const [errorCode, setErrorCode] = useState(null)
  const params = useSearchParams()
  const registrationId = params?.get("registrationId")

  const now = useMemo(() => getCurrentIstDate(), [])
  const cutOffTimeUI = useMemo(
    () => new Date(now.getTime() + differenceInSeconds(new Date(bookingData.payment.cutOffTime), now) * 1000),
    [now, bookingData]
  )
  const diffInSec = useMemo(() => differenceInSeconds(cutOffTimeUI, getCurrentIstDate()), [cutOffTimeUI])

  const { otpTimer, otpTimerOff } = useResendOTPTimer({
    minutes: Math.floor(diffInSec / 60),
    seconds: diffInSec % 60,
  })

  const [formSubmitting, setFormSubmitting] = useState(false)
  const [pgFormData, setPgFormData] = useState<{ encData: string; postURL: string } | null>(null)

  useEffect(() => {
    setPgFormData(null)
  }, [])

  useEffect(() => {
    if (page === "cart" && (otpTimerOff || (otpTimer.minutes <= 0 && otpTimer.seconds <= 0))) {
      clearCart()
      router.back()
    }
  }, [otpTimerOff, otpTimer, page])

  useEffect(() => {
    if (pgFormData?.postURL) {
      pgForm.current.submit()
    }
  }, [pgFormData])

  const handlePayConfirm = async () => {
    if (formSubmitting) return
    setFormSubmitting(true)
    try {
      let res = await fetch("/api/v1/payment/gateway/available")
      const responseData = await res.json()
      if (responseData.data === PAYMENT_GATEWAYS.RAZORPAY) {
        await displayRazorpay(
          bookingData.id,
          () => {
            router.push(`/app/booking/${bookingData.id}?status=success`)
            refetch()
          },
          (retry = false, errorCode) => {
            if (errorCode) {
              setFormSubmitting(false)
              setErrorCode(errorCode)
              return
            }

            if (retry) {
              setFormSubmitting(false)
              toast.error("Payment failed. Please try again.")
              return
            }

            const status = page === "cart" ? "pending&retryPayment=true" : "failed"
            router.push(`/app/booking/${bookingData.id}?status=${status}`)
          }
        )
      } else if (responseData.data === PAYMENT_GATEWAYS.PAY) {
        const { response, success } = await post({ url: `v1/payment/pay/init`, data: { bookingId: bookingData.id } })

        if (success) {
          window.location.replace(response.data.payUrl)
        } else {
          toast.error("Something went wrong. Please try again.")
          setFormSubmitting(false)
        }
      } else {
        toast.error("Something went wrong. Please try again.")
        setFormSubmitting(false)
      }
    } catch (error) {
      console.log("Error", error)
      setFormSubmitting(false)
      toast.error("Please try again something went wrong.")
    }
  }

  return (
    <AccordionItem value="step-3" disabled={disabled} className="my-4 rounded-lg p-4 shadow-md" id="payment-accordion">
      <AccordionTrigger>Payment</AccordionTrigger>
      <AccordionContent>
        <div className="timerContainer">
          <p>
            Ticket information will be sent to {userInfo?.email} & {userInfo?.mobileNumber}
          </p>
          {page === "cart" ? (
            <div className="timerContent">
              <p>
                Complete your Payment within{" "}
                {`${otpTimer?.minutes >= 10 ? otpTimer?.minutes : `0${otpTimer?.minutes}`}:${
                  otpTimer?.seconds >= 10 ? otpTimer?.seconds : `0${otpTimer?.seconds}`
                }`}
              </p>
              <p>If you fail to do so, the seats will be released for booking by all users.</p>
            </div>
          ) : null}
          <div className="totalAmount flex justify-between">
            <h6>Total Amount to be Paid</h6>
            <h6>₹ {bookingData.amountPayable}</h6>
          </div>

          <div className="mb-4 flex flex-col">
            <p>
              By clicking to pay & confirm I agree to all the{" "}
              <span className="termsAndConditions">
                <Link href="/terms-and-conditions" target={"_blank"}>
                  terms and conditions
                </Link>
              </span>
            </p>
            {otpTimerOff ? <p className="mt-2 text-base text-error">Please do not refresh this page while payment is in progress</p> : null}
          </div>

          {!formSubmitting && page === "cart" ? (
            <Button variant="outline" onClick={clearCart} disabled={formSubmitting}>
              REPLAN
            </Button>
          ) : null}

          {otpTimerOff ? (
            <p>Booking closed</p>
          ) : (
            <Button className="ml-4" onClick={() => handlePayConfirm()} disabled={formSubmitting}>
              {formSubmitting ? <Loader /> : "PAY & CONFIRM"}
            </Button>
          )}

          <div className="invisible h-0 w-0">
            <form action={pgFormData?.postURL || ""} method="post" id="pgForm">
              <input type="hidden" name="encdata" value={pgFormData?.encData || ""} />
            </form>
          </div>
        </div>
      </AccordionContent>
      {errorCode === "5001" ? (
        <ButtonWithConfirmation
          onClick={() => {
            setErrorCode(null)
            push(registrationId ? `/app/trip/date-select?registrationId=${registrationId}` : "/app/trip/search")
          }}
          text={""}
          title={<CustomTitle />}
          description={<CustomDescription />}
          submitBtnText={<span className="font-medium tracking-widest">CHECK AVAILABLE SLOTS</span>}
          customCancelButton={
            <Button variant="outline" className="border-primary font-medium tracking-widest text-primary" onClick={() => push(`/`)}>
              BACK TO HOME
            </Button>
          }
          withCancel={false}
          isDefaultOpen={true}
          withTrigger={false}
        />
      ) : null}

      {errorCode === "paymentFailure" ? (
        <ButtonWithConfirmation
          onClick={() => {
            setErrorCode(null)
            refetch()
            push(`/app/booking/${bookingData.id}?status=pending&retryPayment=true`)
          }}
          text={""}
          title={
            <h2 className="text-4xl font-normal text-primary">
              Payment Failed
              <Frown className="ml-2 mb-1 inline-block" />
            </h2>
          }
          description={
            <P className="text-dark">
              Your payment failed. This may happen due to several reasons. Any amount debited for this transaction would be automatically refunded
              within 7 days. <br />
              Please retry using another payment method soon.
            </P>
          }
          submitBtnText={"Continue"}
          withCancel={false}
          isDefaultOpen={true}
          withTrigger={false}
        />
      ) : null}
    </AccordionItem>
  )
}

export default memo(PaymentAccordion)
