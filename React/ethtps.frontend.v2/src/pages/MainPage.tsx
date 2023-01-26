import { IGlobalDependencies } from "../models/dependencies/IGlobalDependencies"
import { DiscordBanner } from "../components/partials/banners/DiscordBanner"
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial"
import { ModeButton } from "../components/buttons/ModeButton"
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
          <ModeButton />
          <br />
          <Container maxWidth={"md"}>
            <AllProvidersTable providerData={providers} maxData={max} />
          </Container>
        </>
      </LoadingApplicationDataPartial>
    </>
  )
}
