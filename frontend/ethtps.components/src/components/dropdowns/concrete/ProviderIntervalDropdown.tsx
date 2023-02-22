import { Typography } from '@mui/material'
import {
	shortTimeIntervalToUIFormat,
	IHandler,
	useHandler,
	IRequestHandler,
	handleException,
} from 'ethtps.data'
import {
	toShortString_2,
	fromShortString_2,
} from 'ethtps.data/dist/models/TimeIntervals'
import React from 'react'
import { Dropdown } from '../types/Dropdown'
import { IDropdownConfig } from '../types/IDropdownConfig'
import { IDropdownCallbackWithProvider } from '../types/IDropdownCallbackWithProvider'
import { useEffect } from 'react'
import { IOptionalCallback } from 'ethtps.data'

interface IProviderIntervalDropdownConfig
	extends IDropdownCallbackWithProvider<string>,
		IDropdownConfig<string> {
	loader?: IRequestHandler<void, string[]>
	availableIntervals?: IHandler<string[]>
	noDataAvailable?: IOptionalCallback<string>
}

export function ProviderIntervalDropdown(
	config: IProviderIntervalDropdownConfig
) {
	const intervals = useHandler(config.availableIntervals)
	const noDataAvailable = useHandler(config.noDataAvailable)
	config.loader
		?.dataGetter()
		.then((x) => {
			intervals?.setter(x)
		})
		.catch(handleException)
	useEffect(() => {
		if (intervals?.value?.length === 0) {
			noDataAvailable?.setter(config.provider as string)
		}
	}, [intervals?.value])
	return (
		<React.Fragment>
			<Dropdown<string>
				hidden={intervals === undefined}
				options={
					intervals?.value
						?.map((x) => toShortString_2(x))
						.concat(true ? [] : ['Custom']) ?? [] //We'll work on this later on
				}
				selection={config.changed}
				conversionFunction={(x) => fromShortString_2(x)}
				uiFormatFunction={shortTimeIntervalToUIFormat}
				hoverText={<Typography>{'Select time interval'}</Typography>}
			/>
		</React.Fragment>
	)
}
