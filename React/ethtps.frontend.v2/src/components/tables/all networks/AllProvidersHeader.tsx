import { TableRow, TableCell } from "@mui/material";
import React from "react";
import { TableHeader } from "../TableHeader";

export function AllProvidersHeader(): JSX.Element {
  return (
    <>
      <TableHeader text={["#", "Name", "TPS", "Max recorded TPS", "Type"]} />
    </>
  );
}
