import React from "react";
import { IGlobalDependencies } from "../models/dependencies/IGlobalDependencies";
import { DiscordBanner } from "../components/partials/banners/DiscordBanner";
import { LoadingApplicationDataPartial } from "../components/partials/loading/LoadingApplicationDataPartial";
import { ModeButton } from "../components/buttons/ModeButton";
import { AllProvidersTable } from "../components/tables/all networks/AllProvidersTable";
import { Container } from "@mui/material";

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
          <Container maxWidth={"md"}>
            <AllProvidersTable />
          </Container>
        </>
      </LoadingApplicationDataPartial>
    </>
  );
}
