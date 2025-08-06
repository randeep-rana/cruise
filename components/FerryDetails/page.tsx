"use client"

import Image from "next/image"
import { Info, Ship } from "lucide-react"

import { cn } from "@/lib/utils"

type ClassInfo = {
  name: string
  price: number | null
  availability?: number
  waitlist?: number
}

type FerryCardProps = {
  logoSrc: string
  departureTime: string
  arrivalTime: string
  ferryName: string
  routeCode: string
  duration: string
  classOptions: ClassInfo[]
  routeLink?: string
  note?: string
}

function SeatStatus({ availability, waitlist }: { availability?: number; waitlist?: number }) {
  if (waitlist && waitlist > 0) {
    return <p className="mr-4 w-[130px] rounded-xl bg-seat-waitlist-light px-4 py-1 text-xs font-medium text-seat-waitlist-dark">WL{waitlist}</p>
  }

  if (!availability) {
    return (
      <p className="mr-4 w-[130px] rounded-xl bg-seat-unavailable-light px-2 py-1 text-xs font-medium text-seat-unavailable-dark">
        No Available Seats
      </p>
    )
  }

  const statusClass =
    availability > 20
      ? " bg-seat-available-light text-seat-available-dark"
      : availability > 5
      ? " bg-seat-limited-light text-seat-limited-dark mr-2"
      : " bg-seat-low-light text-seat-low-dark"

  return (
    <p className={cn("mr-2  inline-block w-[130px] rounded-xl px-4 py-1 text-center text-xs font-medium text-white", statusClass)}>
      {availability} Available
    </p>
  )
}

export function getSeatShadowClass({ availability, waitlist }: { availability?: number; waitlist?: number }): string {
  if (!availability || availability === 0) {
    return "shadow-seat-unavailable-light"
  }
  if (waitlist && waitlist > 0) {
    return "shadow-seat-waitlist-dark"
  }

  if (availability > 20) {
    return "shadow-seat-available-light"
  } else if (availability > 5) {
    return "shadow-seat-low-light"
  } else {
    return "shadow-seat-low-light"
  }
}

/* 
Sample usage for the FerryCard
<FerryCard
  logoSrc="/logo.png"
  departureTime="4:35 PM"
  arrivalTime="7:35 PM"
  ferryName="MV Arabian Queen"
  routeCode="COK - KVT"
  duration="21h 30m"
  routeLink="/route/arabian-queen"
  note="In the heart of the bustling city, vibrant colors dance joyfully under the sun..."
  classOptions={[
    { name: "Owners/VIP", price: 8560, availability: 43 },
    { name: "First Class", price: 4920, waitlist: 24 },
    { name: "Second Class", price: 1820, availability: 3 },
    { name: "Bunk", price: null, availability: 0 },
  ]}
/>

/*/

export default function FerryCard({
  logoSrc,
  departureTime,
  arrivalTime,
  ferryName,
  routeCode,
  duration,
  classOptions,
  routeLink = "#",
  note,
}: FerryCardProps) {
  return (
    <div className="w-full rounded-xl border bg-white p-4 shadow-md   ">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-36">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Image src={logoSrc} alt="Logo" width={52} height={52} className="ml-2 object-contain" />
          <div className="ml-5 grid gap-2">
            <div className="grid w-[300px] grid-cols-3 gap-1  text-sm font-semibold text-gray-800">
              <div className="flex flex-col">
                <p className="text-lg font-bold">{departureTime}</p>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold">{ferryName}</div>
                  <div className="text-xs">{routeCode}</div>
                </div>
              </div>
              <div className="-ml-3 mb-14 flex items-center gap-2 text-brand-600">
                <div className="h-[2px] w-8 bg-brand-600 " />
                <Ship className="size-4 bg-white " size={24} strokeWidth={3} />
                <div className="h-[2px] w-8 bg-brand-600" />
              </div>
              <div className=" flex flex-col">
                <span className="text-lg font-bold">{arrivalTime}</span>
                <div className="text-red-500 text-sm">
                  <span>{duration}</span>
                  <p>
                    <a href={routeLink} className="text-error underline">
                      View Route
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 md:w-auto md:grid-cols-4">
          {classOptions.map(({ name, price, availability, waitlist }) => (
            <div
              key={name}
              className={cn(
                "rounded-lg border p-3 text-center text-sm shadow-sm transition-all",
                { "bg-gray-200": !availability },
                `hover:${getSeatShadowClass({ availability, waitlist })} hover:shadow-md `
              )}
            >
              <div className="mb-1 flex items-center justify-center gap-1 font-semibold">
                {name}
                <Info className="size-4 text-gray-400" />
              </div>
              <div className="text-lg font-bold text-gray-800">{price !== null ? `₹${price.toLocaleString()}` : "N/A"}</div>
              <div className="mt-1">
                <SeatStatus availability={availability} waitlist={waitlist} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {note && (
        <div className="mt-4 flex items-start gap-2 rounded-md border-t bg-seat-waitlist-light px-3 py-2 text-xs text-seat-waitlist-dark">
          <Info className="mt-0.5 size-4 " />
          <p>{note}</p>
        </div>
      )}
    </div>
  )
}