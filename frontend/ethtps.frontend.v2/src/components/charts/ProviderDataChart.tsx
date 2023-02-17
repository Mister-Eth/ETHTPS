import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css
import React, { useEffect, useRef, useState } from "react"
import { ProviderIntervalDropdown } from "../dropdowns/ProviderIntervalDropdown"
import { NetworksDropdown } from "../dropdowns/NetworksDropdown"
import Container from "@mui/material/Container/Container"
import { useGetProviderColorDictionaryFromAppStore } from "../../hooks/ColorHooks"
import { ConditionalRender, StringTimeValue } from "../../Types"
import { Chip, Paper, Typography } from "@mui/material"
import { INoDataAvailableEvent } from "../INoDataAvailableEvent"
import { DoNotDisturbAlt } from "@mui/icons-material"
import { SpinningArrows } from "../icons/spinning hourglass/SpinningArrows"
import { DateRangeSelectorDropdown } from "../dropdowns/DateRangeSelectorDropdown"
import { api } from "../../services/DependenciesIOC"
import { DataModeButtonGroup } from "../buttons/DataModeButtonGroup"
import { useQuery } from "react-query"
import { BrushChart } from "./brush/BrushChart"
import { DataType, TimeInterval } from "ethtps.api.client"

interface IProviderDataChartConfiguration extends INoDataAvailableEvent {
  provider: string
}

export function ProviderDataChart(config: IProviderDataChartConfiguration) {
  const displayNetworksDropdown =
    false && config.provider.toUpperCase() === "ETHEREUM"
  const colorDictionary = useGetProviderColorDictionaryFromAppStore() ?? {}
  const [interval, setInterval] = useState<string>()
  const [network, setNetwork] = useState("Mainnet")
  const [mode, setMode] = useState<DataType>(DataType.Tps)

  const [d, setD] = useState<StringTimeValue[]>([])
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

  const { data, isSuccess, refetch } = useQuery(
    "get data",
    () =>
      api.getData(
        mode,
        TimeInterval[interval as string as keyof typeof TimeInterval],
        config.provider,
        network,
      ),
    { refetchOnMount: false, refetchInterval: 60 * 1000 },
  )
  useEffect(() => {
    if (isSuccess) {
      if (data[config.provider] !== undefined) {
        const values = data[config.provider]?.map((x) => x.data?.at(0))
        if (values.length > 0) {
          setD(
            values
              .filter((x) => x?.value !== undefined)
              ?.map((x) => new StringTimeValue(x)),
          )
          setNoData(false)
          setLoading(false)
        }
      }
    }
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
  }, [interval, network, mode])
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<any>(null)
  useEffect(() => {
    setContainerWidth(
      containerRef.current ? containerRef.current.offsetWidth : 0,
    )
  }, [containerRef.current])
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
            <ProviderIntervalDropdown
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
            <DataModeButtonGroup modeChanged={modeChanged} />
          </div>
        </Paper>
        <br />
        <Paper elevation={1}>
          <div className="parent" ref={containerRef}>
            <BrushChart
              width={containerWidth}
              height={containerWidth / 1.4142}
            />
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
          </div>
        </Paper>
      </Container>
    </React.Fragment>
  )
}
