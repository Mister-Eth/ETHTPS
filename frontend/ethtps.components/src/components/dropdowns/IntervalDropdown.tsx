import { Container, Typography } from '@mui/material'
import { shortTimeIntervalToUIFormat } from '../../Types'
import { Dropdown } from './Dropdown'
import {
	toShortString_2,
	fromShortString_2,
} from 'ethtps.data/dist/models/TimeIntervals'
import React, { Fragment } from 'react'

interface IIntervalDropdownProperties {
	onChanged?: (value: string) => void
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
		<Fragment>
			<Container
				sx={{
					borderThickness: '1px',
					borderColor: 'primary',
					borderBlockColor: 'primary',
				}}>
				<div className="inline" style={{ float: 'right' }}>
					<Dropdown<string>
						options={intervals?.map((x) => toShortString_2(x))}
						selectionChanged={config.onChanged}
						conversionFunction={(x) => fromShortString_2(x)}
						uiFormatFunction={shortTimeIntervalToUIFormat}
						hoverText={
							<Typography>{'Select time interval'}</Typography>
						}
					/>
				</div>
			</Container>
		</Fragment>
	)
}
