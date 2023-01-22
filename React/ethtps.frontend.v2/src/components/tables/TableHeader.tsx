import { TableRow, TableCell } from "@mui/material";
import React from "react";

interface ITableHeaderParams {
  text?: string[];
}

export function TableHeader(params: ITableHeaderParams): JSX.Element {
  return (
    <TableRow>
      {params.text?.map((x) => (
        <TableCell>{x}</TableCell>
      ))}
    </TableRow>
  );
}
