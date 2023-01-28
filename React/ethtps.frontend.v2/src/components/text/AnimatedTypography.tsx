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
  return (
    <Typography
      {...config.standard}
      onAnimationEnd={() => {
        setCompleted(true)
      }}
      className={completed ? undefined : config.animationClassName}
    >
      {config.child}
    </Typography>
  )
}
