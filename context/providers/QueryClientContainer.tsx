"use client"

import { useState } from "react"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import { DefaultOptions, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"

// import { compress, decompress } from "lz-string"

export interface QueryClientContainerProps {
  cacheTimeInMins?: number
  children: React.ReactNode
  defaultOptions?: DefaultOptions
}

export const QueryClientContainer: React.FC<QueryClientContainerProps> = ({ cacheTimeInMins, children, defaultOptions = {} }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * (cacheTimeInMins || 1),
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: 1000 * 60 * (cacheTimeInMins || 1),
          },
          ...defaultOptions,
        },
      })
  )

  // if (typeof window !== "undefined") {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const [persister] = useState(() => createSyncStoragePersister({ storage: window?.localStorage }))
  //   return (
  //     <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
  //       {children}
  //     </PersistQueryClientProvider>
  //   )
  // }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
