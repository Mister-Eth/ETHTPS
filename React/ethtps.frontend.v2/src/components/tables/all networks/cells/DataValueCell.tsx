import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { SkeletonWithTooltip } from "../../../partials/SkeletonWithTooltip"
import { TableCell, Typography } from "@mui/material"
import { useGetLiveDataFromAppStore } from "../../../../hooks/LiveDataHooks"
import {
  useGetLiveDataModeFromAppStore,
  useGetLiveDataSmoothingFromAppStore,
} from "../../../../hooks/LiveDataHooks"
import { toShortString } from "../../../../Types"
import { ILiveDataModeModel } from "../../../../models/interfaces/ILiveDataModeModel"
import { tableCellTypographyStandard } from "./Typography.types"
import { centered } from "../../Cells.Types"

export function DataValueCell(config: ICustomCellConfiguration) {
  const mode = useGetLiveDataModeFromAppStore()
  const liveData = useGetLiveDataFromAppStore()
  let value: number = 0
  if (liveData.data !== undefined) {
    value = liveData.data[config.provider?.name as string]?.at(0)?.data?.at(0)
      ?.value as number
  }
  value = value === undefined ? 0 : Math.trunc(value * 100) / 100
  return (
    <TableCell>
      {value === undefined ? (
        <SkeletonWithTooltip
          text={`Loading ${config.provider?.name} ${toShortString(mode)}...`}
        />
      ) : (
        <Typography {...tableCellTypographyStandard} {...centered}>
          {value as number}
        </Typography>
      )}
    </TableCell>
  )
}
