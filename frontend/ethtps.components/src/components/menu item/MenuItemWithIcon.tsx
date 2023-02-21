import { MenuItem } from '@mui/material'
import { AnimatedButtonWithIcon } from '../buttons/AnimatedButtonWithIcon'
import React from 'react'
import { openNewTab } from '../../LinksHelper'
import Fragment from 'react'

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
		<Fragment>
			<MenuItem
				key={props.myKey}
				onMouseOverCapture={props.onMouseOverCapture}
				onClick={handleClick}>
				<AnimatedButtonWithIcon
					showText
					openInNewTab={false}
					image={props.image}
					href={props.href}
					text={props.text}
				/>
			</MenuItem>
		</Fragment>
	)
}
