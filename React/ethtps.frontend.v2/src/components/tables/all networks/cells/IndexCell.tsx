import { TableCell } from "@mui/material"

interface IIndexCellConfiguration {
  index: number
}

export function IndexCell(config: IIndexCellConfiguration) {
  return <TableCell>{config.index}</TableCell>
}
