import Image from "next/image"

const { Ship } = require("lucide-react") as any

interface TravelCardProps {
  logoSrc: string
  departureTime: string
  arrivalTime: string
  fromLocation: string
  fromCode: string
  toLocation: string
  toCode: string
  shipName: string
  seatInfo: string
  quotaTitle: string
  quotaType: string
}

export default function TravelCard({
  logoSrc,
  departureTime,
  arrivalTime,
  fromLocation,
  fromCode,
  toLocation,
  toCode,
  shipName,
  seatInfo,
  quotaTitle,
  quotaType,
}: TravelCardProps) {
  return (
    <div className="rounded-xl bg-gray-100 p-4 shadow-md ">
      {/* Mobile View */}
      <div className="block md:hidden">
        {/* Logo */}
        <Image src={logoSrc} alt="Logo" className="mb-2 size-6" width={32} height={32} />

        {/* Times & Ferry Icon */}
        <div className="mb-1 flex items-center justify-between text-sm font-semibold text-black md:mr-6">
          <span>{departureTime}</span>
          <div className="flex items-center gap-1 text-gray-500">
            <div className="h-px w-8 bg-gray-400" />
            <Ship />
            <div className="h-px w-8 bg-gray-400" />
          </div>
          <span>{arrivalTime}</span>
        </div>

        {/* Location Labels */}
        <div className="mb-2 flex justify-between text-xs text-gray-700">
          <div>
            <div className="font-medium">{fromLocation}</div>
            <div className="text-[11px]">({fromCode})</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{toLocation}</div>
            <div className="text-[11px]">({toCode})</div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between border-t pt-2 text-sm">
          <div>
            <div className="font-semibold">{shipName}</div>
            <div className="text-xs text-gray-600">{seatInfo}</div>
          </div>
          <div className="text-right">
            <div className="font-semibold">{quotaTitle}</div>
            <div className="text-xs text-gray-600">{quotaType}</div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden items-start gap-16 md:flex">
        {/* Left: Logo + Time + Locations */}
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="Logo" className="size-10 object-contain" />

          <div className="flex flex-col">
            <div className="flex items-start text-sm font-semibold text-black">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{departureTime}</span>
                <div>
                  <div className="font-medium">{fromLocation}</div>
                  <div className="text-[11px]">({fromCode})</div>
                </div>
              </div>
              <div className="mt-1 flex">
                <hr className="ml-2 mt-2 w-3 border-gray-400" />
                <span className="mx-2 text-gray-500">
                  <Ship className="mb-1 inline size-4" />
                </span>
                <hr className="mr-2 mt-2 w-3 border-gray-400" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-lg font-bold">{arrivalTime}</span>
                <div>
                  <div className="font-medium">{toLocation}</div>
                  <div className="text-[11px]">({toCode})</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Ship */}
        <div className="ml-4 h-[80px] border-l border-gray-300 px-6 text-center">
          <div className="text-lg font-semibold">{shipName}</div>
          <div className="text-start text-sm text-gray-600">{seatInfo}</div>
        </div>

        {/* Right: Quota */}
        <div className="h-[80px] border-l border-gray-300 pl-6 text-start">
          <div className="text-lg font-semibold">{quotaTitle}</div>
          <div className="text-sm text-gray-600">{quotaType}</div>
        </div>
      </div>
    </div>
  )
}
