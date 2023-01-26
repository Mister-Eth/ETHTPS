import { TableCell, Tooltip, Typography } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetMaxDataForProviderFromAppStore } from "../../../../hooks/DataHooks"
import { useGetLiveDataModeFromAppStore } from "../../../../hooks/LiveDataHooks"
import { centered } from "../../Cells.Types"
import { tableCellTypographyStandard } from "./Typography.types"

export function MaxValueCell(config: ICustomCellConfiguration) {
  const type = useGetLiveDataModeFromAppStore()
  const maxData = useGetMaxDataForProviderFromAppStore(
    config.provider?.name as string,
    type,
  )
  return (
    <TableCell {...centered}>
      <Tooltip arrow={true} title={maxData?.blockNumber}>
        <Typography {...tableCellTypographyStandard}>
          {Math.round(maxData?.value as number)}
        </Typography>
      </Tooltip>
    </TableCell>
  )
}
