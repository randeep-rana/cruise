import { useEffect, useState } from "react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { detectIncognito } from "detectincognitojs"

import { useStorage } from "./useStorage"

const detectFingerprint = async () => {
  const fp = await FingerprintJS.load({
    monitoring: false,
    debug: false,
  })
  return fp.get()
}

export const useBrowser = () => {
  const { PersistantStorage } = useStorage()
  const [isIncognito, setIsIncognito] = useState<boolean | null>(null)
  const [fingerprint, setFingerprint] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      detectIncognito().then((result) => setIsIncognito(result.isPrivate)),
      new Promise((resolve) => {
        const fingerprintFromStorage = PersistantStorage.get("fingerprint")
        if (fingerprintFromStorage) {
          setFingerprint(fingerprintFromStorage)
          resolve(fingerprintFromStorage)
        } else {
          detectFingerprint().then((result) => {
            const fingerprint = result.visitorId
            PersistantStorage.set("fingerprint", fingerprint)
            setFingerprint(fingerprint)
            resolve(fingerprint)
          })
        }
      }),
    ])
  }, [])

  const isBrowserLoading = isIncognito === null || fingerprint === null

  return {
    isBrowserLoading,
    isIncognito,
    fingerprint,
  }
}
