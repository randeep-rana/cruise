import bowser from "bowser"
import isWebview from "is-ua-webview"

import { BrowserInfo } from "@/types/browser"


const isAmazonApp = (userAgent: string) => userAgent.includes("amazon")
export const getBrowserInfoFromUA = (userAgent: string | undefined | null) => {
  let browserInfo: BrowserInfo = {
    isMobile: true,
    isIosMobile: false,
  }

  if (!userAgent) {
    return browserInfo
  }

  if (isAmazonApp(userAgent)) {
    return browserInfo
  }

  try {
    const result = bowser.parse(userAgent)
    // console.log(result);
    const isMobile = result?.platform?.type === "mobile" || false
    const isBrowserWebview = isWebview(userAgent)
    const isIosMobile = result?.os?.name?.toLowerCase() === "ios" && result?.platform?.model?.toLowerCase() === "iphone"
    browserInfo = {
      browser: result?.browser?.name,
      os: result?.os?.name,
      platform: result?.platform?.type,
      engine: result?.engine?.name,
      isMobile,
      isWebview: isBrowserWebview,
      isIosMobile,
    }
  } catch {}

  return browserInfo
}

export const isNewTabSupported = () => {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent.toLowerCase(),
      safari = /safari/.test(userAgent),
      ios = /iphone|ipod|ipad/.test(userAgent),
      androidWebview = /\swv\).+(chrome)\/([\w\.]+)/i.test(userAgent),
      ucBrowser = /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i.test(userAgent)
    const iosWebview = ios && !safari

    return !androidWebview && !iosWebview && !ucBrowser
  }
  return false
}
