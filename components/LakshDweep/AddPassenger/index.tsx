import { useState } from "react"
import { FormField } from "@/app/auth/UnifiedSignupForm" 
import { USERS } from "@/constant"
import * as Form from "@radix-ui/react-form"
import { Check, UserPlus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"

const genders = ["Male", "Female", "Other"]
const relations = ["Father", "Mother", "Spouse", "Sibling", "Child", "Friend"]

export const getInitialPassengerForm = (userType) => ({
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  permitId: userType === USERS.TOURIST ? "" : undefined,
  relation: [USERS.RESIDENT, USERS.NON_RESIDENT, USERS.GOVT_OFFICIAL, USERS.STUDENT].includes(userType) ? "" : undefined,
  idCardNo: userType === USERS.GOVT_OFFICIAL ? "" : undefined,
  validTill: userType === USERS.GOVT_OFFICIAL ? "" : undefined,
  isDisabled: false,
  pwdId: "",
})

export function AddPassenger({
  userType,
  disabled = false,
  heading,
  actionButtonLabel,
  modalTogglerLabel,
  actionBtnType = null,
}: {
  userType: string
  disabled?: boolean
  heading: string
  actionButtonLabel: string
  modalTogglerLabel: string
  actionBtnType?: "submit" | "button" | null
}) {
  const [formData, setFormData] = useState(() => getInitialPassengerForm(userType))
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [open, setOpen] = useState(false)

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required."
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required."
    if (!formData.gender) newErrors.gender = "Select gender."
    if (!formData.dob) newErrors.dob = "Date of birth is required."

    if (userType === USERS.TOURIST && !formData.permitId?.trim()) {
      newErrors.permitId = "Permit ID is required."
    }

    if ([USERS.RESIDENT, USERS.NON_RESIDENT, USERS.GOVT_OFFICIAL, USERS.STUDENT].includes(userType)) {
      if (!formData.relation) newErrors.relation = "Select relation."
    }

    if (userType === USERS.GOVT_OFFICIAL) {
      if (!formData.idCardNo?.trim()) newErrors.idCardNo = "ID Card No. is required."
      if (!formData.validTill?.trim()) newErrors.validTill = "Validity is required."
    }

    if (formData.isDisabled && !formData.pwdId?.trim()) {
      newErrors.pwdId = "PwD ID is required."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validate()) return
    console.log("✅ Passenger added:", formData)
    setOpen(false)
  }

  const handleResetDetails = () => {
    setFormData(getInitialPassengerForm(userType))
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

      <DialogContent className="max-h-screen w-full overflow-y-auto md:max-w-[50vw]">
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="text-brand-600">{heading}</DialogTitle>
        </DialogHeader>

        <Form.Root onSubmit={handleSubmit} className="space-y-4 text-base">
          <div className="grid grid-cols-1 gap-4 rounded-xl p-2 md:grid-cols-3">
            <FormField
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              placeholder="Enter your name"
              className="w-full"
            />

            <FormField
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              placeholder="Enter your name"
              className="w-full"
            />

            <Form.Field name="gender" className="w-full">
              <Form.Label className="mb-1 block font-medium">Gender</Form.Label>
              <Form.Control asChild>
                <select
                  className={cn("w-full rounded border px-3 py-2", !formData.gender && "text-gray-400")}
                  onChange={(e) => handleChange("gender", e.target.value)}
                >
                  <option value="">Select gender</option>
                  {genders.map((g) => (
                    <option key={g} value={g} className="text-black">
                      {g}
                    </option>
                  ))}
                </select>
              </Form.Control>
              {errors.gender && <p className="text-sm text-error">{errors.gender}</p>}
            </Form.Field>

            {[USERS.RESIDENT, USERS.NON_RESIDENT, USERS.GOVT_OFFICIAL, USERS.STUDENT].includes(userType) && (
              <Form.Field name="relation" className="w-full">
                <Form.Label className="mb-1 block font-medium">Relation</Form.Label>
                <Form.Control asChild>
                  <select
                    className={cn("w-full rounded border px-3 py-2", !formData.relation && "text-gray-400")}
                    onChange={(e) => handleChange("relation", e.target.value)}
                  >
                    <option value="">Select relation</option>
                    {relations.map((r) => (
                      <option key={r} value={r} className="text-black">
                        {r}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.relation && <p className="text-sm text-error">{errors.relation}</p>}
              </Form.Field>
            )}

            <FormField
              name="dob"
              label="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              error={errors.dob}
              className="w-full"
            />

            {userType === USERS.TOURIST && (
              <FormField
                name="permitId"
                label="Permit ID"
                value={formData.permitId}
                onChange={handleChange}
                error={errors.permitId}
                placeholder="Add Permit ID"
                className="w-full"
              />
            )}

            {userType === USERS.GOVT_OFFICIAL && (
              <>
                <FormField
                  name="idCardNo"
                  label="ID Card No."
                  value={formData.idCardNo}
                  onChange={handleChange}
                  error={errors.idCardNo}
                  placeholder="Enter ID number"
                  className="w-full"
                />
                <FormField
                  name="validTill"
                  type="month"
                  label="Valid Till (MM/YY)"
                  value={formData.validTill}
                  onChange={handleChange}
                  error={errors.validTill}
                  placeholder="Month/Year"
                  className="w-full"
                />
              </>
            )}

            <div className="space-y-2 md:col-span-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isDisabled}
                  onChange={(e) => handleChange("isDisabled", e.target.checked)}
                  className="accent-brand-600"
                />
                <span className="text-sm">
                  Identify as a Person with a Disability?
                  <span className="text-muted-foreground ml-1 italic">(check for yes)</span>
                </span>
              </label>

              {formData.isDisabled && (
                <FormField
                  name="pwdId"
                  label="PwD ID"
                  value={formData.pwdId}
                  onChange={handleChange}
                  error={errors.pwdId}
                  placeholder="Enter PwD ID"
                  className="w-full md:w-1/2"
                />
              )}
            </div>
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
