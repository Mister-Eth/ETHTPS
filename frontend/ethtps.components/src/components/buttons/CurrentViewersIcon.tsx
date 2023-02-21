import { Visibility } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'

export function CurrentViewersIcon() {
	return (
		<React.Fragment>
			<Tooltip arrow title={<Typography>Nobody's here</Typography>}>
				<IconButton>
					<Visibility></Visibility>
				</IconButton>
			</Tooltip>
		</React.Fragment>
	)
}
