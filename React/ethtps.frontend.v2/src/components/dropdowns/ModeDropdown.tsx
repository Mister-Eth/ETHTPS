import { Typography } from "@mui/material"
import { DataType, appModeToUIFormat, fromShortString } from "../../Types"
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
      uiFormatFunction={appModeToUIFormat}
      hoverText={<Typography>{"Select data type"}</Typography>}
    />
  )
}
