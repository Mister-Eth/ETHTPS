import { Typography } from '@mui/material'
import { useGetNetworksFromAppStore } from 'ethtps.data/dist/hooks/DataHooks'
import React from 'react'
import { Dropdown } from '../types/Dropdown'
import { IDropdownConfig } from '../types/IDropdownConfig'

export function NetworksDropdown(config: IDropdownConfig<string>) {
	const networks = useGetNetworksFromAppStore()
	return (
		<React.Fragment>
			<Dropdown<string>
				hidden={config.hidden}
				options={networks}
				hoverText={<Typography>{'Choose network'}</Typography>}
				conversionFunction={(x) => x}
				selection={config.changed}
			/>
		</React.Fragment>
	)
}
