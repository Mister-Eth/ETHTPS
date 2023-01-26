import { Dropdown } from "./Dropdown"

export function ModeDropdown() {
  const types = ["TPS", "GPS", "GTPS"]
  return (
    <Dropdown
      options={types}
      defaultOption={"TPS"}
      hoverText={"Select data type"}
    />
  )
}
