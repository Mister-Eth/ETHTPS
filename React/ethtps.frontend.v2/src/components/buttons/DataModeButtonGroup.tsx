import { Fragment, useState } from "react"
import { DataType } from "../../Types"
import { CustomButtonGroup } from "./CustomButtonGroup"
import { IconButton, Tooltip, Typography } from "@mui/material"
import {
  EvStation,
  LocalGasStation,
  Numbers,
  PhotoCamera,
} from "@mui/icons-material"

interface IDataModeButtonGroupConfiguration {
  modeChanged: (mode: DataType) => void
}

export function DataModeButtonGroup(model: IDataModeButtonGroupConfiguration) {
  const [mode, setMode] = useState(DataType.TPS)
  const getColorComparedTo = (proposedMode: DataType) =>
    proposedMode == mode ? { color: "primary" } : undefined
  const triggerChange = (mode: DataType) => {
    setMode(mode)
    model.modeChanged(mode)
  }
  return (
    <Fragment>
      <Typography>Mode:</Typography>

      <Tooltip
        {...getColorComparedTo(DataType.TPS)}
        title={<Typography>Transactions per second</Typography>}
      >
        <IconButton onClick={() => triggerChange(DataType.TPS)}>
          <Numbers />
        </IconButton>
      </Tooltip>

      <Tooltip
        {...getColorComparedTo(DataType.GPS)}
        title={<Typography>Gas per second</Typography>}
      >
        <IconButton onClick={() => triggerChange(DataType.GPS)}>
          <LocalGasStation />
        </IconButton>
      </Tooltip>

      <Tooltip
        {...getColorComparedTo(DataType.GTPS)}
        title={<Typography>Gas-adjusted transactions per second</Typography>}
      >
        <IconButton onClick={() => triggerChange(DataType.GTPS)}>
          <EvStation />
        </IconButton>
      </Tooltip>
    </Fragment>
  )
}
