import { Visibility } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { Fragment } from 'react'

export function CurrentViewersIcon() {
	return (
		<Fragment>
			<Tooltip arrow title={<Typography>Nobody's here</Typography>}>
				<IconButton>
					<Visibility></Visibility>
				</IconButton>
			</Tooltip>
		</Fragment>
	)
}
