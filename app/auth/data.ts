import {LakshdweepInfo } from "@/config/site"

export interface Data {
  heading: string
  note: Note | Note2
}

export interface Note {
  anchor: string
  link: string
  text: string
}
export interface Note2 {
  text: string
}


export const LakshdweepData: Data = {
  heading: "Lakshdweep Ferry Services",
  note: LakshdweepInfo,
}


