"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import * as Form from "@radix-ui/react-form"

import { FormHeading } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useUser } from "@/hooks/useUser"

const LoginForm = () => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const {Login}=useUser();
  const next = searchParams?.get("next")
  const [disableForm, setDisableForm] = useState(false)
  const [loginMethod, setLoginMethod] = useState("password")

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (disableForm) {
      return
    }
    const formData: any = Object.fromEntries(new FormData(event.currentTarget))

    setDisableForm(true)
    const { data, success, responseData } = await Login({ mobileNumber: formData.mobileNumber, password: formData.password })
    setDisableForm(false)
  }

  return (
    <>
      <FormHeading heading={"Login"} />
      <Form.Root onSubmit={handleSubmit}>
        {loginMethod === "password" && (
          <>
            <Form.Field name="mobileNumber" className=" mb-6">
              <Form.Label className=" mb-1 text-base font-normal">Mobile Number</Form.Label>
              <Form.Control asChild>
                <Input type={"tel"} pattern="^[6-9]\d{9}$" className="border-stone-300" required />
              </Form.Control>
              <Form.Message match={"valueMissing"}>Please enter a valid mobile number</Form.Message>
              <Form.Message match={"patternMismatch"}>Please enter a valid 10 digit mobile number</Form.Message>
            </Form.Field>
            <Form.Field name="password" className=" mb-6">
              <Form.Label className=" mb-1 text-base font-normal">Password</Form.Label>
              <Form.Control asChild>
                <PasswordInput type={"password"} required className="border-stone-300" />
              </Form.Control>
              <Form.Message match={"valueMissing"}>Please provide password</Form.Message>
            </Form.Field>
            <p onClick={() => setLoginMethod("otp")} className="my-2 cursor-pointer text-brand-500 ">
              Login via OTP
            </p>
          </>
        )}
        {loginMethod === "otp" && (
          <>
            <Form.Field name="mobileOrEmail" className=" mb-6">
              <Form.Label className=" mb-1 text-base font-normal">Email/Mobile number</Form.Label>
              <Form.Control asChild>
                <Input type={""} pattern="" className="border-stone-300" required />
              </Form.Control>
              <Form.Message match={"valueMissing"}>Please enter a valid email or mobile number</Form.Message>
              <Form.Message match={"patternMismatch"}>Please enter a valid 10 digit mobile number</Form.Message>
            </Form.Field>

            <p onClick={() => setLoginMethod("password")} className="my-2 cursor-pointer text-brand-500 ">
              Login via password
            </p>
          </>
        )}
        {/* <Link href={`/auth?form=forgot-password${next ? "&next=" + encodeURIComponent(next) : ""}`} className="text-blue-800 mb-6 inline-block">
          Forgot Password?
        </Link> */}
        <Form.Submit asChild className="block w-full bg-brand-600">
          <Button disabled={disableForm}>LOGIN</Button>
        </Form.Submit>
        <Link href={`/auth?form=signup`} className="mt-4 block text-center">
          Don&apos;t have an account? <p className="inline text-brand-600">Create an account</p>
        </Link>
      </Form.Root>
    </>
  )
}

export default LoginForm
