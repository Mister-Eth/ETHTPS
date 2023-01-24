import React from "react";
import { IProviderTableModel } from "../../../models/tables/IProviderTableModel";
import { TableCell, TableRow } from "@mui/material";
import { CustomDataPoint } from "../../../Types";

export function AllProvidersRows(rowData: IProviderTableModel): JSX.Element {
  return (
    <>
      {rowData.providerData?.map((x, i) => (
        <TableRow key={i}>
          <TableCell>{i + 1}</TableCell>
          <TableCell>{x?.name}</TableCell>
          <TableCell>0</TableCell>
          <TableCell>0</TableCell>
          <TableCell>{x.type}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
