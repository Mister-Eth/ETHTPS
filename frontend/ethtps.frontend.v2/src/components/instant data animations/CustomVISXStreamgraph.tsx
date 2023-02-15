import { Fragment, useEffect } from "react"
import { StreamGraphProps, range } from "./types"
import { VISXLegend } from "./VISXLegend"
import { WebsocketStatusPartial } from "../stats/WebsocketStatusPartial"
import { api } from "../../services/DependenciesIOC"
import { useState } from "react"
import { StreamchartModel } from "ethtps.api.client"
import { useQuery } from "react-query"
import { ConditionalSkeletonRender } from "../../Types"
import { useStreamchartData } from "./hooks"
import { scaleLinear, scaleOrdinal } from "@visx/scale"
import { transpose } from "d3-array"
import { useSpring, animated } from "@react-spring/web"
import { Stack } from "@visx/shape"
import { PatternCircles, PatternWaves } from "@visx/pattern"

//<VISXLegend keys={data?.legend?.keys} colors={data?.legend?.colors} />

const yScale = scaleLinear<number>({
  domain: [-300, 300],
})

type Datum = number[]
const getY0 = (d: Datum) => yScale(d[0]) ?? 0
const getY1 = (d: Datum) => yScale(-d[0]) ?? 0

export function CustomVISXStreamgraph({
  width,
  height,
  animate = true,
}: StreamGraphProps) {
  const { data, status } = useStreamchartData("OneDay")
  const [chartData, setChartData] = useState<StreamchartModel>()
  useEffect(() => {
    setChartData(data)
  }, [status])
  const keys = range(chartData?.tpsData?.length ?? 0)
  const xScale = scaleLinear<number>({
    domain: [0, 8],
  })
  xScale.range([0, width])
  yScale.range([height, 0])
  const colorScale = scaleOrdinal<number, string>({
    domain: keys,
    range: chartData?.legend?.colors ?? [],
  })
  const layers = transpose<number>(
    keys.map((key) => (chartData?.tpsData?.reverse() ?? [])[key]),
  )
  //console.log(layers)
  const patternScale = scaleOrdinal<number, string>({
    domain: keys,
    range: [
      "mustard",
      "cherry",
      "navy",
      "circles",
      "circles",
      "circles",
      "circles",
      "navy",
      "circles",
      "circles",
      "circles",
      "circles",
    ],
  })
  return (
    ConditionalSkeletonRender(
      <div>
        <WebsocketStatusPartial />
        <svg width={width} height={height}>
          <PatternCircles
            id="mustard"
            height={40}
            width={40}
            radius={5}
            fill="#036ecf"
            complement
          />
          <PatternWaves
            id="cherry"
            height={12}
            width={12}
            fill="transparent"
            stroke="#232493"
            strokeWidth={1}
          />
          <PatternCircles
            id="navy"
            height={60}
            width={60}
            radius={10}
            fill="white"
            complement
          />
          <PatternCircles
            complement
            id="circles"
            height={60}
            width={60}
            radius={10}
            fill="transparent"
          />
          <g>
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill={"#ffdede"}
              rx={20}
            />
            <Stack<number[], number>
              data={layers}
              keys={keys}
              offset="wiggle"
              color={colorScale}
              x={(_, i) => xScale(i) ?? 0}
              y0={getY0}
              y1={getY1}
            >
              {({ stacks, path }) =>
                stacks.map((stack) => {
                  // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
                  const pathString = path(stack) || ""
                  const tweened = /*animate ? useSpring({ pathString }):*/ {
                    pathString,
                  }
                  const color = colorScale(stack.key)
                  const pattern = patternScale(stack.key)
                  return (
                    <g key={`series-${stack.key}`}>
                      <animated.path d={tweened.pathString} fill={color} />
                      <animated.path
                        d={tweened.pathString}
                        fill={`url(#circles)`}
                      />
                    </g>
                  )
                })
              }
            </Stack>
          </g>
        </svg>
      </div>,
      data !== undefined,
    ) ?? <></>
  )
}
