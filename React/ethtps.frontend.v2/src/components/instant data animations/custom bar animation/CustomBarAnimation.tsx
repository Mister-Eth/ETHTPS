import { Fragment } from "react"
import { useLiveData } from "../hooks"
import { Typography } from "@mui/material"
import {
  numberFormat,
  ConditionalRender,
  ConditionalSkeletonRender,
} from "../../../Types"

export function CustomBarAnimation() {
  const liveData = useLiveData()
  return (
    <Fragment>
      {ConditionalSkeletonRender(
        <Typography>
          {`Ethereum is doing ${numberFormat(liveData?.total)} ${
            liveData?.mode
          }`}
        </Typography>,
        liveData !== undefined,
      )}
    </Fragment>
  )
}
