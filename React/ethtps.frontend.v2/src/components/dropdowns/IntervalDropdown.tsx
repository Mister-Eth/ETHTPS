import { Dropdown } from "./Dropdown"
import { useGetIntervalsFromAppStore } from "../../hooks/IntervalHooks"
import { fromShortString_2, toShortString_2 } from "../../models/TimeIntervals"
import { IDropdownCallback } from "./IDropdownCallback"

export function IntervalDropdown(config: IDropdownCallback<string>) {
  const intervals = useGetIntervalsFromAppStore()
  return (
    <Dropdown<string>
      options={intervals.map((x) => toShortString_2(x))}
      defaultOption={"1d"}
      selectionChanged={config.selectionChanged}
      conversionFunction={(x) => fromShortString_2(x)}
      hoverText={"Select time interval"}
    />
  )
}
