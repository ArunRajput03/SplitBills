import { useEffect, useState } from "react"

const useLocalStorage = (key, initalData) => {
  const [value, setValue] = useState(() => {
    const locData = localStorage.getItem(key)
    if (locData === null) {
      return initalData
    }

    return JSON.parse(locData)
  })

  console.log("LocalStorage Hook Render")

  useEffect(() => {
    console.log("LocalStorage Hook UseEffect Render")
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  return [value, setValue]
}
export default useLocalStorage
