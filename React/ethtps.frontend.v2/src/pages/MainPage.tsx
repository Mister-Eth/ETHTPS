import { IGlobalDependencies } from "../models/dependencies/IGlobalDependencies"
import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial"
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable"
import { Container } from "@mui/material"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { useGetMaxDataFromAppStore } from "../hooks/DataHooks"
import { ProviderDataChart } from "../components/charts/ProviderDataChart"

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
            <ProviderDataChart provider={"Ethereum"}></ProviderDataChart>
            <AllProvidersTable providerData={providers} maxData={max} />
          </Container>
        </>
      </LoadingApplicationDataPartial>
    </>
  )
}
