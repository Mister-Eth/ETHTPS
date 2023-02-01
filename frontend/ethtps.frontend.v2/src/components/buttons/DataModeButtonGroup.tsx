import { Fragment, useState } from "react"
import { DataType, inline } from "../../Types"
import { CustomButtonGroup } from "./CustomButtonGroup"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
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
  const [mode, setMode] = useState(DataType.NUMBER_0)
  const getColorComparedTo = (proposedMode: DataType) =>
    proposedMode == mode ? { color: "primary" } : undefined
  const triggerChange = (mode: DataType) => {
    setMode(mode)
    model.modeChanged(mode)
  }
  return (
    <Fragment>
      <Box sx={{ float: "right" }}>
        <Tooltip
          arrow
          placement={"top"}
          {...getColorComparedTo(DataType.NUMBER_0)}
          title={<Typography>Transactions per second</Typography>}
        >
          <IconButton onClick={() => triggerChange(DataType.NUMBER_0)}>
            <Numbers />
          </IconButton>
        </Tooltip>

        <Tooltip
          arrow
          placement={"top"}
          {...getColorComparedTo(DataType.NUMBER_1)}
          title={<Typography>Gas per second</Typography>}
        >
          <IconButton onClick={() => triggerChange(DataType.NUMBER_1)}>
            <LocalGasStation />
          </IconButton>
        </Tooltip>

        <Tooltip
          arrow
          placement={"top"}
          {...getColorComparedTo(DataType.NUMBER_2)}
          title={<Typography>Gas-adjusted transactions per second</Typography>}
        >
          <IconButton onClick={() => triggerChange(DataType.NUMBER_2)}>
            <EvStation />
          </IconButton>
        </Tooltip>
      </Box>
    </Fragment>
  )
}
