import { TableCell, Tooltip, Typography } from "@mui/material"
import {
  ICustomCellConfiguration,
  buildClassNames,
} from "./ICustomCellConfiguration"
import { useGetMaxDataForProviderFromAppStore } from "../../../../hooks/DataHooks"
import { useGetLiveDataModeFromAppStore } from "../../../../hooks/LiveDataHooks"
import { centered } from "../../Cells.Types"
import { tableCellTypographyStandard } from "./Typography.types"
import { DataPoint } from "../../../../services/api-gen"
import moment from "moment"

function generateMaxHoverMessage(data?: DataPoint): string {
  if (
    data === undefined ||
    (data?.blockNumber === undefined && data?.date === undefined) ||
    data?.blockNumber === 0 ||
    moment(data?.date).year() === undefined ||
    moment(data?.date).year() === 1
  ) {
    return ""
  }

  if (data?.blockNumber !== undefined && data?.blockNumber !== 0) {
    return `Seen at block ${data?.blockNumber}`
  }

  return `Seen ${moment(data?.date)}`
}

function generateMaxTypography(data?: DataPoint) {
  const message = generateMaxHoverMessage(data)
  return message?.length > 0 ? <Typography>{message}</Typography> : undefined
}

export function MaxValueCell(config: ICustomCellConfiguration) {
  const type = useGetLiveDataModeFromAppStore()
  const maxData = useGetMaxDataForProviderFromAppStore(
    config.provider?.name as string,
    type,
  )
  const tooltipTypography = generateMaxTypography(maxData)
  return (
    <TableCell
      {...centered}
      {...buildClassNames(config)}
      onClick={() =>
        config.clickCallback !== undefined
          ? config.clickCallback(config.provider, "MaxValue")
          : () => {}
      }
    >
      <Tooltip arrow={true} title={tooltipTypography}>
        <Typography
          {...tableCellTypographyStandard}
          sx={{
            textDecoration:
              tooltipTypography !== undefined ? "underline" : undefined,
          }}
        >
          {Math.round(maxData?.value as number).toString()}
        </Typography>
      </Tooltip>
    </TableCell>
  )
}
