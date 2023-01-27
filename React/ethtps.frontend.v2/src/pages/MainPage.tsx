import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container } from "@mui/material"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { useGetMaxDataFromAppStore } from "../hooks/DataHooks"
import { ProviderModel } from "../services/api-gen"

export default function MainPage(): JSX.Element {
  const providers = useGetProvidersFromAppStore()
  const max = useGetMaxDataFromAppStore()
  const handleCellClick = (provider?: ProviderModel, cellName?: string) => {}
  return (
    <>
      <DiscordBanner />
      <LoadingApplicationDataPartial>
        <>
          <br />
          <Container maxWidth={"md"}>
            <AllProvidersTable
              providerData={providers}
              maxData={max}
              clickCallback={handleCellClick}
            />
          </Container>
        </>
      </LoadingApplicationDataPartial>
    </>
  )
}
