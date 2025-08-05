import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface DeclarationModalProps {
  open: boolean
  onContinue: () => void
  onClose: () => void
}

export const DeclarationModal: React.FC<DeclarationModalProps> = ({ open, onContinue, onClose }) => {
  const [agreed, setAgreed] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg lg:max-w-3xl">
        <DialogHeader className="my-4 text-center">
          <DialogTitle className="text-3xl font-normal">Declaration & Terms</DialogTitle>
        </DialogHeader>

        <Separator />

        <ul className=" text-muted-foreground list-inside list-decimal space-y-2 text-base font-normal">
          <li>You must carry a valid government-issued ID used during booking.</li>
          <li>You must arrive at least 1 hour before departure at the boarding terminal.</li>
          <li>Baggage will be weighed at the terminal. Discrepancies may result in denial of boarding.</li>
          <li>Each passenger is allowed a maximum of 3 bags, with each bag not exceeding 30 kg.</li>
          <li>No excess baggage is allowed. You cannot request extra allowance at the port.</li>
          <li>Once checked in, changes are not allowed. Ensure all information is accurate.</li>
          <li>You are responsible for being at the boarding gate on time. Missing the ferry will result in ticket forfeiture.</li>
          <li>No refunds or re-issue will be provided after check-in is complete.</li>
          <li>Follow crew instructions and terminal guidelines at all times for safety.</li>
        </ul>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox className="border-black" id="terms" defaultChecked={false} checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} />
            <Label htmlFor="terms" className="text-base font-normal">
              Agree to terms & conditions
            </Label>
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={onContinue} disabled={!agreed}>
              CONTINUE
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
