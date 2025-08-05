import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "./site-footer"
import '../styles/globals.css'

interface LayoutProps {             
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
