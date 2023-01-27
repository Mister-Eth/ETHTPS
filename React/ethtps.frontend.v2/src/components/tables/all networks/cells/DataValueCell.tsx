import {
  ICustomCellConfiguration,
  buildClassNames,
} from "./ICustomCellConfiguration"
import { SkeletonWithTooltip } from "../../../partials/SkeletonWithTooltip"
import { TableCell, Typography } from "@mui/material"
import { useGetLiveDataFromAppStore } from "../../../../hooks/LiveDataHooks"
import { useGetLiveDataModeFromAppStore } from "../../../../hooks/LiveDataHooks"
import { toShortString } from "../../../../Types"
import { tableCellTypographyStandard } from "./Typography.types"
import { centered } from "../../Cells.Types"
import { useEffect, useState } from "react"

export function DataValueCell(config: ICustomCellConfiguration) {
  const mode = useGetLiveDataModeFromAppStore()
  const liveData = useGetLiveDataFromAppStore()
  const [value, setValue] = useState<number | undefined>(undefined)
  useEffect(() => {
    let x: number = 0
    if (liveData.data !== undefined) {
      x = liveData.data[config.provider?.name as string]?.at(0)?.data?.at(0)
        ?.value as number
    }
    x = x === undefined ? 0 : Math.trunc(x * 100) / 100
    setValue(x)
  }, [mode, liveData])
  return (
    <TableCell {...centered} {...buildClassNames(config)}>
      {value === undefined ? (
        <SkeletonWithTooltip
          text={`Loading ${config.provider?.name} ${toShortString(mode)}...`}
        />
      ) : (
        <Typography {...tableCellTypographyStandard}>
          {value as number}
        </Typography>
      )}
    </TableCell>
  )
}
