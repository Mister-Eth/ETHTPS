import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container, Paper } from "@mui/material"
import { useEffect, useRef } from "react"
import { DataModeButtonGroup } from "../components/buttons/DataModeButtonGroup"
import { createSearchParams, useSearchParams } from "react-router-dom"
import { toShortString } from "../Types"
import { isMobile } from "react-device-detect"
import { ProviderModel } from "ethtps.api.client"
import {
  useGet1mTPS,
  useGet1mGPS,
  useGet1mGTPS,
} from "../components/instant data animations/hooks"
import { useState } from "react"
import { CustomVISXStreamgraph } from "../components/instant data animations/CustomVISXStreamgraph"
import { SidechainToggleButton } from "../components/buttons/SidechainToggleButton"
import {
  liveDataHooks,
  useAppSelector,
  useSetSidechainsIncluded,
  store,
} from "ethtps.data"

export default function MainPage(): JSX.Element {
  const providers = useAppSelector((state) => state.providers)
  const max = useAppSelector((state) => state.maxData)
  const sidechainsIncluded =
    liveDataHooks.useGetSidechainsIncludedFromAppStore()
  const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
  const [_1mtps, _1mgps, _1mgtps] = [
    useGet1mTPS(),
    useGet1mGPS(),
    useGet1mGTPS(),
  ]
  const useHandleCellClick = (provider?: ProviderModel, cellName?: string) => {}
  let [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    if (sidechainsIncluded && mode) {
      const params = new URLSearchParams([
        ["sidechainsIncluded", sidechainsIncluded.toString()],
        ["mode", toShortString(mode)],
      ])
      setSearchParams(createSearchParams(params))
    }
  }, [sidechainsIncluded, mode])
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<any>(null)
  useEffect(() => {
    setContainerWidth(
      containerRef.current ? containerRef.current.offsetWidth : 0,
    )
  }, [containerRef.current])
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
                //toggled={(v) => store.dispatch(useSetSidechainsIncluded(v))}
                defaultIncluded={
                  false /*useAppSelector(
                  (state) => state.mainPage?.sidechainsIncluded,
                )*/
                }
              />
              <DataModeButtonGroup
                modeChanged={liveDataHooks.useSetDataModeMutation}
              />
            </Paper>
            <Paper ref={containerRef} elevation={1}>
              {/*<Streamgraph width={containerWidth} height={500} />*/}
              {<CustomVISXStreamgraph width={containerWidth} height={500} />}
            </Paper>
            <Paper elevation={1}>
              <AllProvidersTable
                providerData={providers}
                maxData={max}
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
