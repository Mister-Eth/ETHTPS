import { Fragment, useState } from "react"
import { ConditionalRender, DataType, inline } from "../../Types"
import { CustomButtonGroup } from "./CustomButtonGroup"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import {
  EvStation,
  LocalGasStation,
  Numbers,
  PhotoCamera,
} from "@mui/icons-material"
import { CurrentViewersIcon } from "./CurrentViewersIcon"
import { useGetExperimentsFromAppStore } from "../experiments/ExperimentHooks"

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
  const experimentsAppStoreValue = useGetExperimentsFromAppStore()
  return (
    <Fragment>
      <Box sx={{ float: "right" }}>
        {ConditionalRender(
          <CurrentViewersIcon />,
          experimentsAppStoreValue.includes(5) && false,
        )}
        <Tooltip
          arrow
          placement={"top"}
          {...getColorComparedTo(DataType.TPS)}
          title={<Typography>Transactions per second</Typography>}
        >
          <IconButton onClick={() => triggerChange(DataType.TPS)}>
            <Numbers />
          </IconButton>
        </Tooltip>

        <Tooltip
          arrow
          placement={"top"}
          {...getColorComparedTo(DataType.GPS)}
          title={<Typography>Gas per second</Typography>}
        >
          <IconButton onClick={() => triggerChange(DataType.GPS)}>
            <LocalGasStation />
          </IconButton>
        </Tooltip>

        <Tooltip
          arrow
          placement={"top"}
          {...getColorComparedTo(DataType.GTPS)}
          title={<Typography>Gas-adjusted transactions per second</Typography>}
        >
          <IconButton onClick={() => triggerChange(DataType.GTPS)}>
            <EvStation />
          </IconButton>
        </Tooltip>
      </Box>
    </Fragment>
  )
}
