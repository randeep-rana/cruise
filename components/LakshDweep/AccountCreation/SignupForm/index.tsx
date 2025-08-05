"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Umbrella } from "lucide-react"

import { cn } from "@/lib/utils"
import { FormHeading } from "@/components/login-form"

const roles = [
  {
    label: "Islander",
    value: "islander",
    description: "Resident / Non-Resident / Student / Govt. Official",
    icon: Umbrella,
    iconBg: "bg-brand-600",
  },
  {
    label: "Tourist",
    value: "tourist",
    description: "Travelling for Leisure/Non-Islanders",
    icon: Building2,
    iconBg: "bg-accent-600",
  },
]

export default function SignupForm() {
  const router = useRouter()

  const onClick = async (value) => {
    const params = new URLSearchParams(window.location.search)
    params.set("user", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <>
      <FormHeading heading="Create an Account" />

      <div className="flex flex-col gap-4">
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            onClick={() => onClick(role.value as "islander" | "tourist")}
            className={cn("flex items-center gap-4 rounded-xl border p-4 text-left shadow-sm transition hover:shadow-md")}
          >
            <div className={cn("rounded-full p-3 text-white", role.iconBg)}>
              <role.icon className="size-5" />
            </div>
            <div>
              <div className="text-lg font-semibold">{role.label}</div>
              <div className="text-muted-foreground text-sm">{role.description}</div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/laksh" className="text-primary">
          Login
        </Link>
      </p>
    </>
  )
}
