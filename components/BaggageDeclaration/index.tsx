"use client"

import { useState } from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { H3 } from "@/components/ui/typography"

interface Passenger {
  id: string
  name: string
}

interface PassengerSelection {
  type: string
  baggage: string
}

interface BaggageDeclarationProps {
  passengers: Passenger[]
  typeOptions?: string[]
  weightOptions?: string[]
  className?: string
  onChange?: (data: Record<string, PassengerSelection>) => void
}

export const BaggageDeclaration: React.FC<BaggageDeclarationProps> = ({
  passengers,
  typeOptions = ["HandBag", "Suit Case", "Laptop Bag"],
  weightOptions = ["1-2kgs", "3-5kgs", "6-10kgs", "11-20kgs", "21-30kgs"],
  className,
  onChange,
}) => {
  const [selection, setSelection] = useState<Record<string, PassengerSelection>>({})

  const handleUpdate = (passengerId: string, field: "type" | "baggage", value: string) => {
    const updated = {
      ...selection,
      [passengerId]: {
        ...selection[passengerId],
        [field]: value,
      },
    }
    setSelection(updated)
    onChange?.(updated)
  }

  return (
    <Card className={cn("relative w-[800px] max-w-xl border-none", className)}>
      <CardContent className="space-y-4 p-6">
        <H3 className="text-blue-900 m-0 text-lg font-semibold">Passenger Baggage Declaration</H3>
        <Separator />

        <div className="space-y-4">
          {passengers.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border-b pb-2">
              <Label className="text-sky-900 w-1/3 font-medium">{p.name}</Label>

              <Select value={selection[p.id]?.type || ""} onValueChange={(val) => handleUpdate(p.id, "type", val)}>
                <SelectTrigger className="w-1/3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selection[p.id]?.baggage || ""} onValueChange={(val) => handleUpdate(p.id, "baggage", val)}>
                <SelectTrigger className="w-1/3">
                  <SelectValue placeholder="Select baggage weight" />
                </SelectTrigger>
                <SelectContent>
                  {weightOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
