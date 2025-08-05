"use client"

import { useEffect } from "react"
import { Inter as FontSans } from "next/font/google"

import { Analytics, initFirebase } from "@/lib/firebase"
import AppContext, { RootContextType } from "../root-context"
import { QueryClientContainer } from "./QueryClientContainer"

// import { ThemeProvider } from "next-themes"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

type ProvidersProps = {
  children: React.ReactNode
  appContext?: RootContextType
}

export function Providers({ children, appContext }: ProvidersProps) {
  useEffect(() => {
    initFirebase()
    Analytics.logEvent("page_view")
  }, [])
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
          }
        `}
      </style>
      <AppContext value={appContext}>
        <QueryClientContainer>{children}</QueryClientContainer>
      </AppContext>
    </>
  )
}
