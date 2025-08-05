import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { Menu, Sailboat } from "lucide-react"

import "./NavbarAuthLinks.scss"
import { useWindowSize } from "usehooks-ts"

import { NavItem } from "@/types/nav"
import { Images } from "@/config/images"
import {  siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "../icons"
import { buildPermissionNavLinks, getNavLinks, profileLink } from "../page/AuthForm/utils"
import { Image } from "../ui/image"
import Loader from "../ui/loader"

const LanguageSelect = dynamic(() => import("./language-select"))

interface MainNavProps {
  items?: NavItem[]
  authLink?: React.ReactNode
}

const NavWithIcon = ({ icon, label }: { icon: string; label: string }) => {
  const Icon = Icons[icon] || Icons.home
  return (
    <span className="flex items-center gap-2">
      <Icon size={22} /> <p className="whitespace-nowrap text-lg md:text-xl">{label}</p>
    </span>
  )
}

export function MainNav({ items, authLink }: MainNavProps) {
  const { width } = useWindowSize()
  const { userInfo, isUserLoading, isLoggedIn } = useUser()
  const permissions = userInfo?.permissions
  const [visibleLinks, setVisibleLinks] = useState([])
  const [dropdownLinks, setDropdownLinks] = useState([])

  const DesktopLanguageSelect = () => (width > 768 ? <LanguageSelect /> : null)
  const MobileLanguageSelect = () => (width <= 768 ? <LanguageSelect /> : null)

  const calculateVisibleItems = (items, width, maxWidthPerItem, containerPadding = 810) => {
    const containerWidth = width - containerPadding
    let usedWidth = 0
    const visibleItems = []
    const dropdownItems = []

    items.forEach((item, i) => {
      if (width <= 1285) {
        if (usedWidth + maxWidthPerItem <= containerWidth) {
          visibleItems.push(item)
          usedWidth += maxWidthPerItem
        } else {
          dropdownItems.push(item)
        }
      } else {
        if (i < 5) {
          visibleItems.push(item)
          usedWidth += maxWidthPerItem
        } else {
          dropdownItems.push(item)
        }
      }
    })

    return { visibleItems, dropdownItems }
  }

  const navLinks = useMemo(() => {
    return getNavLinks(isLoggedIn ? userInfo.role : "NO_USER")
  }, [isLoggedIn, userInfo, items])

  const permissionNavLinks = useMemo(() => {
    let persmissionNavLinks
    if (permissions) {
      persmissionNavLinks = permissions.filter((el) => !!buildPermissionNavLinks[el]).map((el) => buildPermissionNavLinks[el])
      return persmissionNavLinks
    }
    return []
  }, [permissions])

  // console.log("items",items, navLinks);

  useEffect(() => {
    const maxWidthPerItem = 90
    const { visibleItems, dropdownItems } = calculateVisibleItems(
      [...items, ...navLinks, ...permissionNavLinks, ...(isLoggedIn ? profileLink : [])],
      width,
      maxWidthPerItem
    )
    setVisibleLinks(visibleItems)
    setDropdownLinks(dropdownItems)
  }, [navLinks, width])

  if (isUserLoading) {
    return (
      <span className="flex items-center px-2 py-1.5 md:p-0">
        <Loader size={22} />
        <p className="ml-1 text-xl font-medium">Loading...</p>
      </span>
    )
  }

  return (
    <div className="flex w-full md:place-content-between md:gap-6">
      <Link href="/" className="hidden shrink-0 items-center space-x-0 md:flex">
        <span className="mr-4 flex items-center space-x-5 border-r-2 px-4">
          <Image src={Images.ukLogo(36)} alt="Uttarakhand Govt" className="size-[36px]" height={36} width={36} />
          <Image src={Images.ucada(80)} alt="UCADA" className="size-[40px]" height={40} width={40} />
        </span>
        <span className="flex h-[36px] space-x-2 leading-[36px]">
          <Image src={Images.irctc(36)} alt="IRCTC" className="w-[110px]" height={36} width={110} />
          <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
        </span>
      </Link>
      <div className="flex w-full place-content-end">
        <div className="hidden items-center gap-3 md:flex">
          <DesktopLanguageSelect />
          <Link
            href={"/web-check-in"}
            className={cn(
              "flex items-center text-xl font-semibold text-slate-600 hover:text-slate-900 sm:text-sm"
              // item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <Sailboat />
            <p className="ml-2 text-nowrap text-base md:text-lg">Web Check-in</p>
          </Link>

          {visibleLinks.length > 0 && (
            <nav className="hidden gap-4 md:flex md:items-center">
              {visibleLinks.map((item, index) => {
                const isProfile = item.href === "/app/profile"
                const Icon = Icons[item.icon]
                return item.href ? (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-xl font-semibold text-slate-600 hover:text-slate-900 sm:text-sm",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <Icon size={isProfile ? 18 : 22} />
                    {!isProfile && <p className="ml-2 text-nowrap text-lg md:text-xl">{item.title ?? item.label}</p>}
                  </Link>
                ) : null
              })}
            </nav>
          )}
        </div>
        {dropdownLinks.length > 0 && (
          <DropdownMenu>
            <div className="flex w-full place-content-between px-0 text-base hover:bg-transparent md:hidden">
              <Link href="/" className="flex items-start space-x-0">
                <span className="mr-[8px] flex h-[40px] w-[48px] items-center border-r-2 pr-[8px]">
                  <Image src={Images.ucada(80)} alt="UCADA" className="" height={40} width={40} />
                </span>
                <span className="flex h-[36px] space-x-2 leading-[36px]">
                  <Image src={Images.irctc(36)} alt="IRCTC" height={36} width={110} />
                  <span className="font-bold sm:inline-block">{siteConfig.name}</span>
                </span>
              </Link>
            </div>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" aria-label="Menu" className="focus:ring-0 focus:ring-offset-0 focus:ring-offset-transparent">
                <span className="rounded border border-slate-600 p-1">
                  <Menu />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={24} className="w-[200px] overflow-scroll">
              <DropdownMenuItem>
                <Link href="/" className="flex items-center">
                  <NavWithIcon icon="home" label="Home" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {dropdownLinks.map(
                (link) =>
                  link.href && (
                    <React.Fragment key={link}>
                      <DropdownMenuItem asChild>
                        <Link href={link.href}> {link.icon ? <NavWithIcon icon={link.icon} label={link.label ?? link.title} /> : link.title}</Link>
                      </DropdownMenuItem>
                      {link < dropdownLinks.length - 1 && <DropdownMenuSeparator />}
                    </React.Fragment>
                  )
              )}
              {authLink && <DropdownMenuItem asChild>{authLink}</DropdownMenuItem>}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <MobileLanguageSelect />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}
