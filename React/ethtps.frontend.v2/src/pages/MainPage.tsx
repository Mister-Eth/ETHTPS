import { IGlobalDependencies } from "../models/dependencies/IGlobalDependencies"
import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container } from "@mui/material"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { useGetMaxDataFromAppStore } from "../hooks/DataHooks"

export default function MainPage(
  dependencies: IGlobalDependencies,
): JSX.Element {
  const providers = useGetProvidersFromAppStore()
  const max = useGetMaxDataFromAppStore()
  return (
    <>
      <DiscordBanner />
      <LoadingApplicationDataPartial>
        <>
          <br />
          <Container maxWidth={"md"}>
            <AllProvidersTable providerData={providers} maxData={max} />
          </Container>
        </>
      </LoadingApplicationDataPartial>
    </>
  )
}
