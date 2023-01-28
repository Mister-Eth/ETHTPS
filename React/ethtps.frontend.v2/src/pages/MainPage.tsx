import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container, Paper } from "@mui/material"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { useGetMaxDataFromAppStore } from "../hooks/DataHooks"
import { ProviderModel } from "../services/api-gen"
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
import { toShortString } from "../Types"
import { SimpleInstantBar } from "../components/instant data animations/SimpleInstantBar"

export default function MainPage(): JSX.Element {
  const providers = useGetProvidersFromAppStore()
  const max = useGetMaxDataFromAppStore()
  const sidechainsIncluded = useGetSidechainsIncludedFromAppStore()
  const [showProviderModal, setShowProviderModal] = useState(false)
  const mode = useGetLiveDataModeFromAppStore()
  const [modalProvider, setModalProvider] =
    useState<ProviderModel | undefined>()
  const useHandleCellClick = (provider?: ProviderModel, cellName?: string) => {
    if ((cellName as string) === "MaxValue" || (cellName as string) === "Index")
      return
    setShowProviderModal(true)
    setModalProvider(provider)
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
      <DiscordBanner />
      <LoadingApplicationDataPartial />
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
            <SimpleInstantBar />
          </Paper>
          <Paper elevation={1}>
            <AllProvidersTable
              providerData={providers}
              maxData={max}
              maxRowsBeforeShowingExpand={20}
              clickCallback={useHandleCellClick}
            />
          </Paper>
        </Container>
      </>
    </>
  )
}
