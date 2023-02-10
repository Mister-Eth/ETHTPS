import { ResponsiveStream } from "@nivo/stream"
import { useLiveData } from "../hooks"
import { useEffect, useState } from "react"

function createDataset(arr) {
  let x = {}
  for (let i = 0; i < arr.length; i++) {
    let data = arr[i]
    x[data.providerName] = data.value
  }
  return x
}

export function NivoStreamgraph({ initialData }) {
  const liveData = useLiveData()
  const [providerNames, setProviderNames] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    if (liveData !== undefined) {
      let filtered = liveData.data.filter((x) => x !== undefined)
      setProviderNames(filtered.map((x) => x.providerName))
      setData(data.concat(createDataset(filtered)))
    }
  }, [liveData])
  if (
    liveData === undefined ||
    providerNames === null ||
    providerNames?.length === 0 ||
    data?.length === 0
  )
    return <></>
  return (
    <>
      <div style={{ height: "500px" }}>
        <ResponsiveStream
          data={data}
          keys={providerNames}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: -40,
          }}
          enableGridX={true}
          enableGridY={false}
          offsetType="silhouette"
          colors={{ scheme: "nivo" }}
          fillOpacity={0.85}
          borderColor={{ theme: "background" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#2c998f",
              size: 4,
              padding: 2,
              stagger: true,
            },
            {
              id: "squares",
              type: "patternSquares",
              background: "inherit",
              color: "#e4c912",
              size: 6,
              padding: 2,
              stagger: true,
            },
          ]}
          fill={[
            {
              match: {
                id: "Paul",
              },
              id: "dots",
            },
            {
              match: {
                id: "Marcel",
              },
              id: "squares",
            },
          ]}
          dotSize={8}
          dotColor={{ from: "color" }}
          dotBorderWidth={2}
          dotBorderColor={{
            from: "color",
            modifiers: [["darker", 0.7]],
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              translateX: 100,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: "#999999",
              symbolSize: 12,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  )
}
