"use client"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-lg">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex w-full items-center justify-between">
          <MainNav items={siteConfig.mainNav} />
        </div>
      </div>
    </header>
  )
}
