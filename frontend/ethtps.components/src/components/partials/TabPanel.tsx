import { Box, Typography } from '@mui/material'
import { TabPanelProps } from '../tab panel/TabPanel'
import React from 'react'

export function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props
	return (
		<React.Fragment>
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		</React.Fragment>
	)
}
