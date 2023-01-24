import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Container,
} from "@mui/material";
import React from "react";
import { IProviderTableModel } from "../../../models/tables/IProviderTableModel";
import { AllProvidersHeader } from "./AllProvidersHeader";
import { AllProvidersRows } from "./AllProvidersRows";
import { useGetProvidersFromAppStore } from "../../../hooks/providerHooks";

export function AllProvidersTable(tableData: IProviderTableModel): JSX.Element {
  const providers = useGetProvidersFromAppStore();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <AllProvidersHeader />
        </TableHead>
        <TableBody>
          <AllProvidersRows {...tableData} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
