import { Grain, Home, Whatshot } from '@mui/icons-material'
import { Breadcrumbs, Link, Paper, Typography } from '@mui/material'
import React from 'react'

export function LocationBreadcrumb() {
	return (
		<React.Fragment>
			<Paper elevation={1}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link
						underline="hover"
						sx={{ display: 'flex', alignItems: 'center' }}
						color="primary"
						href="/">
						<Home sx={{ mr: 0.5 }} fontSize="inherit" />
						MUI
					</Link>
					<Link
						underline="hover"
						sx={{ display: 'flex', alignItems: 'center' }}
						color="primary"
						href="/material-ui/getting-started/installation/">
						<Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
						Core
					</Link>
					<Typography
						sx={{ display: 'flex', alignItems: 'center' }}
						color="text.primary">
						<Grain sx={{ mr: 0.5 }} fontSize="inherit" />
						Breadcrumb
					</Typography>
				</Breadcrumbs>
			</Paper>
		</React.Fragment>
	)
}
