import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container, Paper } from "@mui/material"
import { useGetMaxDataFromAppStore } from "../hooks/DataHooks"
import { useState, useEffect } from "react"
import { ProviderModal } from "../components/partials/dialogs/modals/ProviderModal"
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
import { toShortString, ConditionalRender } from "../Types"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { isMobile } from "react-device-detect"
import { SimpleTextDisplay } from "../components/instant data animations/SimpleTextDisplay"
import { ProviderModel } from "ethtps.api.client"
import { StreamgraphAnimation } from "../components/instant data animations/streamgraph/StreamgraphAnimation"
import {
  useLiveData,
  useGet1mTPS,
  useGet1mGPS,
  useGet1mGTPS,
} from "../components/instant data animations/hooks"

export default function MainPage(): JSX.Element {
  const providers = useGetProvidersFromAppStore()
  const max = useGetMaxDataFromAppStore()
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const [showProviderModal, setShowProviderModal] = useState(false)
  const mode = useGetLiveDataModeFromAppStore()
  const data = useLiveData()
  const [_1mtps, _1mgps, _1mgtps] = [
    useGet1mTPS(),
    useGet1mGPS(),
    useGet1mGTPS(),
  ]
  const [modalProvider, setModalProvider] = useState<
    ProviderModel | undefined
  >()
  const useHandleCellClick = (provider?: ProviderModel, cellName?: string) => {
    if ((cellName as string) === "MaxValue" || (cellName as string) === "Index")
      return
    /*
    setShowProviderModal(true)
    setModalProvider(provider)*/
    window.location.href = "/Providers/" + provider?.name
  }

  let [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const params = new URLSearchParams([
      ["sidechainsIncluded", sidechainsIncluded.toString()],
      ["mode", toShortString(mode)],
    ])
    setSearchParams(createSearchParams(params))
  }, [sidechainsIncluded, mode])
  return (
    <>
      <Paper elevation={0}>
        <DiscordBanner />

        <>
          <br />
          <ProviderModal
            open={showProviderModal}
            provider={modalProvider}
            onClose={() => setShowProviderModal(false)}
          />
          <Container maxWidth={"md"}>
            <Paper elevation={1}>
              <SidechainToggleButton
                toggled={useSetSidechainsIncluded}
                defaultIncluded={sidechainsIncluded}
              />
              <DataModeButtonGroup modeChanged={useSetDataModeMutation} />
            </Paper>
            <Paper elevation={1}>
              <SimpleTextDisplay />
              {ConditionalRender(
                <StreamgraphAnimation data={_1mtps} />,
                false,
              )}
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
