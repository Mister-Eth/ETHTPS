import { Fragment } from "react"
import { useGetProvidersFromAppStore } from "../../../hooks/ProviderHooks"
import { LargeProviderHeader } from "../../widgets/LargeProviderHeader"
import { Paper } from "@mui/material"
import { IObjectWithProvider } from "../../../models/interfaces/IObjectWithProvider"

interface IProviderCarouselConfiguration extends IObjectWithProvider {}

export function ProviderCarousel(config: IProviderCarouselConfiguration) {
  const providers = useGetProvidersFromAppStore()
  return (
    <Fragment>
      <LargeProviderHeader provider={config.provider} />
      {providers.map((x, i) => (
        <Paper key={i}></Paper>
      ))}
    </Fragment>
  )
}
