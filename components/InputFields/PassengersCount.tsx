"use client"

import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const PassengersCount = ({ className = "", placeholder = "", onChange, maxAdults = 6, openModal = false, changeModal = (visible) => {} }) => {
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const toastId = useRef(null)

  useEffect(() => {
    if (adults !== undefined && children !== undefined) {
      onChange({ adultsCount: adults, childrenCount: children })
    }
  }, [adults, children])

  const handleChildChange = (type) => {
    if (type === "add") {
      if (children >= 6) {
        toast.dismiss(toastId.current)
        toastId.current = toast.error("Maximum children cannot be more than 6")
        return
      }

      if (children === adults) {
        toast.dismiss(toastId.current)
        if (adults) {
          toastId.current = toast.error("Maximum children cannot be more than adult count")
          return
        }
        toastId.current = toast.error("Please add adults first")
        return
      }
      setChildren((prev: any) => {
        return prev + 1
      })
    } else {
      setChildren((prev: any) => {
        return prev > 0 ? prev - 1 : prev
      })
    }
  }

  const handleAdultChange = (type) => {
    if (maxAdults && adults === maxAdults && type === "add") {
      toast.dismiss(toastId.current)
      toastId.current = toast.error("Adults count cannot be more than " + maxAdults)
      return
    }

    if (type === "add") {
      if (adults >= 6) {
        toast.dismiss(toastId.current)
        toastId.current = toast.error("Maximum adults cannot be more than 6")
        return
      }
      setAdults((prev: any) => {
        return prev + 1
      })
    } else {
      if (adults && adults === children) {
        setChildren((prev) => prev - 1)
      }
      setAdults((prev: any) => {
        return prev > 1 ? prev - 1 : prev
      })
    }
  }

  useEffect(() => {
    if (openModal === true) {
      setIsOpen(openModal)
    }
  }, [openModal])

  return (
    <div className={cn("w-full", className)}>
      <Popover
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen)
          changeModal(!isOpen)
        }}
      >
        <PopoverTrigger className="flex w-full flex-col gap-2">
          <Label className="text-base font-normal text-gray-500">No. of passengers</Label>
          <Input
            type=""
            placeholder={placeholder || "No. of passenger"}
            className="bg-white"
            value={`${adults} adults, ${children} ${children > 1 ? "children" : "child"}` || ""}
          />
        </PopoverTrigger>
        <PopoverContent className="md:w-[342px]">
          <div className="flex flex-col gap-8 ">
            <div className="flex items-center justify-between">
              <p className="font-medium">Adults</p>
              <div className="flex items-center gap-2">
                <Button onClick={handleAdultChange} disabled={adults === 1}>
                  -
                </Button>
                <span className="w-3 font-bold">{adults}</span>
                <Button onClick={() => handleAdultChange("add")} disabled={adults >= 6}>
                  +
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p>
                <span className="font-medium">Children</span> <br />
                <span>Aged below 3</span>
              </p>
              <div className="flex items-center gap-2">
                <Button onClick={handleChildChange} disabled={!children}>
                  -
                </Button>
                <span className="w-3 font-bold">{children}</span>
                <Button onClick={() => handleChildChange("add")} disabled={children >= 6 || children === adults}>
                  +
                </Button>
              </div>
            </div>
            <div className="gap mb-3 flex flex-col text-black">
              <p className="text-sm font-normal tracking-wide">Maximum 6 adults & 6 children allowed.</p>
              <p className="text-sm font-normal tracking-wide">Number of children cannot exceed adults.</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default PassengersCount
