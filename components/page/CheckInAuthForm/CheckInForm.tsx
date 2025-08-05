"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import * as Form from "@radix-ui/react-form"

import { FormHeading } from "@/components/login-form"
import { getHomePageAction, getRedirectPath } from "@/components/page/AuthForm/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CheckInForm = () => {
  const searchParams = useSearchParams()
  const next = searchParams?.get("next")
  const [disableForm, setDisableForm] = useState(false)
  const { Login } = useUser()
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    window.location.replace("/web-check-in/select-passenger")
    return
    if (disableForm) {
      return
    }
    setDisableForm(true)

    const formData: any = Object.fromEntries(new FormData(event.currentTarget))

    const { success, responseData } = await Login({ mobileNumber: formData.mobileNumber, pnr: formData.pnr })

    if (!success) {
      setDisableForm(false)
      return
    }
    setTimeout(() => {
      if (next) {
        let searchParam = next.split("?")[1]
        let isDestinationId = searchParam?.includes("destinationId")
        if (next.includes("app/trip/search") && isDestinationId) {
          let replaceUrl = getHomePageAction(responseData?.role, searchParam.split("=")[1])
          if (replaceUrl?.href) {
            window.location.replace(replaceUrl.href)
          } else {
            window.location.replace(getRedirectPath(responseData?.role))
          }
        } else {
          window.location.replace(next)
        }
      } else {
        window.location.replace(getRedirectPath(responseData?.role))
      }
    }, 0)
  }

  return (
    <>
      <FormHeading heading={"Web Check-in"} />
      <Form.Root onSubmit={handleSubmit}>
        <Form.Field name="mobileNumber" className=" mb-6">
          <Form.Label className=" mb-1 text-base font-normal">Mobile Number</Form.Label>
          <Form.Control asChild>
            <Input type={"tel"} pattern="^[6-9]\d{9}$" className="border-stone-300" required />
          </Form.Control>
          <Form.Message match={"valueMissing"}>Please enter a valid mobile number</Form.Message>
          <Form.Message match={"patternMismatch"}>Please enter a valid 10 digit mobile number</Form.Message>
        </Form.Field>
        <Form.Field name="pnr" className=" mb-6">
          <Form.Label className=" mb-1 text-base font-normal">PNR Number</Form.Label>
          <Form.Control asChild>
            <Input type={"number"} pattern="^[6-9]\d{9}$" className="border-stone-300" required />
          </Form.Control>
          <Form.Message match={"valueMissing"}>Please provide PNR Number</Form.Message>
          <Form.Message match={"patternMismatch"}>Please enter a valid 10 digit PNR number</Form.Message>
        </Form.Field>
        <Form.Submit asChild className="block w-full bg-primary">
          <Button variant='outline' disabled={disableForm}>CHECK IN</Button>
        </Form.Submit>
      </Form.Root>
    </>
  )
}

export default CheckInForm
