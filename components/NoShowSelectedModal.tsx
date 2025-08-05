import { useState } from "react"
import * as Form from "@radix-ui/react-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ShowCancelModal({
  role = "COUNTER",
  count = 0,
  onSubmit = (data: any) => {},
  triggerText = "",
  variant = null,
  isTriggerDisabled = false,
  showCount = false,
  customClass = "",
  triggerButtonClass = "mt-8",
}) {
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState("cancel")

  const handleModal = (type: string) => {
    setModalType(type)
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.stopPropagation()
    event.preventDefault()
    // logic here for form
    const formData = Object.fromEntries(new FormData(event.currentTarget))
    onSubmit(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      {triggerText ? (
        <DialogTrigger asChild>
          <Button onClick={() => handleModal("cancel")} variant={variant} disabled={isTriggerDisabled} className={customClass}>
            {triggerText}
          </Button>
        </DialogTrigger>
      ) : (
        <div className={cn("flex items-center justify-start gap-4", triggerButtonClass)}>
          <div>{count} Selected</div>
          <DialogTrigger asChild>
            <Button onClick={() => handleModal("cancel")} variant={variant}>
              CANCEL SELECTED
            </Button>
          </DialogTrigger>
        </div>
      )}
      <DialogContent className="w-[625px]">
        <DialogHeader className="border-b pb-2">
          <DialogTitle className="">Confirm Cancellation</DialogTitle>
        </DialogHeader>
        <Form.Root onSubmit={handleSubmit}>
          <div className="mt-4">
            {modalType === "cancel" ? (
              <div className="my-4">
                <h4>Reason for Cancellation: </h4>
                <RadioGroup name="remark" defaultValue="Bad Weather" className="mt-4 mb-8 pl-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Technical" id="r1" />
                    <Label htmlFor="r1">Technical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Operational" id="r2" />
                    <Label htmlFor="r2">Operational</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Bad Weather" id="r3" />
                    <Label htmlFor="r3">Bad Weather</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Force Majeaur" id="r4" />
                    <Label htmlFor="r4">Force Majeaur</Label>
                  </div>
                </RadioGroup>
              </div>
            ) : (
              <h4 className="my-4 p-2">Selected Passengers didn t reached the departure location on time. </h4>
            )}
          </div>
          {showCount || count ? (
            <div className="highlight mb-4">
              {modalType === "show" ? <h2>1 selected for no show</h2> : <h2>{count} selected for cancellation</h2>}
            </div>
          ) : null}
          <DialogFooter>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false)
                }}
              >
                CANCEL
              </Button>
              <Button type="submit" className={"uppercase"}>
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </Form.Root>
      </DialogContent>
    </Dialog>
  )
}
