"use client"

import lakshadweep from "@/public/images/lakshadweep.png"

type Props = {
  textDirection?: "left" | "top" | "right"
  destinationId?: string
  className?: string
  children: React.ReactNode
  backgroundImgUrl?: string
}

export default function PageFormat({ textDirection = "left", className, children }: Props) {
  return (
    <section
      className={`page-container w-full  bg-no-repeat md:w-full md:bg-cover ${className} place-content-center py-20 md:max-h-[180vh] md:min-h-screen `}
      style={{
        backgroundImage: `url("${lakshadweep.src}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="container">{children}</div>
    </section>
  )
}
