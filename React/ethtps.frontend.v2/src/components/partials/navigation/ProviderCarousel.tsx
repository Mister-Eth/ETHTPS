import { Fragment } from "react"
import { useGetProvidersFromAppStore } from "../../../hooks/ProviderHooks"
import { IObjectWithProvider } from "../../../models/interfaces/IObjectWithProvider"
import { LargeProviderHeader } from "../../widgets/LargeProviderHeader"

interface IProviderCarouselConfiguration extends IObjectWithProvider {}

export function ProviderCarousel(config: IProviderCarouselConfiguration) {
  const providers = useGetProvidersFromAppStore()
  return (
    <Fragment>
      <LargeProviderHeader provider={config.provider} />
    </Fragment>
  )
}
