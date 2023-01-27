import { Typography } from "@mui/material"
import { ConditionalRender, DataType, fromShortString } from "../../Types"
import { Dropdown } from "./Dropdown"
import { IDropdownConfig } from "./IDropdownConfig"

export function ModeDropdown(config: IDropdownConfig<DataType>) {
  const types = ["TPS", "GPS", "GTPS"]
  return (
    <Dropdown<DataType>
      options={types}
      hidden={config.hidden}
      selectionChanged={config.selectionChanged}
      conversionFunction={fromShortString}
      hoverText={<Typography>{"Select data type"}</Typography>}
    />
  )
}
