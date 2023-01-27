import { Typography } from "@mui/material"
import { useState } from "react"

interface IAnimatedTypographyConfiguration {
  child: JSX.Element | string
  animationClassName: string
  durationMs: number
  standard?: any
}

export function AnimatedTypography(config: IAnimatedTypographyConfiguration) {
  const [completed, setCompleted] = useState(false)
  /* setTimeout(() => {
    setCompleted(true)
    console.log("completed")
  }, config.durationMs)*/
  return (
    <Typography
      {...config.standard}
      className={completed ? undefined : config.animationClassName}
    >
      {config.child}
    </Typography>
  )
}
