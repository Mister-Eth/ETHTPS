import { Typography } from "@mui/material"
import { Dropdown } from "./Dropdown"
import { IDropdownConfig } from "./IDropdownConfig"
import { DataType } from "ethtps.api.client"
import { fromShortString, appModeToUIFormat } from "../../Types"

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
