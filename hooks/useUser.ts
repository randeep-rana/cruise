/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useReducer } from "react"

import { URLS } from "@/config/Urls"
import { useRequest } from "./useRequest"
import { useStorage } from "./useStorage"

const SESSION_STORAGE_KEY = "userInfo"

type User = {
  mobileNumber: string
  name: string
  email: string
  role: string
  state: string
  permissions: string[]
  operatorName: string
  location: string
  destinationId: string | number
}

type UserState = {
  isUserLoading: boolean
  isLoggedIn: boolean
  userInfo: User | null
}

type UserAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: User }
  | { type: "SET_LOGGED_IN" }
  | { type: "SET_LOGGED_OUT" }

const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isUserLoading: action.payload }
    case "SET_USER":
      return { ...state, isUserLoading: false, isLoggedIn: true, userInfo: action.payload }
    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: true }
    case "SET_LOGGED_OUT":
      return { ...state, isUserLoading: false, isLoggedIn: false, userInfo: null }
    default:
      return state
  }
}

export const useUser = () => {
  const { PersistantStorage, Storage } = useStorage()
  const { get, post } = useRequest()

  const initialState: UserState = {
    isUserLoading: true,
    isLoggedIn: false,
    userInfo: null,
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const handleLogout = () => {
    dispatch({ type: "SET_LOGGED_OUT" })
    Storage.del("bookingCart")
    PersistantStorage.del(SESSION_STORAGE_KEY)
  }

  const fetchUserAsync = async () => {
    const { success, response, message } = await get({ url: URLS.USER })
    if (success) {
      dispatch({ type: "SET_USER", payload: response.data })
      PersistantStorage.set(SESSION_STORAGE_KEY, response.data)
      return response?.data
    } else {
      console.error(message)
      handleLogout()
    }
  }

  const handleApiResponse = async (success: boolean, data: any, message: string, url: string) => {
    if (success) {
      if (url === URLS.LOGIN || url === URLS.VERIFY_OTP || url === URLS.LOGIN_WITH_OTP) {
        let response = await fetchUserAsync()
        return response
      }
    } else {
      console.error(message)
      handleLogout()
    }
  }

  useEffect(() => {
    const userInfo = PersistantStorage.get(SESSION_STORAGE_KEY)
    if (userInfo) {
      dispatch({ type: "SET_USER", payload: userInfo })
    } else {
      dispatch({ type: "SET_LOGGED_OUT" })
    }
  }, [])

  // useEffect(() => {
  //   console.log("useUser", state)
  // }, [state])

  const performApiCall = async (apiCall: () => Promise<any>, url: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    const { success, response, message } = await apiCall()
    let data = await handleApiResponse(success, response?.data, message, url)
    dispatch({ type: "SET_LOADING", payload: false })
    return { success, data: response?.data, message, responseData: data }
  }

  return {
    ...state,
    Login: (data: any) => performApiCall(() => post({ withToken: true, url: URLS.LOGIN, data }), URLS.LOGIN),
    SignUp: (data: any) => performApiCall(() => post({ withToken: true, url: URLS.SIGNUP, data }), URLS.SIGNUP),
    VerifyOTP: (data: any) => performApiCall(() => post({ withToken: true, url: URLS.VERIFY_OTP, data }), URLS.VERIFY_OTP),
    LoginWithOTP: (mobileNumber: string, otp: string) =>
      performApiCall(() => post({ withToken: true, url: URLS.LOGIN_WITH_OTP, data: { mobileNumber, otp, otpType: "LOGIN" } }), URLS.VERIFY_OTP),
    NewPassword: (password: string) => performApiCall(() => post({ url: URLS.NEW_PASSWORD, data: { password } }), URLS.NEW_PASSWORD),
    Logout: async () => {
      handleLogout()
      const { success, message } = await post({ url: URLS.LOGOUT })
      return { success, message }
    },
  }
}
