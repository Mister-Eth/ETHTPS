import { TableCell } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetProviderTypeColorDictionaryFromAppStore } from "../../../../hooks/ColorHooks"
import React from "react"

export function ProviderTypeCell(config: ICustomCellConfiguration) {
  const colorDictionary = useGetProviderTypeColorDictionaryFromAppStore()
  const name = config.provider?.type ?? ""
  const color: string =
    colorDictionary !== undefined ? colorDictionary[name] : "primary"
  return (
    <React.Fragment>
      <TableCell sx={{ color: color }}>{config.provider?.type}</TableCell>
    </React.Fragment>
  )
}
