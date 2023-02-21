import { Skeleton, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { ConditionalRender } from '../../../Types'
import { Box } from '@mui/system'
import { ISkeletonWithTooltipConfiguration } from './ISkeletonWithTooltipConfiguration'
import React from 'react'

export function SkeletonWithTooltip(config: ISkeletonWithTooltipConfiguration) {
	const message = config.text ?? 'Loading...'
	const [delay, setDelay] = useState(config.randomDelay)
	if (config.randomDelay !== undefined) {
		if (config.randomDelay === true) {
			setTimeout(() => setDelay(false), Math.random() * 250)
		}
	}
	return (
		<>
			<React.Fragment>
				{ConditionalRender(
					<Tooltip arrow title={<Typography>{message}</Typography>}>
						<Box sx={{ width: '90%' }}>
							<Skeleton
								className={'w-hundred'}
								variant={
									config.rectangular
										? 'rectangular'
										: undefined
								}></Skeleton>
						</Box>
					</Tooltip>,
					!delay
				)}
			</React.Fragment>
		</>
	)
}
