import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css
import React, { useEffect, useState } from "react"
import { IntervalDropdown } from "../dropdowns/IntervalDropdown"
import { NetworksDropdown } from "../dropdowns/NetworksDropdown"
import Container from "@mui/material/Container/Container"
import { ModeDropdown } from "../dropdowns/ModeDropdown"
import { useGetProviderColorDictionaryFromAppStore } from "../../hooks/ColorHooks"
import { api } from "../../services/DependenciesIOC"
import {
  DataType,
  TimeValue,
  ConditionalRender,
  CenteredInParent,
} from "../../Types"
import { Line } from "react-chartjs-2"
import { CategoryScale, Chart } from "chart.js/auto"
import "chartjs-adapter-moment"
import { noGrid } from "./ChartTypes"
import { Chip, Paper, Skeleton } from "@mui/material"
import { INoDataAvailableEvent } from "../INoDataAvailableEvent"
import { SkeletonWithTooltip } from "../partials/SkeletonWithTooltip"
import { useQuery } from "react-query"
import { DateRange, DateRangePicker, Range as RRange } from "react-date-range"
import { addDays } from "date-fns"
import { DoNotDisturbAlt } from "@mui/icons-material"
import { SpinningArrows } from "../icons/spinning hourglass/SpinningArrows"
Chart.register(CategoryScale)

interface IProviderDataChartConfiguration extends INoDataAvailableEvent {
  provider: string
}

export function ProviderDataChart(config: IProviderDataChartConfiguration) {
  const displayNetworksDropdown =
    false && config.provider.toUpperCase() === "ETHEREUM"
  const colorDictionary = useGetProviderColorDictionaryFromAppStore() ?? {}
  const [interval, setInterval] = useState<string>()
  const [network, setNetwork] = useState("Mainnet")
  const [mode, setMode] = useState(DataType.TPS)

  const [data, setData] = useState<TimeValue[]>([])
  const [noData, setNoData] = useState(false)
  const [usesDatePicker, setUsesDatePicker] = useState(false)
  const [loading, setLoading] = useState(true)
  const intervalChanged = (interval: string) => {
    const usesDate = interval === "Custom"
    setUsesDatePicker(usesDate)
    if (!usesDate) setInterval(interval)
    else {
      console.log("Custom")
    }
  }
  const modeChanged = (mode: DataType) => {
    setMode(mode)
  }
  const networkChanged = (network: string) => {
    setNetwork(network)
  }
  useEffect(() => {
    setLoading(true)
    api
      .getData(mode, interval as string, config.provider, network)
      ?.then((data) => {
        if (data[config.provider] !== undefined) {
          const values = data[config.provider]?.map((x) => x.data?.at(0))
          if (values.length > 0) {
            setData(
              values
                .filter((x) => x?.value !== undefined)
                ?.map((x) => new TimeValue(x)),
            )
          }
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }, [interval, network, mode])

  const [state, setState] = useState<RRange[] | undefined>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ])

  return (
    <React.Fragment>
      <Container
        sx={{
          borderThickness: "1px",
          borderColor: "primary",
          borderBlockColor: "primary",
        }}
      >
        <SkeletonWithTooltip text="Loading..." />
        <Paper elevation={1} sx={{ display: noData ? "none" : undefined }}>
          {displayNetworksDropdown ? (
            <NetworksDropdown selectionChanged={networkChanged} />
          ) : (
            <></>
          )}
          <div style={{ float: "right" }}>
            {ConditionalRender(
              <DateRange
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                scroll={{ enabled: true }}
                direction="vertical"
              />,
              usesDatePicker,
            )}
            <IntervalDropdown
              hidden={noData}
              onNoDataAvailable={(p) => {
                setNoData(true)
                if (config.onNoDataAvailable) {
                  config.onNoDataAvailable(p)
                }
              }}
              onDataLoaded={(intervals) => setInterval(intervals?.at(0))}
              provider={config.provider}
              selectionChanged={intervalChanged}
            />
            <ModeDropdown hidden={noData} selectionChanged={modeChanged} />
          </div>
        </Paper>
        <br />

        {ConditionalRender(
          <Chip
            label="No data available"
            sx={CenteredInParent}
            avatar={<DoNotDisturbAlt />}
            variant="filled"
          />,
          noData,
        )}
        {ConditionalRender(
          <Chip
            label="Loading..."
            sx={CenteredInParent}
            avatar={<SpinningArrows />}
            variant="filled"
          />,
          loading,
        )}
        <Paper elevation={1}>
          <Line
            style={{
              width: "inherit",
              height: "100%",
              maxHeight: "500px",
            }}
            data={{
              datasets: [
                {
                  label: `${config.provider}`,
                  data: data,
                  fill: true,
                  borderColor: colorDictionary[config.provider],
                  tension: 0.3,
                  pointHoverRadius: 15,
                  pointRadius: 0,
                  pointHitRadius: 30,
                  pointBackgroundColor: colorDictionary[config.provider],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  type: "timeseries",
                  ...noGrid,
                },
                y: {
                  ...noGrid,
                },
              },
            }}
          />
        </Paper>
      </Container>
    </React.Fragment>
  )
}
