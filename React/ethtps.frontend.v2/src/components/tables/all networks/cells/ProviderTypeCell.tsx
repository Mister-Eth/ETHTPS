import { TableCell, Typography } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetProviderTypeColorDictionaryFromAppStore } from "../../../../hooks/ColorHooks"
import React from "react"
import { centered } from "../../Cells.Types"
import { tableCellTypographyStandard } from "./Typography.types"

export function ProviderTypeCell(config: ICustomCellConfiguration) {
  const colorDictionary = useGetProviderTypeColorDictionaryFromAppStore()
  const name = config.provider?.type ?? ""
  const color: string =
    colorDictionary !== undefined ? colorDictionary[name] : "primary"
  return (
    <React.Fragment>
      <TableCell {...centered} sx={{ color: color }}>
        <Typography {...tableCellTypographyStandard}>
          {config.provider?.type}
        </Typography>
      </TableCell>
    </React.Fragment>
  )
}
