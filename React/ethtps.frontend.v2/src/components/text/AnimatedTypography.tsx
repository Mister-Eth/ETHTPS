import { Typography } from "@mui/material"
import { useState, useEffect } from "react"

interface IAnimatedTypographyConfiguration {
  child: JSX.Element | string
  animationClassName: string
  durationMs: number
  standard?: any
  centerText?: boolean
}

export function AnimatedTypography(config: IAnimatedTypographyConfiguration) {
  return (
    <Typography
      {...config.standard}
      className={config.animationClassName}
      key={config.child.toString()}
      textAlign={config.centerText ? "center" : undefined}
    >
      {config.child}
    </Typography>
  )
}
