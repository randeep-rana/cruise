import { CharDhamRegistartionInfo } from "@/config/site"

export interface Data {
  heading: string
}

export interface Note {
  anchor: string
  link: string
  text: string
}

const data: Data = {
  heading: "Check in for your journey online between 48 to 24 hours before departure.",
}

export const defaultLoginImage = "http://neon.ipsator.com/c/image/upload/q_80/v1743765984/heliyatra/images/login-bg-2.webp"
export const helicopterImage = "https://neon.ipsator.com/c/image/upload/q_40,w_720/v1743765984/heliyatra/images/login-heli-1.webp"
export default data
