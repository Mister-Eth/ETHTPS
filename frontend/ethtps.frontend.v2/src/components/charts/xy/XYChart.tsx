import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { StringTimeValue, toShortString, fromShortString } from "../../../Types"
import { api } from "../../../services/DependenciesIOC"
import { IntervalDropdown } from "../../dropdowns/IntervalDropdown"
import { DataModeButtonGroup } from "../../buttons/DataModeButtonGroup"
import moment from "moment"
import {
  DataType,
  StackedChartDataPoint,
  StackedChartSeries,
  TimeInterval,
} from "ethtps.api.client"
import { curveMonotoneX } from "@visx/curve"
import { useGetSidechainsIncludedFromAppStore } from "../../../hooks/LiveDataHooks"

const data1 = [
  { x: "2020-01-01", y: 50 },
  { x: "2020-01-02", y: 10 },
  { x: "2020-01-03", y: 20 },
]

const data2 = [
  { x: "2020-01-01", y: 30 },
  { x: "2020-01-02", y: 40 },
  { x: "2020-01-03", y: 80 },
]

const accessors = {
  xAccessor: (d: StackedChartDataPoint) =>
    moment(d.x).format("yyyy-mm-dd hh:mm"),
  yAccessor: (d: StackedChartDataPoint) => d.y,
}

interface Size {
  width: number
  height: number
}

export function CustomXYChart({ width, height }: Size) {
  const [interval, setInterval] = useState<TimeInterval>(TimeInterval.OneMonth)
  const [network, setNetwork] = useState("Mainnet")
  const [mode, setMode] = useState<DataType>(DataType.Tps)
  const includeSidechains = useGetSidechainsIncludedFromAppStore()

  const [d, setD] = useState<StringTimeValue[]>([])
  const [noData, setNoData] = useState(false)
  const [usesDatePicker, setUsesDatePicker] = useState(false)
  const [loading, setLoading] = useState(true)
  const intervalChanged = (i: string) => {
    let value = TimeInterval[i as keyof typeof TimeInterval]
    const usesDate = value === TimeInterval.Auto
    setUsesDatePicker(usesDate)
    if (!usesDate) setInterval(value)
  }
  const modeChanged = (mode: DataType) => {
    setMode(mode)
  }
  const networkChanged = (network: string) => {
    setNetwork(network)
  }

  const [chartData, setChartData] = useState<StackedChartSeries[]>()

  const { data, isSuccess, refetch } = useQuery(
    "get data",
    () =>
      api.getL2Data({
        dataType: mode,
      }),
    { refetchOnMount: false, refetchInterval: 60 * 1000 },
  )
  useEffect(() => {
    /*
    if (isSuccess) {
      if (data !== undefined) {
        if (data.series) {
          console.log(data.series)
          setChartData(data.series)
        }
        setNoData(false)
        setLoading(false)
      }
    }*/
  }, [data])

  useEffect(() => {
    if (!isSuccess) {
      setLoading(true)
      refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    setLoading(true)
    refetch()
  }, [interval, network, mode, includeSidechains])
  return (
    <>
      <DataModeButtonGroup modeChanged={modeChanged} />
      <IntervalDropdown onChanged={intervalChanged} />
      <XYChart
        width={width}
        height={height}
        xScale={{ type: "band" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={true} />
        {chartData?.map((series, i) => (
          <AnimatedLineSeries
            key={i}
            curve={curveMonotoneX}
            dataKey={`${series.provider}`}
            data={series.dataPoints ?? []}
            {...accessors}
          />
        ))}
        {
          //<AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
        }
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showHorizontalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              <div
                style={{
                  color: colorScale(tooltipData.nearestDatum?.key ?? ""),
                }}
              >
                {tooltipData?.nearestDatum?.key}
              </div>
              {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
              {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
            </div>
          )}
        />
      </XYChart>
    </>
  )
}
