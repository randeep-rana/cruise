"use client"

import React from "react"
import Image from "next/image"
import DockYardShip from "@/public/images/dockyard-ship.png"

import { BaggageDeclaration } from "@/components/BaggageDeclaration"
import { BaggageRulesCard } from "@/components/BaggageRulesCard"
import { DeclarationModal } from "@/components/DeclarationModal"
import { Button } from "@/components/ui/button"

const baggageRules = [
  "You may carry up to 1 check-in bag per passenger.",
  "Each bag must weigh 30 kg or less.",
  "No excess baggage is allowed.",
  "Be accurate — your bags will be checked at boarding.",
]

const Baggage = () => {
  const [isDeclarationModalOpen, setIsDeclarationModalOpen] = React.useState(false)
  const handleClickProceed = () => {
    setIsDeclarationModalOpen(true)
    return
  }

  const handleContinue = () => {
    window.location.replace("/web-check-in/checked-in")
  }

  const passengers = [
    { id: "1", name: "Rohan Mehta" },
    { id: "2", name: "Aisha Khan" },
    { id: "3", name: "Liam Johnson" },
    { id: "4", name: "Sophia Patel" },
  ]
  return (
    <div className="w-full">
      <Image src={DockYardShip} alt="Dockyard Ship" className="h-60 w-full object-cover object-center" />
      <div className="container my-10 flex justify-between bg-white">
        <div>
          <BaggageDeclaration passengers={passengers} onChange={(data) => console.log("Selected:", data)} />
        </div>
        <div className="mt-4">
          <BaggageRulesCard rules={baggageRules} />
        </div>
      </div>

      <DeclarationModal open={isDeclarationModalOpen} onContinue={handleContinue} onClose={() => setIsDeclarationModalOpen(false)} />

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
              className="rounded-md bg-gray-300 px-6 font-medium text-white hover:bg-white/30"
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

export default Baggage
