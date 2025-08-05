import React from "react"
import { cn } from "@/lib/utils"

type Passenger = {
    name: string
    seatLabel: string
}

type PassengerListCardProps = {
    confirmedPassengers: Passenger[]
    waitlistedPassengers: Passenger[]
    containerClassName?: string
}

const PassengerItem = ({
    name,
    seatLabel,
    type,
}: {
    name: string
    seatLabel: string
    type: "confirmed" | "waiting"
}) => {
    const bgClass =
        type === "confirmed" ? "bg-brand-600 text-white" : "bg-yellow-500 text-black"

    return (
        <div className="flex items-center justify-between text-base font-normal">
            <span>{name}</span>
            <span className={cn("rounded px-2 py-0.5 text-xs font-semibold bg-seat-limited-dark", bgClass)}>
                {seatLabel}
            </span>
        </div>
    )
}

export const PassengerListCard = ({
    confirmedPassengers,
    waitlistedPassengers,
    containerClassName,
}: PassengerListCardProps) => {
    return (
        <div className={cn("w-full rounded-md border border-gray-200 bg-white p-4 shadow-sm text-gray-800", containerClassName)}>
            <div className="mb-4">
                <h4 className="text-xl font-medium text-primaryLakshadweep-900 flex justify-between my-2">
                    <span>
                        Confirm Passengers
                    </span>
                    <span>
                        ({confirmedPassengers.length})
                    </span>
                </h4>
                <div className="space-y-2 text-neutral-400">
                    {confirmedPassengers.map((passenger, index) => (
                        <PassengerItem
                            key={index}
                            name={passenger.name}
                            seatLabel={passenger.seatLabel}
                            type="confirmed"
                        />
                    ))}
                </div>
            </div>

            <hr className="text-neutral-50 my-3" />

            <div>
                <h4 className="text-xl font-medium text-primaryLakshadweep-900 flex justify-between my-2">
                    <span>
                        Waitlisted Passengers
                    </span>
                    <span>
                        ({waitlistedPassengers.length})
                    </span>
                </h4>
                <div className="space-y-2 text-neutral-400">
                    {waitlistedPassengers.map((passenger, index) => (
                        <PassengerItem
                            key={index}
                            name={passenger.name}
                            seatLabel={passenger.seatLabel}
                            type="waiting"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
