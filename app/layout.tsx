import { getConfigFromEnv, metaConfig } from "@/config/site"
import { Providers } from "@/context/providers"
import { RootContextType } from "@/context/root-context"
import { Layout } from "@/components/layout"
import "../styles/globals.css"
import { Toaster } from "@/components/ui/sonner"

// Static metadata
export const metadata = metaConfig

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const envConfig = getConfigFromEnv()

  const contextValue: RootContextType = {
    ...envConfig,
  }

  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        <Providers appContext={contextValue}>
          <Layout>{children}</Layout>
          <Toaster position="bottom-center" />
        </Providers>
      </body>
    </html>
  )
}
