import { useLiveData } from "../hooks"
import { useEffect, useState } from "react"
import { ChartIGaveMyHeartAndSoulFor } from "./ChartIGaveMyHeartAndSoulFor"
import { useGetProviderColorDictionaryFromAppStore } from "../../../hooks/ColorHooks"
import { ConditionalRender } from "../../../Types"

export function createPointArray(x, d) {
  if (d[x]?.length === 0) return undefined
  if (d[x][0]?.data?.length === 0) return undefined
  return {
    provider: x,
    values: d[x].map((h) => h.data[0]),
  }
}

export function createYZCPoint(o, colorDictionary) {
  return {
    yData: o.values,
    z: o.provider,
    c: colorDictionary[o.provider],
  }
}

export function convert(point) {
  return {
    date: point.date,
    value: point.value
  }
}
export function transform(yzcPoint) {
  return yzcPoint.yData.map(convert)
}

export function StreamgraphAnimation({ data }) {
  const liveData = useLiveData()
  const colorDictionary = useGetProviderColorDictionaryFromAppStore()
  const getProcessedData = () =>
    [...Array.from(Object.keys(data))]
      .map((key) => createPointArray(key, data))
      .filter((x) => x !== undefined)
      .filter((x) => !x.values.some((q) => q === undefined))
      .map((o) => transform(createYZCPoint(o, colorDictionary)))

  const [processed, setProcessed] = useState()
  useEffect(() => {
    if (colorDictionary && liveData) {
      setProcessed(getProcessedData())
    }
  }, [colorDictionary, liveData])
  return (
    <>
      {ConditionalRender(
        <ChartIGaveMyHeartAndSoulFor
          data={processed}
          dimensions={{
            width: 600,
            height: 300,
            margin: {
              top: 30,
              right: 30,
              bottom: 30,
              left: 60,
            },
          }}
        />,
        liveData !== undefined && colorDictionary !== undefined,
      )}
    </>
  )
}
