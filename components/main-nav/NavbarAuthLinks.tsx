"use client"

import Link from "next/link"
import { useUser } from "@/hooks/useUser"

import "./NavbarAuthLinks.scss"
import { useMemo } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "../icons"
import { buildPermissionNavLinks, getNavLinks } from "../page/AuthForm/utils"
import Loader from "../ui/loader"

const NavbarAuthLinks = () => {
  const { userInfo, isUserLoading, isLoggedIn } = useUser()
  const permissions = userInfo?.permissions
  const navLinks = useMemo(() => {
    return getNavLinks(isLoggedIn ? userInfo.role : "NO_USER")
  }, [isLoggedIn, userInfo])
  const ProfileIcon = Icons["circleUser"]

  const permissionNavLinks = useMemo(() => {
    let persmissionNavLinks
    if (permissions) {
      persmissionNavLinks = permissions.filter((el) => !!buildPermissionNavLinks[el]).map((el) => buildPermissionNavLinks[el])
      return persmissionNavLinks
    }
    return []
  }, [permissions])

  if (isUserLoading)
    return (
      <span className="flex items-center px-2 py-1.5 md:p-0">
        <Loader size={22} />
        <p className="ml-1 text-xl font-medium">Loading...</p>
      </span>
    )
  return (
    <span className="group flex cursor-pointer flex-col items-center gap-4 px-2 py-1.5 font-semibold text-slate-600 hover:text-slate-900 md:flex-row md:gap-2 md:p-0">
      {navLinks.map((link, i) => {
        const isProfile = link.href === "/app/profile"
        const Icon = Icons[link.icon]
        return (
          <Link className="contents" href={link.href} key={link.href}>
            <span className={cn("group flex w-full items-center justify-start md:justify-center", { "md:ml-4": i !== 0 })}>
              <Icon size={isProfile ? 18 : 22} />
              <p className={cn("ml-2 text-nowrap text-lg md:text-xl", isProfile && "md:hidden")}>{link.label}</p>
            </span>
          </Link>
        )
      })}
      {permissionNavLinks.map((link, i) => {
        const Icon = Icons[link.icon]
        return (
          <Link className="contents" href={link.href} key={link.href}>
            <span className={cn("group flex w-full items-center justify-start md:justify-center", { "md:ml-4": i !== 0 })}>
              <Icon size={22} />
              <p className={cn("ml-2 text-nowrap text-lg md:text-xl")}>{link.label}</p>
            </span>
          </Link>
        )
      })}
      <Link className="contents" href={"/app/profile"} key={"/app/profile"}>
        <span className={cn("group flex w-full items-center justify-start md:ml-4 md:justify-center")}>
          <ProfileIcon size={18} />
          <p className={cn("ml-2 text-nowrap text-lg md:hidden md:text-xl")}>{"Profile"}</p>
        </span>
      </Link>
    </span>
  )
}

export default NavbarAuthLinks
