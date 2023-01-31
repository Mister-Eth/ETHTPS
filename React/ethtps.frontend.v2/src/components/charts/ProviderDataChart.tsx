import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css
import React, { useEffect, useState } from "react"
import { IntervalDropdown } from "../dropdowns/IntervalDropdown"
import { NetworksDropdown } from "../dropdowns/NetworksDropdown"
import Container from "@mui/material/Container/Container"
import { ModeDropdown } from "../dropdowns/ModeDropdown"
import { useGetProviderColorDictionaryFromAppStore } from "../../hooks/ColorHooks"
import { api } from "../../services/DependenciesIOC"
import { DataType, TimeValue, ConditionalRender } from "../../Types"
import { Line } from "react-chartjs-2"
import { CategoryScale, Chart } from "chart.js/auto"
import "chartjs-adapter-moment"
import { noGrid } from "./ChartTypes"
import { Chip, Paper, Typography } from "@mui/material"
import { INoDataAvailableEvent } from "../INoDataAvailableEvent"
import { DoNotDisturbAlt } from "@mui/icons-material"
import { SpinningArrows } from "../icons/spinning hourglass/SpinningArrows"
import { DateRangeSelectorDropdown } from "../dropdowns/DateRangeSelectorDropdown"
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
  }
  const modeChanged = (mode: DataType) => {
    setMode(mode)
  }
  const networkChanged = (network: string) => {
    setNetwork(network)
  }
  useEffect(() => {
    setLoading(true)
    setNoData(true)
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
            setNoData(false)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [interval, network, mode])

  return (
    <React.Fragment>
      <Container
        sx={{
          borderThickness: "1px",
          borderColor: "primary",
          borderBlockColor: "primary",
        }}
      >
        <Paper elevation={1} sx={{ display: noData ? "none" : undefined }}>
          {displayNetworksDropdown ? (
            <NetworksDropdown selectionChanged={networkChanged} />
          ) : (
            <></>
          )}
          {ConditionalRender(
            <DateRangeSelectorDropdown hidden={!usesDatePicker} />,
            usesDatePicker,
          )}
          <div style={{ float: "right" }}>
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

        <Paper elevation={1}>
          <div className="parent">
            {ConditionalRender(
              <Chip
                label={
                  <Typography sx={{ fontWeight: "bold" }}>
                    Loading...
                  </Typography>
                }
                color="primary"
                className="appear-delayed child"
                avatar={<SpinningArrows />}
                variant="filled"
              />,
              loading,
            )}
            {ConditionalRender(
              <Chip
                className="appear child"
                label="No data available"
                avatar={<DoNotDisturbAlt />}
                variant="filled"
                style={{ opacity: "100%" }}
              />,
              noData && !loading,
            )}
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
                interaction: {
                  mode: "index",
                },
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
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  )
}
