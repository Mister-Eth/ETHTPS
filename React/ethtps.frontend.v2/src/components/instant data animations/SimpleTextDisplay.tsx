import { Fragment } from "react"
import { useLiveData } from "./hooks"
import { Box, Typography, Tooltip } from "@mui/material"
import { ConditionalSkeletonRender, numberFormat } from "../../Types"
import { tableCellTypographyStandard } from "../tables/all networks/cells/Typography.types"
import { AnimatedTypography } from "../text/AnimatedTypography"

export function SimpleTextDisplay() {
  const liveData = useLiveData()
  return (
    <Fragment>
      {ConditionalSkeletonRender(
        <Box>
          <AnimatedTypography
            animationClassName="animated-cell"
            standard={tableCellTypographyStandard}
            durationMs={750}
            centerText
            child={`Ethereum ${
              liveData?.sidechainsIncluded ? "and its sidechains are" : "is"
            } doing ${numberFormat(liveData?.total)} ${liveData?.mode}`}
          ></AnimatedTypography>
          <Typography
            sx={{
              fontSize: "0.6em",
            }}
            textAlign={"right"}
          >
            Animations coming soon
          </Typography>
        </Box>,
        liveData !== undefined,
      )}
    </Fragment>
  )
}
