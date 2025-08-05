"use client"

import React, { useState } from "react"
import Image from "next/image"
import DockYardShip from "@/public/images/dockyard-ship.png"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { H3 } from "@/components/ui/typography"

type Passenger = {
  id: number
  name: string
  gender: "Male" | "Female"
  dob: string
  relation: string
  seat: string
}

const passengersData: Passenger[] = [
  { id: 1, name: "Rohan Mehta", gender: "Male", dob: "03/11/1985", relation: "Self", seat: "23U" },
  { id: 2, name: "Aisha Khan", gender: "Female", dob: "07/14/1990", relation: "Mother", seat: "10U" },
  { id: 3, name: "Liam Johnson", gender: "Male", dob: "05/22/1982", relation: "Father", seat: "15L" },
  { id: 4, name: "Sophia Patel", gender: "Female", dob: "12/01/1993", relation: "Brother", seat: "18L" },
]

const SelectPassenger = () => {
  const [selected, setSelected] = useState<number[]>([])

  const toggleSelection = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selected.length === passengersData.length) {
      setSelected([])
    } else {
      setSelected(passengersData.map((p) => p.id))
    }
  }

  const handleClickProceed = () => {
    window.location.replace("/web-check-in/baggage")
  }
  return (
    <div className="w-full">
      <Image src={DockYardShip} alt="Dockyard Ship" className="h-60 w-full object-cover object-center" />
      <div className="container bg-white">
        <div className="my-10 max-w-4xl bg-white p-6">
          <h2 className="mb-6 text-[32px] font-medium text-primaryLakshadweep-600">Passengers List</h2>

          {/* Passenger Rows */}
          <div className="divide-y">
            {passengersData.map((passenger, i) => (
              <div
                key={passenger.id}
                className={cn("grid grid-cols-[40px_1.5fr_1fr_1fr] items-end gap-2 py-4", {
                  "border-t": i === 0,
                })}
              >
                {/* Checkbox */}
                <div className="flex justify-center pb-7">
                  <Checkbox
                    className="data-[state=checked]:border-primaryLakshadweep-700 data-[state=indeterminate]:border-primaryLakshadweep-700 data-[state=checked]:bg-white data-[state=indeterminate]:bg-white"
                    checked={selected.includes(passenger.id)}
                    onCheckedChange={() => toggleSelection(passenger.id)}
                  />
                </div>

                {/* Passenger Info */}
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-primaryLakshadweep-900">{passenger.name}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <div className="flex w-[90px] items-center gap-1">
                      <span className="material-icons text-base">account_circle</span>
                      <span>{passenger.gender}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-icons text-base">calendar_today</span>
                      <span>{passenger.dob}</span>
                    </div>
                  </div>
                </div>

                {/* Relation */}
                <div className="mt-1 text-sm text-gray-700">{passenger.relation}</div>

                {/* Seat No */}
                <div>
                  <div className="text-primaryLakshadweep-900">Seat No.</div>
                  <div className="text-cyan-600 mt-1 text-sm font-medium">{passenger.seat}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Select All Button */}
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={selectAll}
              className="border-cyan-600 hover:bg-cyan-50 border-primaryLakshadweep text-primaryLakshadweep"
            >
              {selected.length === passengersData.length ? "DESELECT ALL" : "SELECT ALL"}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#004b5a]">
        <div className="container flex items-center justify-between p-6 text-white">
          {/* Left Warning Text */}
          <p className="text-sm">If you don’t complete check-in at least 24 hours before departure, your ticket may be canceled.</p>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/40"></div>

            {/* Proceed Button (Disabled) */}
            <Button
              variant={"default"}
              disabled={false}
              className="rounded-md bg-primaryLakshadweep-700  px-6 font-medium text-white hover:bg-white/30"
              onClick={handleClickProceed}
            >
              PROCEED
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectPassenger
