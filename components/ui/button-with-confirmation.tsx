import { memo } from "react"

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import { Button, buttonVariants } from "./button"

type ButtonWithConfirmationProps = {
  onClick: () => void
  text: string
  disabled?: boolean
  variant?: "default" | "destructive" | "outline" | "subtle" | "ghost" | "link" | "success"
  className?: string
  description?: string | JSX.Element
  submitBtnText?: string | JSX.Element
  cancelBtnText?: string
  title?: string | JSX.Element
  withCancel?: boolean
  isDefaultOpen?: boolean
  withTrigger?: boolean
  customCancelButton?: JSX.Element
}

const ButtonWithConfirmation = ({
  onClick,
  text,
  disabled,
  variant = "default",
  className = "",
  description = "",
  submitBtnText = "",
  cancelBtnText = "",
  title = "",
  withCancel = true,
  isDefaultOpen = false,
  withTrigger = true,
  customCancelButton,
}: ButtonWithConfirmationProps) => {
  return (
    <AlertDialog defaultOpen={isDefaultOpen}>
      {withTrigger ? (
        <AlertDialogTrigger asChild>
          <Button variant={variant} className={className} disabled={disabled}>
            {text}
          </Button>
        </AlertDialogTrigger>
      ) : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || "This will cancel the booking of selected passengers & refund the paid amount as per cancellation policy."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {customCancelButton ? customCancelButton : null}
          {withCancel ? <AlertDialogCancel>{cancelBtnText || `Don't Cancel`}</AlertDialogCancel> : null}
          <AlertDialogAction onClick={onClick} className={cn(buttonVariants({ variant }))}>
            {submitBtnText || "Proceed to Cancel"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(ButtonWithConfirmation)
