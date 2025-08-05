"use client"

import { useSearchParams } from "next/navigation"
import { DESTINATIONS, defaultDestinationId } from "@/constant"

type Props = {
  textDirection?: "left" | "top" | "right"
  destinationId?: string
  className?: string
  children: React.ReactNode
  backgroundImgUrl?: string
}

export const pageBgImages = {
  // backgroundImg: "https://neon.ipsator.com/c/image/upload/q_75/v1678814513/heliyatra/images/bg-kedarnath-1.webp",
  [DESTINATIONS.KEDARNATH.id]: DESTINATIONS.KEDARNATH.bgImg,
  [DESTINATIONS.HEMKUND.id]: DESTINATIONS.HEMKUND.bgImg,
  default: DESTINATIONS.KEDARNATH.bgImg,
}

const angle = {
  left: 90,
  top: 180,
  right: 270,
}

const quarterBreak = {
  left: 10,
  top: 25,
  right: 10,
}

const halfBreak = {
  left: 40,
  top: 50,
  right: 40,
}

export default function PageWithBackground({ backgroundImgUrl, textDirection = "left", className, children }: Props) {
  const searchParams = useSearchParams()
  const destinationId = searchParams?.get("destinationId") || defaultDestinationId
  const backgroundImg = backgroundImgUrl ? backgroundImgUrl : pageBgImages[destinationId] || pageBgImages.default
  return (
    <section
      className={`page-container min-h-[600px] w-full bg-cover bg-top bg-no-repeat  md:h-screen md:w-full md:bg-cover ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle[textDirection]}deg, #ffffff 0%, rgba(255, 255, 255, 0.857985) ${quarterBreak[textDirection]}%, rgba(255, 255, 255, 0) ${halfBreak[textDirection]}%), url("${backgroundImg}")`,
        backgroundPositionX: textDirection === "left" ? "200px" : "0",
      }}
    >
      <div className="container md:h-screen">{children}</div>
    </section>
  )
}
