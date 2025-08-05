import { ClassValue } from "clsx"

import { cn } from "@/lib/utils"

export const FormHeading = ({ heading, className }: { heading: string; className?: ClassValue[] | string }) => (
  <h4 className={cn("border-stone-300 text-stone-500 mb-6 border-b border-solid pb-4 text-center text-3xl font-normal", className)}>{heading}</h4>
)

export const FormCaption = ({ children }) => {
  return <p className="mb-6 text-center text-base">{children}</p>
}
