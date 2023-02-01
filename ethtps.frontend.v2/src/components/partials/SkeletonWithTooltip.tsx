import { Skeleton, Tooltip, Typography } from "@mui/material"
import { Fragment } from "react"
import { themeProvider } from "../../services/DependenciesIOC"
import { useState } from "react"
import { ConditionalRender } from "../../Types"

interface ISkeletonWithTooltipConfiguration {
  rectangular?: boolean
  text?: string
  randomDelay?: boolean
}

export function SkeletonWithTooltip(config: ISkeletonWithTooltipConfiguration) {
  const message = config.text ?? "Loading..."
  const [delay, setDelay] = useState(config.randomDelay)
  if (config.randomDelay !== undefined) {
    if (config.randomDelay === true) {
      setTimeout(() => setDelay(false), Math.random() * 250)
    }
  }
  return (
    <>
      <Fragment>
        {ConditionalRender(
          <Tooltip arrow title={<Typography>{message}</Typography>}>
            <Skeleton
              variant={config.rectangular ? "rectangular" : undefined}
              sx={{
                backgroundColor:
                  themeProvider.getCurrentTheme().palette.primary.main,
                height: config.rectangular ? 50 : undefined,
              }}
            ></Skeleton>
          </Tooltip>,
          !delay,
        )}
      </Fragment>
    </>
  )
}
