import { memo, useEffect } from "react"

import "./index.scss"
import { FC } from "react"
import { TENANTS } from "@/constant"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"

interface PriceProps {
  label: string
  value: number
}

const Price: FC<PriceProps> = ({ label, value }) => {
  return (
    <div className="row">
      <p>{label}</p>
      <p>₹{value}</p>
    </div>
  )
}

interface CollapsibleProps {
  title: string
  total: number
  children: React.ReactNode
}

const CollapsibleComponent: FC<CollapsibleProps> = ({ title, total, children }) => {
  return (
    <Collapsible>
      <CollapsibleTrigger className="mt-4 flex w-full cursor-pointer items-center justify-between pr-2 text-sm [&[data-state=open]>div>svg]:rotate-180">
        <div className="flex items-center">
          <ChevronDown className={`transition-transform duration-200`} />
          <span className="ml-2">{title}</span>
        </div>
        <span>₹{total}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mb-4 ml-[24px] mt-2 px-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export interface PriceObj {
  bookingId?: string
  passengersCount: number
  baseFees: number
  taxes: number
  convenienceFees: number
  convenienceFeeTax: number
  tatkalFare: number
  tatkalFareTax: number
  amountPayable?: number
}

interface PricingDetailsProps {
  priceObj: any // PriceObj
  title: string
  page?: string
}

const TenantName = process.env.NEXT_PUBLIC_TENANT

export const PricingDetails = ({ priceObj, title, page = "booking" }: PricingDetailsProps) => {
  const { bookingId, passengersCount, baseFees, taxes, convenienceFees, convenienceFeeTax, tatkalFare, tatkalFareTax, amountPayable } = priceObj

  const multiplier = bookingId ? 1 : passengersCount
  const multiply = (price: number) => {
    return Math.round(price * multiplier)
  }
  const getHelicopterFees = () => {
    return multiply(baseFees + taxes)
  }
  const getConvenienceFees = () => {
    return multiply(convenienceFees + convenienceFeeTax)
  }
  const getTatkalFees = () => {
    return multiply(tatkalFare + tatkalFareTax)
  }
  const getTotal = () => {
    return multiply(baseFees + convenienceFees + tatkalFare + tatkalFareTax + taxes + convenienceFeeTax)
  }

  if (passengersCount === 0) {
    return (
      <div className={cn("pricingDetailCard shadow-md", page === "cart" && "sticky top-20")} id="pricing">
        <h6>{title}</h6>
        <div>
          <div className="row">
            <p>Please select passengers to see the price details</p>
          </div>
        </div>
      </div>
    )
  }

  const isLakshadweep = process.env.NEXT_PUBLIC_TENANT === TENANTS.LAKSHADWEEP
  const FareTitle = isLakshadweep ? "Ship Fare" : "Helicopter Fare"
  return (
    <div className={cn("pricingDetailCard shadow-md", page === "cart" && "sticky top-20")} id="pricing">
      <h6 className="mb-4 text-primary">
        {title} ({passengersCount} seat{passengersCount > 1 ? "s" : ""})
      </h6>
      <div>
        <CollapsibleComponent title={FareTitle} total={getHelicopterFees()}>
          <Price label="Fare" value={multiply(baseFees)} />
          <Price label="GST" value={multiply(taxes)} />
        </CollapsibleComponent>
        <Separator className="my-2" />
        {tatkalFare > 0 ? (
          <>
            <CollapsibleComponent title="Dynamic Fare" total={getTatkalFees()}>
              <Price label="Fare" value={multiply(tatkalFare)} />
              <Price label="GST" value={multiply(tatkalFareTax)} />
            </CollapsibleComponent>
            <Separator className="my-2" />
          </>
        ) : null}
        <CollapsibleComponent title="Convenience Fee" total={getConvenienceFees()}>
          <Price label="Conv. Fee" value={multiply(convenienceFees)} />
          <Price label="GST" value={multiply(convenienceFeeTax)} />
        </CollapsibleComponent>

        <Separator className="my-2" />
        <div className="mt-4 flex justify-between pr-2 text-xl text-primary">
          <p>Total</p>
          <p>₹{amountPayable ?? getTotal()}</p>
        </div>
      </div>
    </div>
  )
}
