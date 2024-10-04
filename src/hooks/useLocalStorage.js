import { useEffect, useState } from "react"

export const useLocalStorage = (key, initalData) => {
  const [value, setValue] = useState(() => {
    const locData = localStorage.getItem(key)
    if (locData === null) {
      return initalData
    }

    return JSON.parse(locData)
  })

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  return [value, setValue]
}
