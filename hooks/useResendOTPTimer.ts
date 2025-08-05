import { useEffect, useState } from "react"

import { getCurrentIstDate } from "@/lib/utils"

export default function useResendOTPTimer({ minutes = 3, seconds = 0 }: { minutes?: number; seconds?: number } = {}) {
  const totalCutOffSeconds = minutes * 60 + seconds
  const cutOffTime = getCurrentIstDate().getTime() + totalCutOffSeconds * 1000
  const initialTimerState = { minutes: Math.max(0, minutes), seconds: Math.max(0, seconds) }

  const [timer, setTimer] = useState(initialTimerState)
  const [timerOff, setTimerOff] = useState(false)
  const [endTime, setEndTime] = useState(cutOffTime)

  useEffect(() => {
    let totalSeconds = minutes * 60 + seconds

    if (totalSeconds <= 0) {
      setTimer({ minutes: 0, seconds: 0 })
      setEndTime(0)
      setTimerOff(true)
      return
    }

    const intervalId = setInterval(() => {
      const differenceInSeconds = (endTime - getCurrentIstDate().getTime()) / 1000
      totalSeconds = Math.ceil(differenceInSeconds)

      setTimer({
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
      })

      if (totalSeconds <= 0) {
        setTimerOff(true)
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [minutes, seconds, timerOff])

  const resetTimer = () => {
    setTimer(initialTimerState)
    setTimerOff(false)
    setEndTime(getCurrentIstDate().getTime() + totalCutOffSeconds * 1000)
  }

  return { otpTimer: timer, otpTimerOff: timerOff, resetTimer }
}
