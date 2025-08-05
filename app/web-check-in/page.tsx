import Link from "next/link"

import data, { defaultLoginImage, helicopterImage } from "./data"
import "@/styles/page.scss"
import Image from "next/image"

import CaptchaLoad from "@/components/captcha-load"
import PageWithBackground from "@/components/page-with-background"
import AuthForm from "@/components/page/CheckInAuthForm"
import TimingInfoTexts from "@/components/texts/TimingInfoTexts"
import { Card } from "@/components/ui/card"

export default async function WebCheckIn() {
  return (
    <PageWithBackground textDirection="left" className="" backgroundImgUrl={defaultLoginImage}>
      <div className="items-center md:flex md:h-[80vh] md:flex-row md:justify-between">
        <div className="page-text mt-0 md:mt-0 md:w-1/2  md:pt-0">
          <div className="w-[600px] max-w-full">
            <h1 className="page-text-header">{data.heading}</h1>
          </div>
        </div>

        <div className="relative top-20 flex place-content-center items-center pb-24 md:h-screen md:w-1/2 md:pb-0">
          <div className="w-full max-w-[500px]">
            <Card className="w-full">
              <AuthForm />
            </Card>
          </div>
        </div>
      </div>

      <CaptchaLoad />
    </PageWithBackground>
  )
}
