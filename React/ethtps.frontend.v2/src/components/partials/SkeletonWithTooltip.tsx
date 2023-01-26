import { Skeleton, Tooltip, Typography } from "@mui/material"
import { Fragment, PropsWithChildren } from "react"
import { lightTheme } from "../../themes/LightTheme"
import { themeProvider } from "../../services/DependenciesIOC"

export function SkeletonWithTooltip({ children, ...props }: PropsWithChildren) {
  return (
    <>
      <Fragment>
        <Tooltip title={"Loading..."}>
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
