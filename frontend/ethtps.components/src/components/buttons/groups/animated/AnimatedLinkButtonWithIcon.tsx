import { IconButton, Tooltip, Typography } from '@mui/material'
import { openNewTab } from '../../../../LinksHelper'
import { IAnimatedLinkButtonWithIconProperties } from './IAnimatedLinkButtonWithIconProperties'
import React from 'react'

// No animation YET
export function AnimatedLinkButtonWithIcon(
	props: IAnimatedLinkButtonWithIconProperties
): JSX.Element {
	const handleClick = () => {
		if (props.openInNewTab) {
			openNewTab(props.href)
		} else {
			window.location.href = props.href
		}
	}
	return (
		<React.Fragment>
			<Tooltip arrow title={<Typography>{props.text}</Typography>}>
				<IconButton onClick={handleClick} color={'primary'}>
					{props.image}
				</IconButton>
			</Tooltip>
			{props.showText ? <Typography>{props.text}</Typography> : <></>}
		</React.Fragment>
	)
}
