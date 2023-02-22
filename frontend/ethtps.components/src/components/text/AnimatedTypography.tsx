import { Typography } from '@mui/material'
import React from 'react'

interface IAnimatedTypographyConfiguration {
	child: JSX.Element | string
	animationClassName: string
	durationMs: number
	standard?: any
	centerText?: boolean
}

export function AnimatedTypography(config: IAnimatedTypographyConfiguration) {
	return (
		<React.Fragment>
			<Typography
				{...config.standard}
				className={config.animationClassName}
				key={config.child.toString()}
				textAlign={config.centerText ? 'center' : undefined}>
				{config.child}
			</Typography>
		</React.Fragment>
	)
}
