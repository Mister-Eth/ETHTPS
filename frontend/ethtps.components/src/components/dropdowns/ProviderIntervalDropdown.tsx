import { Dropdown } from './Dropdown'
import { IDropdownCallbackWithProvider } from './IDropdownCallbackWithProvider'
import { Typography } from '@mui/material'
import { useQuery } from 'react-query'
import { api } from '../../services/DependenciesIOC'
import { Fragment, useState, useEffect } from 'react'
import { IDropdownConfig } from './IDropdownConfig'
import { shortTimeIntervalToUIFormat } from '../../Types'
import { INoDataAvailableEvent } from '../INoDataAvailableEvent'
import { isMobile } from 'react-device-detect'
import {
	toShortString_2,
	fromShortString_2,
} from 'ethtps.data/dist/models/TimeIntervals'
import React from 'react'

interface IProviderIntervalDropdownConfig
	extends IDropdownCallbackWithProvider<string>,
		IDropdownConfig<string>,
		INoDataAvailableEvent {
	onDataLoaded?: (availableIntervals: string[]) => void
}

export function ProviderIntervalDropdown(
	config: IProviderIntervalDropdownConfig
) {
	const [intervals, setIntervals] = useState<string[]>()
	const { data, status } = useQuery(
		`${config.provider}-intervals`,
		() => api.getIntervalsWithData(config.provider as string),
		{}
	)
	useEffect(() => {
		if (status === 'success') {
			setIntervals(data)
			if (data === undefined || data.length === 0) {
				if (config.onNoDataAvailable !== undefined) {
					config.onNoDataAvailable(config.provider)
				}
			} else {
				if (config.onDataLoaded !== undefined) {
					config.onDataLoaded(data)
				}
			}
		}
	}, [data, status])
	return (
		<Fragment>
			<Dropdown<string>
				hidden={intervals === undefined}
				options={
					intervals === undefined
						? []
						: intervals
								?.map((x) => toShortString_2(x))
								.concat(true ? [] : ['Custom']) //We'll work on this later on
				}
				selectionChanged={config.selectionChanged}
				conversionFunction={(x) => fromShortString_2(x)}
				uiFormatFunction={shortTimeIntervalToUIFormat}
				hoverText={<Typography>{'Select time interval'}</Typography>}
			/>
		</Fragment>
	)
}
