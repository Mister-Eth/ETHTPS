import { Skeleton, Tooltip, Typography } from "@mui/material"
import { Fragment, PropsWithChildren } from "react"
import { themeProvider } from "../../services/DependenciesIOC"

export function SkeletonWithTooltip({ children, ...props }: PropsWithChildren) {
  return (
    <>
      <Fragment>
        <Tooltip title={<Typography>{"Loading..."}</Typography>}>
          <Skeleton
            sx={{
              backgroundColor:
                themeProvider.getCurrentTheme().palette.primary.main,
            }}
          ></Skeleton>
        </Tooltip>
      </Fragment>
    </>
  )
}
