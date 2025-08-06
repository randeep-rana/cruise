"use client"

import { startTransition, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { indianStates, passwordRules } from "@/constant"
import * as Form from "@radix-ui/react-form"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import OtpVerificationForm from "@/components/LakshDweep/OtpVerificationForm"
import { FormHeading } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "@/components/ui/Toast"
import { useUser } from "@/hooks/useUser"

const islands = ["Agatti", "Kavaratti", "Minicoy", "Kalpeni", "Kadmat"]
const genders = ["Male", "Female", "Other"]

const roleOptions = [
  { label: "RESIDENT", value: "resident" },
  { label: "NON-RESIDENT", value: "non-resident" },
  { label: "GOVT. OFFICIAL", value: "official" },
  { label: "STUDENT", value: "student" },
]
const maritalStatus = ["Married", "Unmarried"]
export default function UnifiedSignupForm() {
  const searchParams = useSearchParams() ; const { replace } = useRouter()
  const roleFromParam = searchParams.get("user") || ""
  const category = roleFromParam === "islander" ? "resident" : "tourist"
  const router = useRouter()
  const {SignUp}=useUser()
  const [selectedRole, setSelectedRole] = useState(category)
  const [showOtpScreen, setShowOtpScreen] = useState(false)
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const minBirthDate = eighteenYearsAgo.toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    gender: "",
    state: "",
    email: "",
    dob: "",
    validity: "",
    password: "",
    island: "",
    maritalStatus: "",


    docNumber: "",
    studentId: "",
    nonResidentId: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (["resident", "non-resident", "official", "student", "tourist"].includes(roleFromParam)) {
      setSelectedRole(roleFromParam)
    }
  }, [roleFromParam])

  const handleChange = (field: keyof typeof formData, value: string) => {
    console.log(field, value)
    setFormData({ ...formData, [field]: value })
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }
  function setQueryParam(event) {
    let value = event.target.value
    const params = new URLSearchParams(window.location.search)
    params.set("user", roleFromParam)
    setSelectedRole(value)
    // router.push(`?${params.toString()}`, { scroll: false })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required."
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required."
    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) newErrors.mobileNumber = "Invalid mobile number."
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address."

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required."
    } else {
      const birthDate = new Date(formData.dob)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const isBirthdayPassed =
        today.getMonth() > birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
      const actualAge = isBirthdayPassed ? age : age - 1

      if (actualAge < 18) {
        newErrors.dob = "You must be at least 18 years old."
      }

      if (selectedRole === "student" && actualAge > 22) {
        newErrors.dob = "Students must be 22 or younger."
      }
    }
    if (!["tourist", "non-resident"].includes(selectedRole)) {
      if (!formData.island) newErrors.island = "Please select your residing island."
    }
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters."
    if (!formData.gender) newErrors.gender = "Gender is required."

    if (selectedRole !== "student" && !formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required."
    }

    if (selectedRole === "non-resident") {
      if (!formData.nonResidentId) {
        newErrors.nonResidentId = "Non-Resident ID is required."
      }
      if (!formData.validity.trim()) newErrors.validity = "Document validity is required."
    }
    if (selectedRole === "tourist") {
      if (!formData.state) newErrors.state = "Select state."
    }

    if (selectedRole === "official") {
      if (!formData.docNumber.trim()) newErrors.docNumber = "Document number is required."
      if (!formData.validity.trim()) newErrors.validity = "Document validity is required."
    }

    if (selectedRole === "student") {
      if (!formData.studentId) {
        newErrors.studentId = "Student ID is required."
      }
      if (!formData.validity.trim()) newErrors.validity = "Document validity is required."
    }
    console.log(newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    
    
        const { data: signupData, success, message } = await SignUp({ ...formData, password: formData.password,  })
    
        startTransition(() => {
          if (!success) {
            // toast.error(message || "Something went wrong")
            return
          }
          toast.success(signupData)
          
          setShowOtpScreen(true)
          
        })
    
  }
  return (
    <>
      {showOtpScreen ? (
        <OtpVerificationForm
          onVerify={(otp) => {
            console.log("Final OTP:", otp)
            router.push("/auth/addPassenger")
          }}
        />
      ) : (
        <div className="relative">
          <FormHeading heading={`Enter Your Details`} className="text-center text-brand-600" />
          <div className="mb-4">
            {roleFromParam !== "tourist" && (
              <>
                <Label>Category*</Label>
                <select className={cn("w-full rounded border px-3 py-2")} onChange={setQueryParam}>
                  {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </>
            )}
            {/* <ToggleGroupDemo items={roleOptions} defaultValue={selectedRole} handleChange={setQueryParam} className="" /> */}
          </div>
          <Form.Root onSubmit={handleSubmit} className="space-y-5 text-base">
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <FormField
                name="firstName"
                className="md:w-1/2"
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <FormField
                name="lastName"
                className="md:w-1/2"
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
            </div>
            <div className="flex w-full flex-col  gap-2 md:flex-row">
              {/* Gender field with error */}
              <Form.Field name="gender" className={cn("md:w-1/2")}>
                <Form.Label className="mb-1 block font-medium">Gender</Form.Label>
                <Form.Control asChild>
                  <select
                    className={cn("w-full rounded border px-3 py-2", !formData.gender && "text-gray-400")}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="" selected disabled hidden className="text-gray-500">
                      Select Gender
                    </option>
                    {genders.map((i) => (
                      <option key={i} value={i} className="text-black">
                        {i}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.gender && <p className="text-sm text-error">{errors.gender}</p>}
              </Form.Field>

              <FormField
                className="md:w-1/2"
                name="dob"
                label="Date of Birth"
                max={minBirthDate}
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
              />
            </div>

            {!["student"].includes(selectedRole) && (
              <Form.Field name="maritalStatus" className={cn("w-full")}>
                <Form.Label className="mb-1 block font-medium">Marital Status</Form.Label>
                <Form.Control asChild>
                  <select
                    className={cn("w-full rounded border px-3 py-2", !formData.maritalStatus && "text-gray-400")}
                    onChange={(e) => handleChange("maritalStatus", e.target.value)}
                  >
                    <option value="" selected disabled hidden className="text-gray-500">
                      Select Marital Status
                    </option>
                    {maritalStatus.map((i) => (
                      <option key={i} value={i} className="text-black">
                        {i}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.maritalStatus && <p className="text-sm text-error">{errors.maritalStatus}</p>}
              </Form.Field>
            )}
            {!["tourist", "non-resident"].includes(selectedRole) && (
              <Form.Field name="island">
                <Form.Label className="mb-1 block font-medium">Island of Residence</Form.Label>
                <Form.Control asChild>
                  <select
                    className={cn("w-full rounded border px-3 py-2", !formData.island && "text-gray-400")}
                    onChange={(e) => handleChange("island", e.target.value)}
                  >
                    <option value="" selected disabled hidden className="text-gray-500">
                      Select Island
                    </option>
                    {islands.map((i) => (
                      <option key={i} value={i} className="text-black">
                        {i}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.island && <p className="text-sm text-error">{errors.island}</p>}
              </Form.Field>
            )}
            {selectedRole === "tourist" && (
              <Form.Field name="state">
                <Form.Label className="mb-1 block font-medium">State</Form.Label>
                <Form.Control asChild>
                  <select
                    className={cn("w-full rounded border px-3 py-2", !formData.state && "text-gray-400")}
                    onChange={(e) => handleChange("state", e.target.value)}
                  >
                    <option value="">Select a State</option>
                    {indianStates.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </Form.Control>
                {errors.state && <p className="text-sm text-error">{errors.state}</p>}
              </Form.Field>
            )}
            {["student", "official", "non-resident"].includes(selectedRole) && (
              <div className="flex w-full justify-between">
                {/* Doc Type */}
                {selectedRole === "student" && (
                  <FormField
                    name="studentId"
                    label="College ID no."
                    placeholder="Enter ID no."
                    value={formData.studentId}
                    onChange={handleChange}
                    error={errors.studentId}
                  />
                )}
                {selectedRole === "official" && (
                  <FormField
                    name="docNumber"
                    label="Govt. Identification Number"
                    value={formData.docNumber}
                    onChange={handleChange}
                    placeholder="Enter ID no."
                    error={errors.docNumber}
                  />
                )}
                {selectedRole === "non-resident" && (
                  <FormField
                    name="nonResidentId"
                    label="Non-Resident ID no."
                    value={formData.nonResidentId}
                    onChange={handleChange}
                    placeholder="Enter ID no."
                    error={errors.nonResidentId}
                  />
                )}
                <Form.Field name="validity">
                  <Form.Control asChild>
                    <FormField
                      name="validity"
                      label="Valid till (mm/yy)"
                      value={formData.validity}
                      placeholder="mm/yy"
                      onChange={handleChange}
                      min={new Date()}
                      error={errors.validity}
                      type="month"
                    />
                  </Form.Control>
                </Form.Field>
              </div>
            )}

            <FormField
              name="mobileNumber"
              label="Mobile Number"
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              error={errors.mobileNumber}
            />

            <FormField
              name="email"
              label="Email (optional)"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Form.Field name="password" className="mb-6">
              <Form.Label className="text-base font-medium">Password</Form.Label>
              <Form.Control asChild>
                <PasswordInput placeholder="Set Password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)} />
              </Form.Control>

              <PasswordChecklist password={formData.password} />
            </Form.Field>

            {/* State */}

            <Form.Submit asChild>
              <Button className="w-full  bg-brand-600 text-white ">CREATE ACCOUNT</Button>
            </Form.Submit>
          </Form.Root>
        </div>
      )}
    </>
  )
}

// Reusable Input Field
export function FormField({ name, label, value, onChange, error, type = "text", maxLength, className, placeholder, ...props }: any) {
  return (
    <Form.Field name={name} className={className}>
      <Form.Label className="mb-1 block font-medium">{label}</Form.Label>
      <Form.Control asChild>
        <Input type={type} value={value} maxLength={maxLength} placeholder={placeholder} {...props} onChange={(e) => onChange(name, e.target.value)} />
      </Form.Control>
      {error && <p className="text-sm text-error">{error}</p>}
    </Form.Field>
  )
}

export function PasswordChecklist({ password }: { password: string }) {
  return (
    <ul className="mt-2 space-y-1 text-sm">
      {passwordRules.map((rule, i) => {
        const passed = rule.check(password)
        return (
          <li key={i} className={cn("flex items-center gap-2", passed ? "text-brand-600" : "text-error")}>
            {passed ? <Check className="size-4" /> : <X className="size-4" />}
            <span>{rule.label}</span>
          </li>
        )
      })}
    </ul>
  )
}
