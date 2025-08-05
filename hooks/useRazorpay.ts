import { retryRazorpay } from "@/constant"

import { isNewTabSupported } from "@/lib/browser"
import { Response, useRequest } from "./useRequest"
import { useUser } from "./useUser"

declare global {
  interface Window {
    Razorpay: any
  }
}

const useRazorpay = (page = "cart") => {
  const { post } = useRequest()
  const { userInfo } = useUser()
  const retryPayment = page !== "cart" && retryRazorpay
  let isPaymentFailed = false

  const handlePaymentCallback = (
    bookingId: string,
    response: any,
    successCb?: () => any,
    failureCb?: (retry?: boolean, errorCode?: string) => any
  ) => {
    if (response.razorpay_payment_id) {
      post({ url: `v1/payment/razorpay/fetch/${bookingId}`, data: { paymentId: response.razorpay_payment_id } })
        .then((res: any) => {
          console.log("res razorpay", res)
          return res.success ? successCb?.() : failureCb?.(retryPayment, res?.error?.code || null)
        })
        .catch(() => failureCb?.(retryPayment))
    } else {
      failureCb?.(retryPayment)
    }
  }

  const displayRazorpay = async (bookingId: string, successCb?: () => any, failureCb?: (retry?: boolean, errorCode?: string) => any) => {
    const {
      success,
      response: { data },
      errorCode,
    } = await post({ url: "v1/payment/razorpay/init", data: { bookingId } })

    if (success && data?.razorpayPaymentId && data?.razorpayStatus === "success") {
      successCb?.()
      return
    }

    if (!success || !data || !data.razorpayOrderId) {
      failureCb?.(true, errorCode)
      return
    }

    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      image: "https://carbon-static.ipsator.com/static/assets/icons/android-chrome-192x192.png",
      name: "IRCTC",
      description: "HeliYatra order",
      currency: "INR",
      amount: data.amount,
      order_id: data.razorpayOrderId,
      prefill: {
        // name: userInfo?.name || "",
        // email: userInfo?.email || "",
        // contact: userInfo?.mobileNumber || "",
      },
      notes: {
        merchant_order_id: bookingId,
        amount: data.amount / 100,
      },
      theme: {
        color: "#235daf",
      },

      handler: (response: any) => handlePaymentCallback(bookingId, response, successCb, failureCb),
    }

    if (!isNewTabSupported()) {
      options.callback_url = `${window.location.protocol}//${window.location.host}/app/booking/${bookingId}`
      options.redirect = true
    } else {
      options.modal = {
        ondismiss: () => {
          failureCb?.(retryPayment, isPaymentFailed === true ? "paymentFailure" : null)
        },
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment.failed", function (response) {
      isPaymentFailed = true
    })
  }

  return {
    displayRazorpay,
  }
}

export default useRazorpay
