import { useLocation } from "react-router"
import { ProviderList } from "../components/partials/navigation/ProviderList"
import { getSearchParamsForLocation } from "react-router-dom/dist/dom"
import { string } from "yargs"
import { useState, useEffect } from "react"
import { useGetProvidersFromAppStore } from "../hooks/ProviderHooks"
import { ProviderModel } from "../services/api-gen/models/ProviderModel"
import { Paper } from "@mui/material"
import { Container } from "@mui/system"
import { ProviderCarousel } from "../components/partials/navigation/ProviderCarousel"
import { ConditionalSkeletonRender } from "../Types"
import { ProviderDataChart } from "../components/charts/ProviderDataChart"

interface IProviderPageModel {
  provider?: string
}

export function ProviderPage(model: IProviderPageModel) {
  const location = useLocation()
  const [validProvider, setValidProvider] = useState(true)
  const [provider, setProvider] = useState<ProviderModel>()
  const providerName = location.pathname
    .toUpperCase()
    .replace("/PROVIDERS/", "")
  const providers = useGetProvidersFromAppStore()
  useEffect(() => {
    if (providers && providerName && !provider) {
      let x = providers.find(
        (y) => y.name?.toUpperCase() === providerName.toUpperCase(),
      )

      if (x) {
        // If we don't copy it, React calls this function again and again
        let p = new ProviderModel()
        p.name = x?.name
        p.type = x?.type
        setProvider(p)
      }
    }
  }, [providers])
  return (
    <>
      <Paper elevation={0}>
        <Container maxWidth={"md"}>
          {ConditionalSkeletonRender(
            <ProviderCarousel provider={provider} />,
            provider !== undefined,
          )}
          <ProviderDataChart provider={provider?.name as string} />
        </Container>
      </Paper>
    </>
  )
}
