import React from "react"
import logo from "@/public/images/sampleShipLogo.png"


import FerryCard from "../FerryDetails"

type Props = {}
const ferryList = Array.from({ length: 4 }, () => ({
  logoSrc: logo.src,
  departureTime: "4:35 PM",
  arrivalTime: "7:35 PM",
  ferryName: "MV Arabian Queen",
  routeCode: "COK - KVT",
  duration: "21h 30m",
  routeLink: "/route/arabian-queen",
  note: "In the heart of the bustling city, vibrant colors dance joyfully under the sun...",
  classOptions: [
    { name: "Owners/VIP", price: 8560, availability: 43 },
    { name: "First Class", price: 4920, waitlist: 24 },
    { name: "Second Class", price: 1820, availability: 3 },
    { name: "Bunk", price: null, availability: 0 },
  ],
}))
const SlotSelect = (props: Props) => {
  return (
    <div className="p-2">
      <div>
        <div className="mx-2  my-4 flex gap-2 md:justify-end">
          <span className="text-green-800 inline-block rounded-full bg-seat-available-light px-3 py-1 text-sm font-medium">Available</span>
          <span className="text-pink-800 inline-block rounded-full bg-seat-waitlist-light px-3 py-1 text-sm font-medium">On Waiting List</span>
          <span className="text-red-900 inline-block rounded-full  bg-seat-unavailable-light px-3 py-1 text-sm font-medium">Not available</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {ferryList.map((ferry, index) => (
          <FerryCard
            key={index}
            logoSrc={ferry.logoSrc}
            departureTime={ferry.departureTime}
            arrivalTime={ferry.arrivalTime}
            ferryName={ferry.ferryName}
            routeCode={ferry.routeCode}
            duration={ferry.duration}
            routeLink={ferry.routeLink}
            note={ferry.note}
            classOptions={ferry.classOptions}
          />
        ))}
      </div>
    </div>
  )
}

export default SlotSelect
