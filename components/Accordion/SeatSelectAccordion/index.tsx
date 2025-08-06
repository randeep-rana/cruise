import { useEffect, useState } from "react"
import { aircraftLayouts } from "@/constant/seatLayoutData"
import { generateSeatsFromConfig, getRoomsFromConfig, getZonesFromConfig, markAvailability } from "@/utils/seatUtils"

import SeatMap from "@/components/seat-selection/SeatMap"
import ToggleGroupDemo from "@/components/ui/Toggler"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { H3 } from "@/components/ui/typography"

const SHIP = "mvKavaratti" // mvKavaratti // Valiyapani
const deck = 1

const SHIPS_INFO = {
  Valiyapani: {
    decks: 3,
  },
  mvKavaratti: {
    decks: 3,
  },
}

const SeatLayoutAccordion = () => {
  const [ship, setShip] = useState({
    name: SHIP,
    decks: SHIPS_INFO[SHIP].decks,
    currentDeck: deck,
  })

  const currentLayout = aircraftLayouts[SHIP]["decks"][ship.currentDeck]
  const seats = generateSeatsFromConfig(currentLayout)
  const zones = getZonesFromConfig(currentLayout)
  const rooms = getRoomsFromConfig(currentLayout)
  const bookedSeat = []

  const handlePassengerSelect = (passenger, seat) => {
    console.log("handlePassengerSelect", passenger, seat)
    if (bookedSeat.includes(seat)) {
      bookedSeat.splice(bookedSeat.indexOf(seat.id), 1)
    } else {
      bookedSeat.push(seat)
    }
    console.log(bookedSeat)
    console.log(markAvailability(seats, bookedSeat))
  }

  return (
    <AccordionItem value="step-2" disabled={false} className="my-4 rounded-lg text-left shadow-md">
      <AccordionTrigger className="mb-2 pr-4 text-primaryLakshadweep-700">
        <div className="flex flex-col px-4 pt-2">
          <div className="flex place-content-start items-center">
            <H3 className="ml-0 mt-0 inline pl-0 text-xl font-medium">Seat Selection</H3>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="relative rounded-b-lg bg-brand-600/30 p-4 pb-0">
        <div className="absolute left-1/2 top-4 -translate-x-1/2">
          <ToggleGroupDemo
            defaultValue={ship.currentDeck}
            items={Array.from({ length: SHIPS_INFO[SHIP].decks }, (_, i) => ({ value: i + 1, label: `Deck ${i + 1}` }))}
            handleChange={(e) => {
              setShip((prev) => {
                return {
                  ...prev,
                  currentDeck: e,
                }
              })
            }}
          />
        </div>
        <SeatMap
          ship={ship.name}
          deck={ship.currentDeck}
          metadata={currentLayout.metadata}
          zones={zones}
          seats={markAvailability(seats, bookedSeat)}
          rooms={rooms}
          seatSize={currentLayout.metadata.seatSize}
          gap={currentLayout.metadata.gap}
          containerClass="mt-20"
          handlePassengerSelect={handlePassengerSelect}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default SeatLayoutAccordion
