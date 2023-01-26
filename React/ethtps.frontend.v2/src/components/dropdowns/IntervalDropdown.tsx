import { Dropdown } from "./Dropdown"
import { useGetIntervalsFromAppStore } from "../../hooks/IntervalHooks"
import { toShortString_2 } from "../../models/TimeIntervals"
import { IDropdownCallback } from "./IDropdownCallback"

export function IntervalDropdown(config: IDropdownCallback) {
  const intervals = useGetIntervalsFromAppStore()
  return (
    <Dropdown
      options={intervals.map((x) => toShortString_2(x))}
      defaultOption={"1d"}
      selectionChanged={config.selectionChanged}
      hoverText={"Select time interval"}
    />
  )
}
