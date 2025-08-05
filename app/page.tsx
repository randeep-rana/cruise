"use client"

import React, { useRef, useState } from "react"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
import useCart from "@/hooks/useCart"
import { useRequest } from "@/hooks/useRequest"
import useTanstackQuery from "@/hooks/useTanstackQuery"
import ShipImage from "@/public/images/lakshadweep-ship.png"
import * as Form from "@radix-ui/react-form"
import { toast } from "react-hot-toast"

import { cn, getCurrentIstDate } from "@/lib/utils"
import { BaggageRulesCard } from "@/components/BaggageRulesCard"
import CheckInCard from "@/components/CheckInCard"
import { DeclarationModal } from "@/components/DeclarationModal"
import PassengersCount from "@/components/InputFields/PassengersCount"
import TravelCard from "@/components/TravelCard"
import ToggleGroup from "@/components/ui/Toggler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { H3 } from "@/components/ui/typography"

export const portOptions = [
  { location: "Kochi", icon: "directions_boat" },
  { location: "Agatti", icon: "directions_boat" },
  { location: "Beypore", icon: "directions_boat" },
  { location: "New Mangalore Port", icon: "directions_boat" },
]

const Lakshadweep = () => {
  const { get } = useRequest()
  const toastId = useRef(null)
  const [selectedTravelDate, setSelectedTravelDate] = useState("")
  const [ticketQuota, setTicketQuota] = useState("general")
  const [details, setDetails] = useState<any | null>(null)
  const [passengers, setPassengers] = useState({ adultsCount: 0, childrenCount: 0 })
  const [selectedSource, setSelectedSource] = useState<string>()
  const [selectedDestination, setSelectedDestination] = useState<string>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeclarationModalOpen, setIsDeclarationModalOpen] = useState(false)

  const formRef = useRef(null)
  const onwardsDateInputRef = useRef(null)
  const router = useRouter()
  // const { data, isFetching } = useTanstackQuery({
  //   queryKey: ["package"],
  //   queryFn: () => get({ url: "/v1/package/home" }),
  //   enabled: false,
  // })

  const handleSearch = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = Object.fromEntries(new FormData(event.currentTarget))
    const departureLocation = event.currentTarget.destination.value

    if (!selectedDestination || !selectedSource) {
      if (toastId.current) toast.dismiss(toastId.current)
      toastId.current = toast.error("Please select source and destination")
      return
    }

    if (selectedDestination === selectedSource) {
      if (toastId.current) toast.dismiss(toastId.current)
      toastId.current = toast.error("Source and destination cannot be same")
      return
    }

    if (!formData.travelDate) {
      if (toastId.current) toast.dismiss(toastId.current)
      toastId.current = toast.error("Please choose date")
      return
    }

    if (!passengers.adultsCount) {
      if (toastId.current) toast.dismiss(toastId.current)
      toastId.current = toast.error("Please add no. of passengers")
      return
    }

    router.push("/app/trip/slot-select")
  }

  const {
    data: slotData,
    isLoading: slotLoading,
    isError: slotError,
  } = useTanstackQuery({
    queryKey: [
      "slotListing",
      details?.travelDate,
      details?.adultsCount,
      details?.childrenCount,
      details?.departureLocation,
      details?.returnLocation,
      details?.ticketQuota,
      details?.destinationId,
      details?.source,
      details?.adultsCount,
      details?.childrenCount,
    ],
    queryFn: () => get({ url: "/v2/flight/search", params: { ...details, returnDate: details?.returnDate || undefined } }),
    enabled: false,
    staleTime: 0,
  })

  const {
    data: slotFilterData,
    isLoading: slotFilterLoading,
    isError: slotFilterError,
  } = useTanstackQuery({
    queryKey: ["slotFiltersData"],
    queryFn: () => get({ url: `/v1/helipad/location/1780117400` }),
    enabled: false,
    staleTime: 0,
  })

  const handleTravelChange = () => {
    if (onwardsDateInputRef.current.showPicker) {
      onwardsDateInputRef.current.showPicker()
    }
  }

  const handleChangePassengers = (e) => {
    setIsModalOpen(true)
  }

  const handleToggleChange = (type) => {
    setTicketQuota(type)
  }

  const baggageRules = [
    "You may carry up to 1 check-in bag per passenger.",
    "Each bag must weigh 30 kg or less.",
    "No excess baggage is allowed.",
    "Be accurate — your bags will be checked at boarding.",
  ]

  return (
    <div className="w-full">
      <div className="bg-[#E1E2EC]">
        <div className="container relative flex flex-col gap-4 py-2">
          <H3 className="mr-32 text-lg md:text-2xl">Plan Your Lakshadweep Voyage</H3>
          <div className="flex">
            <ToggleGroup
              defaultValue={ticketQuota}
              handleChange={(e) => handleToggleChange(e)}
              value={ticketQuota}
              items={[
                { value: "general", label: "General" },
                { value: "tatkal", label: "Tatkal" },
              ]}
              itemClassName="rounded-md border-gray-300 bg-transparent data-[state=on]:border-none data-[state=on]:bg-[#001849] data-[state=on]:text-white data-[state=on]:shadow-sm"
              groupClassName="bg-transparent"
            />
          </div>

          <Form.Root
            ref={formRef}
            className="flex w-full flex-col items-end gap-0 md:flex-row md:flex-wrap md:gap-4 lg:flex-nowrap"
            onSubmit={handleSearch}
          >
            <Form.Field name="source" className="flex w-full flex-col gap-[6px] md:max-w-64">
              <Form.Label className="text-base font-normal text-gray-500">From</Form.Label>
              <Form.Control asChild>
                <Select
                  value={selectedSource}
                  onValueChange={(e) => {
                    setSelectedSource(e)
                    setSelectedDestination(null)
                  }}
                >
                  <SelectTrigger className="mb-8 bg-white">
                    <SelectValue placeholder={"Select Location"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {!!portOptions &&
                      portOptions.map(({ location }: { location: string }) => (
                        <SelectItem value={location} key={location}>
                          {location}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </Form.Control>
            </Form.Field>
            <Form.Field name="destination" className="flex w-full flex-col gap-[6px] md:max-w-44">
              <Label className="text-base font-normal text-gray-500">To</Label>
              <Select name="destination" value={selectedDestination} onValueChange={(e) => setSelectedDestination(e)}>
                <SelectTrigger className="mb-8 bg-white">
                  <SelectValue placeholder={"Select Location"} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {selectedSource && portOptions
                    ? portOptions.map(({ location }: { location: string }) => {
                        if (location === selectedSource) {
                          return null
                        }
                        return (
                          <SelectItem value={location} key={location}>
                            {location}
                          </SelectItem>
                        )
                      })
                    : null}
                </SelectContent>
              </Select>
            </Form.Field>
            <Form.Field name="travelDate" className="flex w-full flex-col gap-[6px] md:max-w-44">
              <Form.Label
                className="text-base font-normal text-gray-500"
                onClick={() => {
                  if (onwardsDateInputRef.current.showPicker) {
                    onwardsDateInputRef.current.showPicker()
                  }
                }}
              >
                Travel Date
              </Form.Label>
              <Form.Control asChild>
                <Input
                  ref={onwardsDateInputRef}
                  onClick={handleTravelChange}
                  type={"date"}
                  onChange={(e) => setSelectedTravelDate(e.target.value)}
                  className="mb-8 w-full bg-white"
                  name="travelDate"
                  min={getCurrentIstDate().toISOString().split("T")[0]}
                ></Input>
              </Form.Control>
            </Form.Field>
            <PassengersCount
              className="mb-8  md:max-w-44"
              maxAdults={slotFilterData?.tenant?.maxAdultCountPerBooking || undefined}
              onChange={({ adultsCount, childrenCount }) => {
                return setPassengers({ adultsCount, childrenCount })
              }}
              openModal={isModalOpen}
              changeModal={setIsModalOpen}
            />
            <Button className="mb-8 w-full uppercase" type="submit">
              Search Ferries
            </Button>
          </Form.Root>
        </div>
      </div>

      <div className="my-10 flex w-full justify-center">
        <NextImage src={ShipImage} alt="Lakshadweep Ship" width={1920} height={1080} />
      </div>

      <CheckInCard
        ferry="MV Coral Queen"
        route="Kochi → Agatti"
        passengers="3 adults"
        departure="Tue, 23 July • 09:00 AM"
        boardingTime="08:00 AM"
        gateCloses="08:30 AM"
        onDownload={() => {}}
      />

      <div className="bg-primary-40">
        <div className="space-y-4 text-center">
          <h1 className="text-xl font-semibold">Boarding Terms</h1>
          <Button onClick={() => setIsDeclarationModalOpen(true)}>Show Declaration Modal</Button>
        </div>
        <DeclarationModal
          open={isDeclarationModalOpen}
          onContinue={() => setIsDeclarationModalOpen(false)}
          onClose={() => setIsDeclarationModalOpen(false)}
        />
      </div>

      <div>
        <BaggageRulesCard rules={baggageRules} />
      </div>

      <div>
        <TravelCard
          logoSrc="https://neon.ipsator.com/c/image/upload/v1724149756/heliyatra/images/image-1.jpg"
          departureTime="4:35 PM"
          arrivalTime="7:35 PM"
          fromLocation="Kochi"
          fromCode="COK"
          toLocation="Kavaratti"
          toCode="KVT"
          shipName="MV Arabian Queen"
          seatInfo="Seat"
          quotaTitle="Quota"
          quotaType="General"
        />
      </div>
    </div>
  )
}

export default Lakshadweep
