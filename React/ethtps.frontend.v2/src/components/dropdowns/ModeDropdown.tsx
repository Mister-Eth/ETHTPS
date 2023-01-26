import { Dropdown } from "./Dropdown"
import { IDropdownCallback } from "./IDropdownCallback"

export function ModeDropdown(config: IDropdownCallback) {
  const types = ["TPS", "GPS", "GTPS"]
  return (
    <Dropdown
      options={types}
      defaultOption={"TPS"}
      selectionChanged={config.selectionChanged}
      hoverText={"Select data type"}
    />
  )
}
