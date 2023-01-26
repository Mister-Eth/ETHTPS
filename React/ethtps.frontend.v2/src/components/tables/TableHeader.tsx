import { TableRow, TableCell } from "@mui/material"
import React from "react"

interface ITableHeaderParams {
  text?: string[]
}

export function TableHeader(params: ITableHeaderParams): JSX.Element {
  return (
    <TableRow>
      {params.text?.map((x, i) => (
        <TableCell sx={{ fontWeight: "bold" }} key={i}>
          {x}
        </TableCell>
      ))}
    </TableRow>
  )
}
