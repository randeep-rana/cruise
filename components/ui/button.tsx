import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-secondary",
        destructive: "bg-error text-white hover:bg-error-600",
        success: "bg-tertiary text-white hover:bg-tertiary-600",
        outline: "bg-transparent border border-slate-200 hover:bg-slate-100",
        subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost: "bg-transparent hover:bg-slate-100",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-900",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
