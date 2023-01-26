import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { SkeletonWithTooltip } from "../../../partials/SkeletonWithTooltip"
import { TableCell } from "@mui/material"

export function DataValueCell(config: ICustomCellConfiguration) {
  return (
    <TableCell>
      <SkeletonWithTooltip />
    </TableCell>
  )
}
