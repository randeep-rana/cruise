"use client"

import { compress, decompress } from "lz-string"

const k = (key: string) => `heliyatra.${key}`

const getStorage = (storageClass: Storage | null) => ({
  get: (key: string) => {
    if (storageClass) {
      let valueInStorage = storageClass.getItem(k(key))
      if (!valueInStorage || valueInStorage === "undefined") {
        return null
      }
      const item = JSON.parse(valueInStorage) // const item = JSON.parse(decompress(valueInStorage))
      if (Date.now() > item.expiry) {
        storageClass.removeItem(k(key))
        return null
      }
      return item.value
    } else {
      return null
    }
  },
  set: (key: string, value: any, ttl = 86400) => {
    const item = {
      value,
      ttl,
      expiry: Date.now() + ttl * 1000,
    }
    if (storageClass) {
      storageClass.setItem(k(key), JSON.stringify(item)) // storageClass.setItem(k(key), compress(JSON.stringify(item)))
    }
  },
  del: (key: string) => {
    if (storageClass) {
      storageClass.removeItem(k(key))
    }
  },
  clearAll: () => {
    if (storageClass) {
      storageClass.clear()
    }
  },
})

export const useStorage = () => {
  const Storage = getStorage(typeof window !== "undefined" ? window.sessionStorage : null)
  const PersistantStorage = getStorage(typeof window !== "undefined" ? window.localStorage : null)

  return { Storage, PersistantStorage }
}
