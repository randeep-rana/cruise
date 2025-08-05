"use client"

import { memo, useState } from "react"
import { CircleUser, User } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"

type PassengerDetail = {
  name: string
  gender: string
  dob: string
  relation: string
  pwdId?: string
}

type Props = {
  index: number
  passengerDetail: PassengerDetail
  isSelected: boolean
  handleCheck: (params: { passengerDetail: PassengerDetail; checked: boolean }) => void
  disabled?: boolean
}

function SelectTravellingAccordionRowShip({ index, passengerDetail, isSelected, handleCheck, disabled = false }: Props) {
  const [checked, setChecked] = useState(isSelected)
  const { name, gender, dob, relation, pwdId } = passengerDetail

  const handleClick = () => {
    const newChecked = !checked
    setChecked(newChecked)
    handleCheck({ passengerDetail, checked: newChecked })
  }

  return (
    <tr className={!checked && !disabled ? "border-b last:border-b-0" : ""}>
      <td className="w-8 p-2">
        <Checkbox
          className="data-[state=checked]:border-primaryLakshadweep-700 data-[state=indeterminate]:border-primaryLakshadweep-700 data-[state=checked]:bg-white data-[state=indeterminate]:bg-white"
          id={name}
          checked={checked}
          onClick={handleClick}
          disabled={disabled}
        />
      </td>

      <td className="p-2">
        <div className="flex flex-col gap-1">
          <div>
            <span className="text-xl font-medium">{name}</span>
            {relation?.toLowerCase() === "self" && <span className="text-muted text-xs">(You)</span>}
          </div>

          <div className="flex gap-2">
            <div className="flex gap-1">
              <CircleUser className="mt-[2px] size-4" />
              <span className="text-muted-foreground font-normal">{gender}</span>
            </div>
            <span className="text-muted-foreground font-normal">{dob}</span>
          </div>
        </div>
      </td>

      <td className="p-2 text-sm">
        <div className="flex flex-col">
          {pwdId && (
            <>
              <span className="text-base font-medium text-primaryLakshadweep-900">PwD ID</span>
              <span className="text-base font-normal">{pwdId}</span>
            </>
          )}
        </div>
      </td>

      <td className="p-2 text-right align-middle">
        <div className="text-xs text-gray-600">
          <span className="text-base font-medium text-primaryLakshadweep-900">Relation</span>
          <br />
          <span className="text-base font-normal">{relation}</span>
        </div>
      </td>
    </tr>
  )
}

export default memo(SelectTravellingAccordionRowShip)
