"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useBrowser } from "@/hooks/useBrowser"
import { useUser } from "@/hooks/useUser"

import { getRedirectPath } from "@/components/page/AuthForm/utils"
import { Button } from "@/components/ui/button"
import { P } from "@/components/ui/typography"
import CheckIn from "./CheckInForm"

const AuthForm = () => {
  const searchParams = useSearchParams()
  const formToRender = searchParams?.get("form")
  const isClearStorage = searchParams?.get("clearStorage")
  const { isBrowserLoading, isIncognito } = useBrowser()
  const { isUserLoading, userInfo, Logout } = useUser()

  useEffect(() => {
    if (isClearStorage) {
      const logoutUser = async () => {
        await Logout()
      }

      logoutUser()
    }

    if (userInfo && !isClearStorage) {
      window.location.replace(getRedirectPath(userInfo.role))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, isClearStorage])

  if (isUserLoading || isBrowserLoading) return <div>Loading...</div>
  if (isIncognito) {
    return (
      <div>
        <P className="mb-8">Please disable incognito mode to continue.</P>
        <Link href="/">
          <Button>Go to home</Button>
        </Link>
      </div>
    )
  }

  if (userInfo)
    return (
      <div>
        <P className="mb-8">Already logged in, please wait while we redirect you or click on button below.</P>
        <Link href={getRedirectPath(userInfo.role)}>
          <Button>Open Booking</Button>
        </Link>
      </div>
    )

  if (!formToRender) return <CheckIn />
}

export default AuthForm
