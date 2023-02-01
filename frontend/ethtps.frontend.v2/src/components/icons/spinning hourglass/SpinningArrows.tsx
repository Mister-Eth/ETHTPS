import { Fragment } from "react"
import "./Spinning hourglass.css"
import { Autorenew, HourglassBottomOutlined, Sync } from "@mui/icons-material"

export function SpinningArrows() {
  return (
    <Fragment>
      <Autorenew className="rotation-animation" />
    </Fragment>
  )
}
