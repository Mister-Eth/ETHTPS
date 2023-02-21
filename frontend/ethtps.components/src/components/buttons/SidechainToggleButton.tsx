import { Link, LinkOff } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { setIncludeSidechains } from 'ethtps.data/dist/slices/LiveDataSlice'
import { Fragment, useState } from 'react'
import { store } from 'ethtps.data'
import React from 'react'

interface ISidechainToggleButtonConfiguration {
	toggled?: (on: boolean) => void
	defaultIncluded?: boolean
}

export function SidechainToggleButton(
	config: ISidechainToggleButtonConfiguration
) {
	const [on, setOn] = useState(config.defaultIncluded)
	const toggle = () => {
		if (config.toggled) {
			config.toggled(!on)
			store.dispatch(setIncludeSidechains(!on))
		}
		setOn(!on)
	}
	return (
		<Fragment>
			<Tooltip
				arrow
				title={
					<Typography>
						Sidechains are {on ? 'included' : 'excluded'}. Click to
						{on ? 'exclude' : 'include'}
					</Typography>
				}>
				<IconButton onClick={toggle}>
					{on ? <Link color="primary" /> : <LinkOff />}
				</IconButton>
			</Tooltip>
		</Fragment>
	)
}
