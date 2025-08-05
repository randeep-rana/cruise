import * as Form from "@radix-ui/react-form"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import "./index.scss"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useResendOTPTimer from "@/hooks/useResendOTPTimer"
import { Frown } from "lucide-react"

import OtpForm from "../OTPForm"
import { toast } from "react-hot-toast"
import { Button } from "../ui/button"
import ButtonWithConfirmation from "../ui/button-with-confirmation"
import { Input } from "../ui/input"
import { P } from "../ui/typography"

type OTPAccordionProps = {
  userMail?: string
  mobileNo: string
  handleOtpProceed: (otp: string | number) => Promise<{ success?: boolean; errorCode?: string; canResubmit?: boolean }>
  handleSendOtp?: () => void
  disabled?: boolean
  clearCart?: () => void
  showResend?: boolean
  otpMessage?: string
  canCancel?: boolean
  cancelText?: string
  handleCancel?: () => void
  isAgent?: boolean
}

const CustomTitle = () => {
  return (
    <h2 className="text-4xl font-normal text-primary">
      Uh-oh
      <Frown className="mb-1 ml-2 inline-block" />
    </h2>
  )
}

const CustomDescription = () => {
  return <P className="text-dark">The slot you were trying to book is no longer available for booking. Please try booking another available slot.</P>
}

function OTPAccordionFn(props: OTPAccordionProps) {
  const {
    userMail,
    mobileNo,
    handleOtpProceed,
    handleSendOtp,
    disabled = false,
    clearCart,
    showResend = true,
    otpMessage,
    cancelText = null,
    canCancel = false,
    handleCancel = () => {},
    isAgent,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const { otpTimer, otpTimerOff, resetTimer } = useResendOTPTimer()
  const [formData, setFormData] = useState({ submitting: false, otp: "", transactionPassword: "" })
  const otpToastId = useRef(null)
  const { push } = useRouter()
  const params = useSearchParams()
  const registrationId = params?.get("registrationId")
  const contactInfo = useMemo(() => {
    if (userMail && mobileNo) {
      return [mobileNo, userMail].join(" & ")
    }
    return mobileNo || userMail
  }, [userMail, mobileNo])

  useEffect(() => {
    resetTimer()
  }, [])

  const handleOtpSend = () => {
    if (!otpTimerOff) return
    resetTimer()
    handleSendOtp?.()
  }

  const submitOtp = useCallback(async (otp: string) => {
    try {
      const { success, errorCode, canResubmit } = await handleOtpProceed(otp)
      if (errorCode === "4002") {
        setIsOpen(true)
      }
      if (!success || canResubmit || errorCode === "4002") {
        setFormData((prev) => ({ ...prev, submitting: false }))
      }
    } catch (err) {
      console.error("Error during OTP submission:", err)
      alert("Failed to submit OTP, please try again.")
    } finally {
      setFormData((prev) => ({ ...prev, submitting: false }))
    }
  }, [])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    if (formData.submitting) return

    const otp = new FormData(event.currentTarget).get("otp")
    const transactionPassword = new FormData(event.currentTarget).get("transactionPassword")
    if (!otp || otp.toString().length === 0 || (isAgent && !transactionPassword)) {
      if (otpToastId.current) {
        toast.remove(otpToastId.current)
      }
      otpToastId.current = toast.error(!otp ? "Please enter a valid OTP." : "Please enter a transaction password.")

      return
    }

    setFormData({
      submitting: true,
      otp: otp.toString(),
      transactionPassword: isAgent && transactionPassword ? transactionPassword.toString() : undefined,
    })
  }

  useEffect(() => {
    if (formData.submitting && formData.otp) {
      submitOtp(formData.otp)
    }
  }, [formData.submitting, formData.otp, submitOtp])

  return (
    <AccordionItem value="step-2" disabled={disabled} className="my-4 rounded-lg p-4 shadow-md">
      <AccordionTrigger>OTP Verification</AccordionTrigger>
      <AccordionContent>
        <div className="contentHeading flex flex-col justify-between text-center">
          <h4 className="mb-4">
            {otpMessage ?? (
              <>
                Enter the OTP from the SMS sent to <span>{contactInfo}</span>{" "}
              </>
            )}
          </h4>

          <OtpForm
            showResend={showResend}
            handleFormSubmit={handleFormSubmit}
            handleOtpSend={handleOtpSend}
            otpTimerOff={otpTimerOff}
            otpTimer={otpTimer}
            formSubmitting={formData.submitting}
            clearCart={clearCart}
            canCancel={canCancel}
            cancelText={cancelText}
            handleCancel={handleCancel}
            isAgent={isAgent}
          />

          {isOpen ? (
            <ButtonWithConfirmation
              onClick={() => push(`/app/trip/date-select?registrationId=${registrationId}&destinationId=${params?.get("destinationId")}`)}
              text={""}
              title={<CustomTitle />}
              description={<CustomDescription />}
              submitBtnText={"CHECK AVAILABLE SLOTS"}
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
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export const OTPAccordion = memo(OTPAccordionFn)
