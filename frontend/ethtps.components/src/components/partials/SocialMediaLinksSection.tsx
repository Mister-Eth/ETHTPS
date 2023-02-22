import { ButtonGroup } from '@mui/material'
import { GitHub, Twitter } from '@mui/icons-material'
import { DiscordIcon } from '../icons/DiscordIcon'
import React from 'react'
import { AnimatedLinkButtonWithIcon } from '../buttons/groups/animated/AnimatedLinkButtonWithIcon'

export function SocialMediaLinksSection(): JSX.Element {
	return (
		<React.Fragment>
			<ButtonGroup sx={{ float: 'right' }}>
				<AnimatedLinkButtonWithIcon
					openInNewTab
					image={<GitHub />}
					href={'https://github.com/Mister-Eth/ETHTPS'}
					text={'Github repository'}
				/>
				<AnimatedLinkButtonWithIcon
					openInNewTab
					image={<Twitter />}
					href={'https://twitter.com/ethtps'}
					text={'Twitter'}
				/>
				<AnimatedLinkButtonWithIcon
					openInNewTab
					image={<DiscordIcon />}
					href={'https://discord.gg/jWPcsTzpCT'}
					text={'Join our Discord'}
				/>
			</ButtonGroup>
		</React.Fragment>
	)
}
