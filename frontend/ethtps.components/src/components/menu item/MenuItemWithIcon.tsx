import { MenuItem } from '@mui/material'
import React from 'react'
import { openNewTab } from '../../LinksHelper'
import { AnimatedLinkButtonWithIcon } from '../buttons/groups/animated/AnimatedLinkButtonWithIcon'

interface IButtonProperties {
	image: JSX.Element
	text: string
	href: string
	openInNewTab: boolean
	myKey: React.Key
	onMouseOverCapture?: () => void
}

// No animation YET
export function MenuItemWithIcon(props: IButtonProperties): JSX.Element {
	const handleClick = () => {
		if (props.openInNewTab) {
			openNewTab(props.href)
		} else {
			window.location.href = props.href
		}
	}
	return (
		<React.Fragment>
			<MenuItem
				key={props.myKey}
				onMouseOverCapture={props.onMouseOverCapture}
				onClick={handleClick}>
				<AnimatedLinkButtonWithIcon
					showText
					openInNewTab={false}
					image={props.image}
					href={props.href}
					text={props.text}
				/>
			</MenuItem>
		</React.Fragment>
	)
}
