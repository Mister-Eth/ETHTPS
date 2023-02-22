import { shortTimeIntervalToUIFormat } from 'ethtps.data'
import {
	toShortString_2,
	fromShortString_2,
} from 'ethtps.data/dist/models/TimeIntervals'
import React from 'react'
import { IHandler } from 'ethtps.data'
import { Container } from '@mui/system'
import { Typography } from '@mui/material'
import { Dropdown } from '../types/Dropdown'

interface IIntervalDropdownProperties {
	changed?: IHandler<string>
}

export function IntervalDropdown(config: IIntervalDropdownProperties) {
	const intervals = [
		'OneMinute',
		'OneHour',
		'OneDay',
		'OneWeek',
		'OneMonth',
		'OneYear',
		'All',
		'Custom',
	]
	return (
		<React.Fragment>
			<Container
				sx={{
					borderThickness: '1px',
					borderColor: 'primary',
					borderBlockColor: 'primary',
				}}>
				<div className="inline" style={{ float: 'right' }}>
					<Dropdown<string>
						options={intervals?.map((x) => toShortString_2(x))}
						selection={config.changed}
						conversionFunction={(x) => fromShortString_2(x)}
						uiFormatFunction={shortTimeIntervalToUIFormat}
						hoverText={
							<Typography>{'Select time interval'}</Typography>
						}
					/>
				</div>
			</Container>
		</React.Fragment>
	)
}
