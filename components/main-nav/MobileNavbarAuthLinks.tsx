"use client"

import Link from "next/link"
import { useUser } from "@/hooks/useUser"
import { LogIn, User } from "lucide-react"

import "./NavbarAuthLinks.scss"
import Loader from "../ui/loader"

const MobileNavbarAuthLinks = () => {
  const { userInfo, isUserLoading } = useUser()
  if (isUserLoading)
    return (
      <span className="flex items-center md:hidden">
        <Loader size={48} />
      </span>
    )
  return (
    <span className="flex cursor-pointer items-center md:hidden ">
      {userInfo ? (
        <Link className="contents" href={"/app/profile/accounts"}>
          <User width="22px" height="22px" />
          <p className="ml-1 text-xl font-medium">{userInfo.name.split(" ")[0]}</p>
        </Link>
      ) : (
        <Link className="contents" href={"/auth"}>
          <LogIn width="22px" height="22px" />
          <p className="ml-1 text-xl font-medium">Login</p>
        </Link>
      )}
    </span>
  )
}

export default MobileNavbarAuthLinks
