import { getType } from "@reduxjs/toolkit"
import React from "react"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"

export function useLoadValuesHook<T>(
  dataName: string,
  loadFunction: () => Promise<T> | undefined,
  setValueFunction: (value?: T) => void,
) {
  const [completed, setCompleted] = useState(false)
  const { data, status } = useQuery(dataName, loadFunction, {})
  useEffect(() => {
    if (status === "success") {
      setCompleted(true)
      setValueFunction(data)
    }
  }, [data, status])
  return completed
}
