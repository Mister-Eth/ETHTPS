import { Button } from "@mui/material";
import React from "react";
import { CustomButtonGroup } from "./CustomButtonGroup";

export function ModeButton(): JSX.Element {
  return <CustomButtonGroup {...{ buttons: ["TPS", "GPS", "GTPS"] }} />;
}
