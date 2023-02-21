import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useState, Fragment } from 'react'

interface ISeeMoreButtonProps {
	onSeeMore?: () => void
	onSeeLess?: () => void
	enabled: boolean
}

export function SeeMoreButton(events: ISeeMoreButtonProps) {
	const [expand, setExpand] = useState(true)
	const onClick = () => {
		if (expand) {
			if (events.onSeeMore !== undefined) {
				events.onSeeMore()
			}
		} else {
			if (events.onSeeLess !== undefined) {
				events.onSeeLess()
			}
		}
		setExpand(!expand)
	}
	const getIcon = () => (expand ? <ArrowDownward /> : <ArrowUpward />)
	return (
		<Fragment>
			<Button
				disabled={!events.enabled}
				variant="text"
				sx={{
					width: '100%',
				}}
				startIcon={getIcon()}
				endIcon={getIcon()}
				onClick={() => onClick()}>
				See {expand ? 'more' : 'less'}
			</Button>
		</Fragment>
	)
}
