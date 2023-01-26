import { Dropdown } from "./Dropdown"
import { useGetIntervalsFromAppStore } from "../../hooks/IntervalHooks"
import { toShortString_2 } from "../../models/TimeIntervals"

export function IntervalDropdown() {
  const intervals = useGetIntervalsFromAppStore()
  return (
    <Dropdown
      options={intervals.map((x) => toShortString_2(x))}
      defaultOption={"1d"}
      hoverText={"Select time interval"}
    />
  )
}
