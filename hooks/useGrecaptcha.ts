"use client"

import { GACAPTCHA_TOKEN } from "@/constant"

declare global {
  interface Window {
    grecaptcha: any
  }
}

const waitGrecaptcha = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    let retryCounter = 0
    const maxRetries = 15

    const checkGrecaptcha = () => {
      if (window.grecaptcha) {
        resolve()
      } else if (retryCounter < maxRetries) {
        setTimeout(checkGrecaptcha, 1000)
        retryCounter++
      } else {
        reject(new Error("Failed to load grecaptcha after 15 attempts"))
      }
    }

    checkGrecaptcha()
  })
}

export const useGrecaptcha = () => {
  const getToken = async (action = "login"): Promise<string> => {
    try {
      await waitGrecaptcha()
      const token = await window.grecaptcha?.execute?.(GACAPTCHA_TOKEN, { action })
      return token || ""
    } catch (error) {
      return ""
    }
  }

  return getToken
}
