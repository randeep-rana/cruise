"use client"

import { usePathname, useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { APP_NAME } from "@/constant"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

import { URLS } from "@/config/Urls"
import { toast } from "react-hot-toast"
import { useGrecaptcha } from "@/hooks/useGrecaptcha"
import { useStorage } from "@/hooks/useStorage"

type AxiosOptions = {
  withToken?: boolean
} & AxiosRequestConfig

type APIResponse<T = any> = {
  error?: {
    code?: string
    errors?: any
    title?: string
  }
  data?: T
  status?: string
}

export type Response<T = any> = {
  success: boolean
  response?: APIResponse<T>
  message?: string
  errorCode?: string
}

const baseUrl = "/api"
var _0xabc8 = [
  "\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A",
]
const range = _0xabc8[0]

const convertBase = (value, fromBase, toBase): number | string => {
  const baseRange = range.split("")
  const fromRange = baseRange.slice(0, fromBase)
  const toRange = baseRange.slice(0, toBase)

  let fromValue = value
    .split("")
    .reverse()
    .reduce((carry, digit, index) => {
      if (fromRange.indexOf(digit) === -1) throw new Error("Invalid digit `" + digit + "` for base " + fromBase + ".")
      return (carry += fromRange.indexOf(digit) * Math.pow(fromBase, index))
    }, 0)

  let toValue = ""
  while (fromValue > 0) {
    toValue = toRange[fromValue % toBase] + toValue
    fromValue = (fromValue - (fromValue % toBase)) / toBase
  }
  return toValue || "0"
}

const getDecryptedDataResp = (data) => {
  if (data === null) return null

  const dp = data[0]
  const dencryptData = (data) => {
    if (typeof atob !== "undefined") {
      return atob(data)
    }
    return Buffer.from(data, "base64").toString("binary")
  }

  const pos10 = +convertBase(dp, 62, 10) - 25
  const decRes = dencryptData([data.slice(1, pos10 + 1), data.slice(pos10 * 2 + 1)].join(""))

  const dataPos = decRes.indexOf("{")
  const decId = decRes.slice(0, dataPos)
  const decResp = JSON.parse(decRes.slice(dataPos))

  return decResp
}

const Request = async (options: AxiosRequestConfig, token?: string) => {
  if (token) {
    options.params = {
      ...options.params,
      token,
    }
  }

  const res = await axios({
    baseURL: baseUrl,
    ...options,
  })
  return res
}

const openApis = [URLS.SIGNUP, URLS.VERIFY_OTP, URLS.LOGIN]

const useAxiosRequest = () => {
  const queryClient = useQueryClient()
  const getToken = useGrecaptcha()
  const pathname = usePathname()
  const router = useRouter()
  const { PersistantStorage, Storage } = useStorage()
  const request = async <T>(options: AxiosOptions = {}) => {
    // toast.dismiss()
    const toastId = toast.loading("Loading...")
    const { withToken, ...axiosOptions } = options

    const customHeaders: any = { ...axiosOptions.headers }
    customHeaders["app-name"] = APP_NAME

    try {
      const { data: response, status } = await Request({ ...axiosOptions, headers: customHeaders }, withToken ? await getToken() : undefined)
      toast.remove(toastId)

      const dataResponse = response.isEncrypted ? getDecryptedDataResp(response.data) : response.data
      return { response: { ...response, data: dataResponse }, success: status === 200 } as Response<T>
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response) {
          const { data, status } = error.response as AxiosResponse<APIResponse, any>
          if (status === 401 && !openApis.includes(axiosOptions.url) && pathname?.startsWith("/app")) {
            PersistantStorage.del("userInfo")
            Storage.clearAll()
            toast.remove(toastId)
            // queryClient.invalidateQueries()
            router.replace("/auth")
          }
          if (data?.error) {
            if (axiosOptions.url === URLS.LOGIN) {
              toast.error("Incorrect Mobile and Password entered.", { id: toastId })
            } else {
              toast.error(data?.error?.errors?.join?.(". ")?.replace(/\.{2,}/g, ".") || data?.error.title || "Unexpected Error occured.", {
                id: toastId,
              })
            }
          }
          return { success: false, message: data?.error.title, errorCode: data?.error?.code, response: {} } as Response<T>
        }
      }

      toast.error("Unexpected Error occured.", { id: toastId })
      return { success: false, message: "Unexpected Error occured." } as Response<T>
    }
  }

  return request
}

export const useRequest = () => {
  const request = useAxiosRequest()
  const get = async <T = any>(options: AxiosOptions = {}) => {
    const res = await request<T>({
      ...options,
      method: "GET",
    })
    return res
  }

  const post = async <T = any>(options: AxiosOptions = {}) => {
    const res = await request<T>({
      ...options,
      method: "POST",
    })
    return res
  }

  const deleteRequest = async <T = any>(options: AxiosOptions = {}) => {
    const res = await request<T>({
      ...options,
      method: "DELETE",
    })
    return res
  }

  const put = async <T = any>(options: AxiosOptions = {}) => {
    const res = await request<T>({
      ...options,
      method: "PUT",
    })
    return res
  }
  return { get, post, deleteRequest, put }
}
