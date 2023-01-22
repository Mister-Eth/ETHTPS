import React from "react";
import { IGlobalDependencies } from "../models/dependencies/IGlobalDependencies";
import { DiscordBanner } from "../components/partials/banners/DiscordBanner";
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial";
import { ModeButton } from "../components/buttons/ModeButton";
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable";

export default function MainPage(
  dependencies: IGlobalDependencies
): JSX.Element {
  return (
    <>
      <DiscordBanner />
      <LoadingApplicationDataPartial>
        <>
          <ModeButton />
          <br />
          <AllProvidersTable />
        </>
      </LoadingApplicationDataPartial>
    </>
  );
}
