import React, { useState } from "react"
import { Calendar, Trash2, User } from "lucide-react"

export const PassengersList = ({ passengers }) => {
  const [list, setList] = useState(passengers)

  const handleRemove = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className=" w-full space-y-4 overflow-y-scroll ">
      {list.map((person, index) => (
        <div key={index} className="flex items-center  justify-between gap-10 rounded-md border p-4 shadow-sm">
          <div className="items center grid w-full grid-cols-1 md:grid-cols-3">
            <div className="w-full md:w-[25%]">
              <p className="w-full text-lg font-medium">{person.name}</p>
              <div className="flex flex-col gap-3 text-sm text-gray-600 md:flex-row">
                <span className="flex items-center gap-1">
                  <User className="size-4" />
                  {person.gender}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  {person.dob}
                </span>
              </div>
            </div>
            <span className="hidden md:block">{person.relation}</span>
            <div className="mt-1 hidden flex-col text-sm md:flex">
              <span className="mr-1 text-gray-500">Aadhaar Number</span>
              <span className="font-mono">{person.aadhaarNumber}</span>
            </div>
          </div>

          {person.actions.remove && (
            <button
              onClick={() => handleRemove(index)}
              disabled={person.actions.removeButtonDisabled}
              className={`flex items-center gap-1 rounded-md border px-3 py-1 text-sm transition ${
                !person.actions.removeButtonDisabled
                  ? "cursor-not-allowed border-gray-300 text-gray-400"
                  : "border-red-500 hover:bg-red-50 text-brand-600"
              }`}
            >
              <Trash2 className="size-4" />
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
