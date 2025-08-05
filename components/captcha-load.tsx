"use client"

import { memo } from "react"
import Script from "next/script"
import { GACAPTCHA_TOKEN } from "@/constant"

declare global {
  interface Window {
    loadingGrecaptcha: boolean
    grecaptcha: any
  }
}

function CaptchaLoad() {
  const onLoad = () => {
    window.loadingGrecaptcha = true
    window.grecaptcha.ready(function () {
      console.log("captcha loaded")
      window.loadingGrecaptcha = false
    })
  }

  return (
    <>
      <Script
        id="captcha-lib"
        strategy="afterInteractive"
        src={`https://www.google.com/recaptcha/api.js?render=${GACAPTCHA_TOKEN}`}
        onLoad={onLoad}
      />
    </>
  )
}

export default memo(CaptchaLoad)
