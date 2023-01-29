import { Fab, Tooltip, Typography } from "@mui/material"
import { Fragment } from "react"
import { AddHome, Feedback } from "@mui/icons-material"
import { useState } from "react"
import { ConditionalRender } from "../../../Types"

export function SimpleDesktopFeedbackExperiment() {
  const [display, setDisplay] = useState(false)
  const [hovered, setHovered] = useState(false)
  setTimeout(() => {
    setDisplay(true)
  }, 1 * 1000) //Display after 15 seconds
  return (
    <Fragment>
      {ConditionalRender(
        <div
          style={{
            position: "fixed",
            top: "auto",
            bottom: "2rem",
            left: "auto",
            right: "2rem",
          }}
        >
          <Tooltip title={<Typography>Do you like the changes?</Typography>}>
            <Fab
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              color="primary"
              aria-label="add"
            >
              <Feedback />
            </Fab>
          </Tooltip>
        </div>,
        display,
      )}
    </Fragment>
  )
}
