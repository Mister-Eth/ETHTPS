import { useState, useEffect } from "react"
import { useQuery } from "react-query"

export function useLoadValuesHook<T>(
  dataName: string,
  loadFunction: () => Promise<T> | undefined,
  setValueFunction: (value?: T) => void,
  cacheTime: number | undefined = undefined,
  refetchInterval: number | undefined = undefined,
) {
  const [completed, setCompleted] = useState(false)
  const { data, status } = useQuery(dataName, loadFunction, {
    cacheTime: cacheTime,
    refetchInterval: refetchInterval,
  })
  useEffect(() => {
    if (status === "success") {
      setCompleted(true)
      setValueFunction(data)
    }
  }, [data, status])
  return completed
}
