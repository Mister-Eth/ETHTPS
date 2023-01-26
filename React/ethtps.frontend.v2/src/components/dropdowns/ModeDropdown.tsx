import { DataType, fromShortString } from "../../Types"
import { Dropdown } from "./Dropdown"
import { IDropdownCallback } from "./IDropdownCallback"

export function ModeDropdown(config: IDropdownCallback<DataType>) {
  const types = ["TPS", "GPS", "GTPS"]
  return (
    <Dropdown<DataType>
      options={types}
      defaultOption={"TPS"}
      selectionChanged={config.selectionChanged}
      conversionFunction={fromShortString}
      hoverText={"Select data type"}
    />
  )
}
