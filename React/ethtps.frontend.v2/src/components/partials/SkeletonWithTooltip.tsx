import { Skeleton, Tooltip, Typography } from "@mui/material"
import { Fragment } from "react"
import { themeProvider } from "../../services/DependenciesIOC"

interface ISkeletonWithTooltipConfiguration {
  rectangular?: boolean
  text?: string
}

export function SkeletonWithTooltip(config: ISkeletonWithTooltipConfiguration) {
  const message = config.text ?? "Loading..."
  return (
    <>
      <Fragment>
        <Tooltip arrow title={<Typography>{message}</Typography>}>
          <Skeleton
            variant={config.rectangular ? "rectangular" : undefined}
            sx={{
              backgroundColor:
                themeProvider.getCurrentTheme().palette.primary.main,
              height: config.rectangular ? 50 : undefined,
            }}
          ></Skeleton>
        </Tooltip>
      </Fragment>
    </>
  )
}
