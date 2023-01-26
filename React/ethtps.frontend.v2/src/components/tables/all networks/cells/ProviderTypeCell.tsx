import { TableCell } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetProviderTypeColorDictionaryFromAppStore } from "../../../../hooks/ColorHooks"

export function ProviderTypeCell(config: ICustomCellConfiguration) {
  const colorDictionary = useGetProviderTypeColorDictionaryFromAppStore()
  const name = config.provider?.type ?? ""
  const color: string =
    colorDictionary !== undefined ? colorDictionary[name] : "primary"
  return <TableCell sx={{ color: color }}>{config.provider?.type}</TableCell>
}
