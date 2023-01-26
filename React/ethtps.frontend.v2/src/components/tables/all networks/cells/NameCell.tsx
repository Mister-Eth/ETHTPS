import { TableCell } from "@mui/material"
import { ICustomCellConfiguration } from "./ICustomCellConfiguration"
import { useGetProviderColorDictionaryFromAppStore } from "../../../../hooks/ColorHooks"

export function NameCell(config: ICustomCellConfiguration) {
  const colorDictionary = useGetProviderColorDictionaryFromAppStore()
  const name = config.provider?.name ?? ""
  const color: string =
    colorDictionary !== undefined ? colorDictionary[name] : "primary"
  return <TableCell sx={{ color: color }}>{config.provider?.name}</TableCell>
}
