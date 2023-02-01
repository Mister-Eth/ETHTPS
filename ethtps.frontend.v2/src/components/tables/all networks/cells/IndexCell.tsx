import { TableCell } from "@mui/material"
import {
  ICustomCellConfiguration,
  buildClassNames,
} from "./ICustomCellConfiguration"

interface IIndexCellConfiguration extends ICustomCellConfiguration {
  index: number
}

export function IndexCell(config: IIndexCellConfiguration) {
  return (
    <TableCell
      {...buildClassNames(config)}
      onClick={() =>
        config.clickCallback !== undefined
          ? config.clickCallback(config.provider, "Index")
          : () => {}
      }
    >
      {config.index}
    </TableCell>
  )
}
