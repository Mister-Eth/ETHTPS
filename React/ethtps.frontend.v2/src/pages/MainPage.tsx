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
import { DataType } from "../Types"
import { store, useAppSelector } from "../store"
import { setLiveDataType } from "../slices/LiveDataSlice"
import {
  useSetDataModeMutation,
  useUpdateLiveData,
} from "../hooks/LiveDataHooks"

export default function MainPage(): JSX.Element {
  const providers = useGetProvidersFromAppStore()
  const max = useGetMaxDataFromAppStore()

  const [showProviderModal, setShowProviderModal] = useState(false)
  const [modalProvider, setModalProvider] =
    useState<ProviderModel | undefined>()
  const useHandleCellClick = (provider?: ProviderModel, cellName?: string) => {
    if ((cellName as string) === "MaxValue" || (cellName as string) === "Index")
      return
    setShowProviderModal(true)
    setModalProvider(provider)
  }

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
            <DataModeButtonGroup modeChanged={useSetDataModeMutation} />
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
