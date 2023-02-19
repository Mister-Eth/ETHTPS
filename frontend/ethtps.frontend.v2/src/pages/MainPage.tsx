import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container, Paper } from "@mui/material"
import { useGetMaxDataFromAppStore } from "../hooks/DataHooks"
import { useEffect, useRef } from "react"
import { DataModeButtonGroup } from "../components/buttons/DataModeButtonGroup"
import {
  useGetSidechainsIncludedFromAppStore,
  useSetDataModeMutation,
} from "../hooks/LiveDataHooks"
import { SidechainToggleButton } from "../components/buttons/SidechainToggleButton"
import {
  useSetSidechainsIncluded,
  useGetLiveDataModeFromAppStore,
} from "../hooks/LiveDataHooks"
import { createSearchParams, useSearchParams } from "react-router-dom"
import { toShortString } from "../Types"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { isMobile } from "react-device-detect"
import { ProviderModel } from "ethtps.api.client"
import {
  useGet1mTPS,
  useGet1mGPS,
  useGet1mGTPS,
} from "../components/instant data animations/hooks"
import Streamgraph from "../components/instant data animations/VISXStreamgraph"
import { useState } from "react"
import { MultiProviderVSIXChart } from "../components/charts/MultiProviderVSIXChart"
import { CustomVISXStreamgraph } from "../components/instant data animations/CustomVISXStreamgraph"

export default function MainPage(): JSX.Element {
  const providers = useGetProvidersFromAppStore()
  const max = useGetMaxDataFromAppStore()
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const mode = useGetLiveDataModeFromAppStore()
  const [_1mtps, _1mgps, _1mgtps] = [
    useGet1mTPS(),
    useGet1mGPS(),
    useGet1mGTPS(),
  ]
  const useHandleCellClick = (provider?: ProviderModel, cellName?: string) => {}
  let [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams([
      ["sidechainsIncluded", sidechainsIncluded.toString()],
      ["mode", toShortString(mode)],
    ])
    setSearchParams(createSearchParams(params))
  }, [sidechainsIncluded, mode])
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<any>(null)
  useEffect(() => {
    setContainerWidth(
      containerRef.current ? containerRef.current.offsetWidth : 0,
    )
  }, [containerRef.current])
  const [streamgraphHoveredProvider, setStreamgraphHoveredProvider] =
    useState<string>()
  const streamgraphProviderHovered = (name: string) => {
    setStreamgraphHoveredProvider(name)
  }
  return (
    <>
      <Paper elevation={0}>
        <DiscordBanner />
        <>
          <br />
          <Container maxWidth={"md"}>
            <Paper elevation={1}>{/*<MultiProviderVSIXChart />*/}</Paper>
            <Paper elevation={1}>
              <SidechainToggleButton
                toggled={useSetSidechainsIncluded}
                defaultIncluded={sidechainsIncluded}
              />
              <DataModeButtonGroup modeChanged={useSetDataModeMutation} />
            </Paper>
            <Paper ref={containerRef} elevation={1}>
              {/*<Streamgraph width={containerWidth} height={500} />*/}
              {
                <CustomVISXStreamgraph
                  providerHovered={streamgraphProviderHovered}
                  width={containerWidth}
                  height={500}
                />
              }
            </Paper>
            <Paper elevation={1}>
              <AllProvidersTable
                providerData={providers}
                maxData={max}
                selectedProvider={streamgraphHoveredProvider}
                maxRowsBeforeShowingExpand={isMobile ? 15 : 20}
                clickCallback={useHandleCellClick}
              />
            </Paper>
          </Container>
        </>
      </Paper>
    </>
  )
}
