"use client"

import { createContext } from "react"

export type RootContextType = {
  env: string
  isProd: boolean
}

export const RootContext = createContext({} as RootContextType)

export const RootContextProvider = ({ value, children }: { value: RootContextType; children: React.ReactNode }) => {
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>
}

export const AppContext: React.FC<{ value: RootContextType; children: React.ReactNode }> = ({ value, children }) => {
  return (
    <>
      <RootContextProvider value={value}>{children}</RootContextProvider>
    </>
  )
}

export default AppContext
