import { useLiveData } from "../hooks"
import { useState } from "react"
import { ChartIGaveMyHeartAndSoulFor } from "./ChartIGaveMyHeartAndSoulFor"
import { useGetProviderColorDictionaryFromAppStore } from "../../../hooks/ColorHooks"
import { ConditionalRender } from "../../../Types"

function createPoint(x, d) {
  if (d[x]?.length === 0) return undefined
  if (d[x][0]?.data?.length === 0) return undefined
  return {
    provider: x,
    value: d[x][0].data[0],
  }
}

function createXYZCPoint(o, colorDictionary) {
  return {
    x: new Date(o.value.date).getSeconds() - 60,
    y: o.value.value,
    z: o.provider,
    c: colorDictionary[o.provider],
  }
}

export function StreamgraphAnimation({ data }) {
  console.clear()
  const liveData = useLiveData()
  const colorDictionary = useGetProviderColorDictionaryFromAppStore()
  const [processed, setProcessed] = useState(
    Array.from(
      [...Array.from(Object.keys(data))]
        .map((key) => createPoint(key, data))
        .filter((x) => x !== undefined)
        .filter((x) => x.value.value !== NaN)
        .map((o) => createXYZCPoint(o, colorDictionary)),
    ),
  )
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
