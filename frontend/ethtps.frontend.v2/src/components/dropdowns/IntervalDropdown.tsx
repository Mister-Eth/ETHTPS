import { Container, Typography } from "@mui/material"
import { Fragment } from "react"
import { config } from "react-transition-group"
import { DataType, shortTimeIntervalToUIFormat } from "../../Types"
import { toShortString_2, fromShortString_2 } from "../../models/TimeIntervals"
import { Dropdown } from "./Dropdown"
import { DataModeButtonGroup } from "../buttons/DataModeButtonGroup"

interface IIntervalDropdownProperties {
  onChanged?: (value: string) => void
}

export function IntervalDropdown(config: IIntervalDropdownProperties) {
  const intervals = [
    "OneMinute",
    "OneHour",
    "OneDay",
    "OneWeek",
    "OneMonth",
    "OneYear",
    "All",
    "Custom",
  ]
  return (
    <Container
      sx={{
        borderThickness: "1px",
        borderColor: "primary",
        borderBlockColor: "primary",
      }}
    >
      <div className="inline" style={{ float: "right" }}>
        <Dropdown<string>
          options={intervals?.map((x) => toShortString_2(x))}
          selectionChanged={config.onChanged}
          conversionFunction={(x) => fromShortString_2(x)}
          uiFormatFunction={shortTimeIntervalToUIFormat}
          hoverText={<Typography>{"Select time interval"}</Typography>}
        />
      </div>
    </Container>
  )
}
