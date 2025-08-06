import { useEffect, useState } from "react"
import { useUser } from "@/hooks/useUser"
import * as Form from "@radix-ui/react-form"

import { IndiaStates } from "@/config/states"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { H3, Subtle } from "../ui/typography"

const ContactInfoAccordion = ({ handleContactInformationProceed }) => {
  const { userInfo } = useUser()

  const [whatsappConsent, setWhatsappConsent] = useState(false)
  const [state, setState] = useState(IndiaStates[0].code)

  function submitContactInfo(event) {
    event.preventDefault()
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    console.log("contact info", formData, whatsappConsent)
    handleContactInformationProceed({ ...formData, whatsappConsent })
  }

  return (
    <AccordionItem value="step-3" disabled={false} className="my-4 rounded-lg p-4 text-left shadow-md">
      <AccordionTrigger className="text-primaryLakshadweep-700">
        <div className="flex flex-col">
          <div className="flex place-content-start items-center">
            <H3 className="ml-0 mt-0 inline pl-0 text-xl font-medium">Contact Information</H3>
          </div>
          <Subtle>Booking information will be sent to this contact info</Subtle>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <Form.Root onSubmit={submitContactInfo} className="grid px-1">
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Field name="fullName" className="mb-4">
              <Form.Label className=" mb-1 text-base font-normal">Full Name</Form.Label>
              <Form.Control asChild>
                <Input type={"text"} defaultValue={userInfo?.role ? userInfo.name : null} className="border-stone-300" required />
              </Form.Control>
              <Form.Message match={"valueMissing"}>Please provide your name</Form.Message>
            </Form.Field>
            <Form.Field name="mobileNumber" className="mb-2">
              <Form.Label className=" mb-1 text-base font-normal">Mobile Number</Form.Label>
              <Form.Control asChild>
                <Input
                  type={"tel"}
                  defaultValue={userInfo?.role ? userInfo.mobileNumber : null}
                  pattern="^[6-9]\d{9}$"
                  className="border-stone-300"
                  required
                />
              </Form.Control>
              <Form.Message match={"valueMissing"}>Please provide a valid mobile number</Form.Message>
              <Form.Message match={"patternMismatch"}>Please provide a valid 10 digit mobile number</Form.Message>
            </Form.Field>
            <Form.Field name="state" className="mb-4">
              <Form.Label className=" mb-1 text-base font-normal">State</Form.Label>
              <Form.Control asChild>
                <select
                  required
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={userInfo?.role ? state : undefined}
                  disabled={!!userInfo?.role}
                >
                  {IndiaStates.map((state) => (
                    <option value={state.code} key={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </Form.Control>
            </Form.Field>
            <Form.Field name="email" className="mb-4">
              <Form.Label className=" mb-1 text-base font-normal">{true ? `Email (Optional)` : "Email"}</Form.Label>
              <Form.Control asChild>
                <Input
                  type={"email"}
                  pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$"
                  className="border-stone-300"
                  required={true}
                  defaultValue={userInfo?.role ? userInfo.email : null}
                />
              </Form.Control>
              <Form.Message match={"valueMissing"}>Please provide email</Form.Message>
              <Form.Message match={"patternMismatch"}>Please provide a valid email address</Form.Message>
            </Form.Field>
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <Checkbox id="whatsapp" checked={whatsappConsent} onClick={() => setWhatsappConsent(!whatsappConsent)} />
            <Label htmlFor="terms">Send booking details via WhatsApp </Label>
          </div>
          <Form.Submit asChild className="block w-full">
            <Button variant="default" className="bg-primaryLakshadweep-700">
              Proceed
            </Button>
          </Form.Submit>
        </Form.Root>
      </AccordionContent>
    </AccordionItem>
  )
}

export default ContactInfoAccordion
