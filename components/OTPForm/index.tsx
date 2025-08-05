import React from "react"
import * as Form from "@radix-ui/react-form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

const OtpForm = ({
  showResend,
  handleFormSubmit,
  handleOtpSend,
  otpTimerOff,
  otpTimer,
  formSubmitting,
  clearCart,
  cancelText,
  canCancel,
  handleCancel,
  isAgent = false,
}) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault() // Prevent default behavior
    }
  }

  return (
    <Form.Root onSubmit={handleFormSubmit} className="">
      <Form.Field name="otp" className="mb-6">
        <Form.Control asChild>
          <Input
            type={"tel"}
            onKeyDown={handleKeyPress}
            minLength={4}
            maxLength={4}
            size={4}
            pattern={"^[0-9]{4}"}
            className="border-stone-300 mx-auto text-center md:max-w-[216px]"
          />
        </Form.Control>
        <Form.Message className="mt-1 block text-center" match={"patternMismatch"}>
          Enter the 4 digit OTP
        </Form.Message>
      </Form.Field>

      {isAgent && (
        <Form.Field name="transactionPassword" className="mb-6">
          <Form.Label>Enter transaction password</Form.Label>
          <Form.Control asChild>
            <Input
              type={"text"}
              onKeyDown={handleKeyPress}
              // pattern={"^[0-9]{4}"}
              className="border-stone-300 mx-auto text-center md:max-w-[216px]"
            />
          </Form.Control>
        </Form.Field>
      )}

      {showResend ? (
        <>
          <p>Did not receive OTP?</p>
          <p className="timer" onClick={() => handleOtpSend()}>
            {otpTimerOff ? "Resend OTP" : `Resend in 0${otpTimer?.minutes}:${otpTimer?.seconds >= 10 ? otpTimer?.seconds : `0${otpTimer?.seconds}`}`}
          </p>
        </>
      ) : null}
      <div className="mt-4 flex justify-center">
        {canCancel ? (
          <Button variant="outline" onClick={handleCancel}>
            {cancelText || "CANCEL"}
          </Button>
        ) : null}

        {clearCart ? (
          <Button variant="outline" onClick={clearCart} disabled={formSubmitting}>
            REPLAN
          </Button>
        ) : null}

        <Form.Submit asChild className="ml-4">
          <Button disabled={formSubmitting}>SUBMIT</Button>
        </Form.Submit>
      </div>
    </Form.Root>
  )
}

export default OtpForm
