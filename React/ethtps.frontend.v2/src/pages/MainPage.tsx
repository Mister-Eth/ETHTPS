import React from "react"
import { IGlobalDependencies } from '../models/dependencies/IGlobalDependencies'
import { useGetProvidersTablePartial } from '../hooks/useGetProvidersTablePartial';
import { DiscordBanner } from "../components/partials/banners/DiscordBanner";
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial";
import { ModeButton } from '../components/buttons/ModeButton';

export default function MainPage(dependencies: IGlobalDependencies): JSX.Element {
  return <>
    <DiscordBanner />
    <LoadingApplicationDataPartial>
      <>
        <ModeButton/>
      </>
    </LoadingApplicationDataPartial>
  </>
}
