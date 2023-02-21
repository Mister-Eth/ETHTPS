import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useState } from 'react'
import { ISeeMoreButtonProps } from './ISeeMoreButtonProps'
import React from 'react'

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
		<React.Fragment>
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
		</React.Fragment>
	)
}
