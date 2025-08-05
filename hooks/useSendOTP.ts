import { useMutation } from "@tanstack/react-query"

import { useRequest } from "./useRequest"

const useSendOTP = () => {
  const { post } = useRequest()

  return {
    sendOTP: (data: { mobileNumber: string; otpType: string; bookingId?: string }) => post({ url: `v1/auth/user-otp`, data, withToken: true }),
  }

  // return useMutation((data: { mobileNumber: string; otpType: string }) =>
  //   post({ url: `v1/auth/user-otp`, data, withToken: data.otpType === "LOGIN" })
  // )
}

export default useSendOTP
