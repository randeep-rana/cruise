"use client"

import { use, useEffect, useState } from "react"
import * as Form from "@radix-ui/react-form"

import { FormHeading } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  onVerify: (otp: string) => void
  isVerifying?: boolean
}

export default function OtpVerificationForm({ onVerify, isVerifying = false }: Props) {
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(10)
  useEffect(() => {
    if (timer === 0) return
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length !== 6) return // simple validation
    onVerify(otp)
  }

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0")
    const s = String(seconds % 60).padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <div className="flex flex-col gap-4 text-center ">
      <FormHeading heading="Email & Mobile Verification" className=" mb-4 text-3xl" />

      <p className="mb-4 text-center text-sm text-gray-600">
        Enter the code from SMS sent to <p className="mt-2 font-semibold text-black">+91 {"XXXXXXXXXX`"}</p>
      </p>

      <Form.Root onSubmit={handleSubmit} className="space-y-4">
        <Form.Field name="otp">
          <Form.Control asChild>
            <Input
              placeholder="Enter Mobile OTP"
              value={otp}
              inputMode="numeric"
              maxLength={6}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="text-center text-lg tracking-widest"
            />
          </Form.Control>
        </Form.Field>

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          Didn&apos;t receive OTP?{" "}
          {timer > 0 ? (
            <p>
              <span className="text-primary ">Resend in {formatTime(timer)}</span>
            </p>
          ) : (
            <button type="button" className="text-primary underline" onClick={() => setTimer(150)}>
              Resend
            </button>
          )}
        </div>

        <Form.Submit asChild>
          <Button className="w-full text-white " disabled={isVerifying || otp.length !== 6}>
            {isVerifying ? "Verifying..." : "CREATE ACCOUNT"}
          </Button>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}
