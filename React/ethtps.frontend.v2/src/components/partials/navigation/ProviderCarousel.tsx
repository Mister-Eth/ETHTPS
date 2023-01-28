import { Fragment } from "react"
import { useGetProvidersFromAppStore } from "../../../hooks/ProviderHooks"
import { IObjectWithProvider } from "../../../models/interfaces/IObjectWithProvider"

interface IProviderCarouselConfiguration extends IObjectWithProvider {}

export function ProviderCarousel(config: IProviderCarouselConfiguration) {
  const providers = useGetProvidersFromAppStore()
  return <Fragment></Fragment>
}
