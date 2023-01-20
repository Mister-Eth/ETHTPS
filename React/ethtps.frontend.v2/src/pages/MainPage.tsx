import React from "react"
import { IGlobalDependencies } from '../models/dependencies/IGlobalDependencies'
import { useGetProvidersTablePartial } from '../hooks/useGetProvidersTablePartial';
import { DiscordBanner } from "../components/partials/banners/DiscordBanner";

export default function MainPage(dependencies: IGlobalDependencies): JSX.Element {
  const providersTable = useGetProvidersTablePartial()
  return <>
    <DiscordBanner />
    {providersTable}
  </>
}
