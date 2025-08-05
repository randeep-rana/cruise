"use client"

import React from "react"

import CheckInCard from "@/components/CheckInCard"

const CheckedIn = () => {
  return (
    <div className="w-full">
      <div className="container my-12">
        <CheckInCard
          ferry="MV Coral Queen"
          route="Kochi → Agatti"
          passengers="3 adults"
          departure="Tue, 23 July • 09:00 AM"
          boardingTime="08:00 AM"
          gateCloses="08:30 AM"
          onDownload={() => {}}
        />
      </div>
    </div>
  )
}

export default CheckedIn
