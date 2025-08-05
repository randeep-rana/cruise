"use client"

import { useState } from "react"
import { FormField } from "@/app/(web)/auth/laksh/UnifiedSignupForm"
import * as Form from "@radix-ui/react-form"
import { Check, UserPlus } from "lucide-react"

import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Input } from "../../ui/input"

const genders = ["Male", "Female", "Other"]
const relations = ["Father", "Mother", "Spouse", "Sibling", "Child", "Friend"]

export function AddPassenger({
  // addPilgrim,
  disabled = false,
  heading,
  actionButtonLabel,
  modalTogglerLabel,

  actionBtnType = null,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    relation: "",
    dob: "",
    aadhaar: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required."
    if (!formData.gender) newErrors.gender = "Select gender."
    if (!formData.relation) newErrors.relation = "Select relation."
    if (!formData.dob) newErrors.dob = "Date of birth is required."
    if (!/^\d{12}$/.test(formData.aadhaar.replace(/\s/g, ""))) newErrors.aadhaar = "Aadhaar must be 12 digits."
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validate()) return
    console.log("🧾 Passenger added:", formData)
    // addPilgrim(formData)
    setOpen(false)
  }

  const handleResetDetails = () => {
    setFormData({
      fullName: "",
      gender: "",
      relation: "",
      dob: "",
      aadhaar: "",
    })
    setErrors({})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="focus:ring-offset-none border-brand-600 uppercase text-brand-600 focus:border-none"
          disabled={disabled}
          onClick={handleResetDetails}
          variant="outline"
        >
          <UserPlus className="mr-2 inline stroke-2" size={18} />
          {modalTogglerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[">
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="text-brand-600">{heading}</DialogTitle>
        </DialogHeader>

        <Form.Root onSubmit={handleSubmit} className="space-y-4 text-base">
          <div className="max-w-full space-y-6 rounded-xl p-2">
            {/* Full Name + Gender */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
              <FormField
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                className="w-full md:w-1/2"
              />
              <Form.Field name="gender" className="w-full md:w-1/2">
                <Form.Label className="mb-1 block font-medium">Gender</Form.Label>
                <Form.Control asChild>
                  <select
                    className="w-full rounded border px-3 py-2"
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="">Select</option>
                    {genders.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.gender && <p className="text-sm text-error">{errors.gender}</p>}
              </Form.Field>
            </div>

            {/* Relation + DOB */}
            <div className="flex flex-col gap-3 md:flex-row">
              <Form.Field name="relation" className="w-full md:w-1/2">
                <Form.Label className="mb-1 block font-medium">Relation</Form.Label>
                <Form.Control asChild>
                  <select
                    className="w-full rounded border px-3 py-2"
                    value={formData.relation}
                    onChange={(e) => handleChange("relation", e.target.value)}
                  >
                    <option value="">Select</option>
                    {relations.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.relation && <p className="text-sm text-error">{errors.relation}</p>}
              </Form.Field>

              <FormField
                name="dob"
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
                className="w-full md:w-1/2"
              />
            </div>

            {/* Aadhaar */}
            <Form.Field name="aadhaar">
              <Form.Label className="mb-1 block font-medium">Aadhaar Number</Form.Label>
              <div className="relative flex items-center gap-2">
                <Form.Control asChild>
                  <Input
                    maxLength={14}
                    inputMode="numeric"
                    type="text"
                    value={formData.aadhaar}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 12)
                      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ")
                      handleChange("aadhaar", formatted)
                    }}
                  />
                </Form.Control>
                {formData.aadhaar.replace(/\s/g, "").length === 12 && <Check className="text-green-600 absolute right-3" size={18} />}
              </div>
              {errors.aadhaar && <p className="text-sm text-error">{errors.aadhaar}</p>}
            </Form.Field>
          </div>

          <DialogFooter>
            <Button type={actionBtnType || "submit"} className="w-full bg-brand-600">
              {actionButtonLabel}
            </Button>
          </DialogFooter>
        </Form.Root>
      </DialogContent>
    </Dialog>
  )
}
