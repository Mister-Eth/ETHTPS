import { TableCell } from "@mui/material"
import {
  ICustomCellConfiguration,
  buildClassNames,
} from "./ICustomCellConfiguration"

interface IIndexCellConfiguration extends ICustomCellConfiguration {
  index: number
}

export function IndexCell(config: IIndexCellConfiguration) {
  return <TableCell {...buildClassNames(config)}>{config.index}</TableCell>
}
