import { Typography } from '@mui/material'
import { DataType } from 'ethtps.data'
import React from 'react'
import { IDropdownConfig } from '../types/IDropdownConfig'
import { Dropdown } from '../types/Dropdown'
import { appModeToUIFormat, fromShortString } from 'ethtps.data'

export function ModeDropdown(config: IDropdownConfig<DataType>) {
	const types = ['TPS', 'GPS', 'GTPS']
	return (
		<React.Fragment>
			<Dropdown<DataType>
				options={types}
				hidden={config.hidden}
				selection={config.changed}
				conversionFunction={fromShortString}
				uiFormatFunction={appModeToUIFormat}
				hoverText={<Typography>{'Select data type'}</Typography>}
			/>
		</React.Fragment>
	)
}
