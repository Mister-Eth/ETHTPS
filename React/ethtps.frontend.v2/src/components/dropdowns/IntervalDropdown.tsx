import { Dropdown } from "./Dropdown"
import { fromShortString_2, toShortString_2 } from "../../models/TimeIntervals"
import { IDropdownCallbackWithProvider } from "./IDropdownCallbackWithProvider"
import { Typography } from "@mui/material"
import { useQuery } from "react-query"
import { api } from "../../services/DependenciesIOC"
import { Fragment, useState, useEffect } from "react"
import { IDropdownConfig } from "./IDropdownConfig"
import { shortTimeIntervalToUIFormat } from "../../Types"
import { INoDataAvailableEvent } from "../INoDataAvailableEvent"

interface IIntervalDropdownConfig
  extends IDropdownCallbackWithProvider<string>,
    IDropdownConfig<string>,
    INoDataAvailableEvent {
  onDataLoaded?: (availableIntervals: string[]) => void
}

export function IntervalDropdown(config: IIntervalDropdownConfig) {
  const [intervals, setIntervals] = useState<string[]>()
  const { data, status } = useQuery(
    `${config.provider}-intervals`,
    () => api.getIntervalsWithData(config.provider as string),
    {},
  )
  useEffect(() => {
    if (status === "success") {
      setIntervals(data)
      if (data === undefined || data.length === 0) {
        if (config.onNoDataAvailable !== undefined) {
          config.onNoDataAvailable(config.provider)
        }
      } else {
        if (config.onDataLoaded !== undefined) {
          config.onDataLoaded(data)
        }
      }
    }
  }, [data, status])
  return (
    <Fragment>
      <Dropdown<string>
        hidden={intervals === undefined}
        options={
          intervals === undefined
            ? []
            : intervals?.map((x) => toShortString_2(x)).concat(["Custom"])
        }
        selectionChanged={config.selectionChanged}
        conversionFunction={(x) => fromShortString_2(x)}
        uiFormatFunction={shortTimeIntervalToUIFormat}
        hoverText={<Typography>{"Select time interval"}</Typography>}
      />
    </Fragment>
  )
}
