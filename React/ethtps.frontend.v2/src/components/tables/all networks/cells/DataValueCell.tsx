import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { SkeletonWithTooltip } from "../../../partials/SkeletonWithTooltip"
import { TableCell } from "@mui/material"
import { useGetLiveDataFromAppStore } from "../../../../hooks/LiveDataHooks"
import {
  useGetLiveDataModeFromAppStore,
  useGetLiveDataSmoothingFromAppStore,
} from "../../../../hooks/LiveDataHooks"
import { toShortString } from "../../../../Types"

export function DataValueCell(config: ICustomCellConfiguration) {
  const mode = useGetLiveDataModeFromAppStore()
  const smoothing = useGetLiveDataSmoothingFromAppStore()
  const value = useGetLiveDataFromAppStore()
  return (
    <TableCell>
      <SkeletonWithTooltip
        text={`Loading ${config.provider?.name} ${toShortString(mode)}...`}
      />
    </TableCell>
  )
}
