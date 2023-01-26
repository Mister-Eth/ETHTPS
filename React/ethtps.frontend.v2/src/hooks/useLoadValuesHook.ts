import React from "react"
import { useState } from "react"

export function useLoadValuesHook<T>(
  loadFunction: () => Promise<T> | undefined,
  setValueFunction: (value?: T) => void,
) {
  const [completed, setCompleted] = useState(false)
  React.useEffect(() => {
    loadFunction()
      ?.then((value) => {
        setValueFunction(value)
        setCompleted(true)
      })
      .catch((reason) => {
        console.log("Error: " + reason)
        setCompleted(true)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return completed
}
