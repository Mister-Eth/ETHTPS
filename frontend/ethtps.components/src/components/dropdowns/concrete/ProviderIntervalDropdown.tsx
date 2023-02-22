import { Typography } from '@mui/material'
import {
	shortTimeIntervalToUIFormat,
	IHandler,
	useHandler,
	IRequestHandler,
} from 'ethtps.data'
import {
	toShortString_2,
	fromShortString_2,
} from 'ethtps.data/dist/models/TimeIntervals'
import React, { useEffect, useState } from 'react'
import { Dropdown } from '../types/Dropdown'
import { IDropdownConfig } from '../types/IDropdownConfig'
import { IDropdownCallbackWithProvider } from '../types/IDropdownCallbackWithProvider'

interface IProviderIntervalDropdownConfig
	extends IDropdownCallbackWithProvider<string>,
		IDropdownConfig<string> {
	loader?: IRequestHandler<void, string[]>
	availableIntervals?: IHandler<string[]>
	noDataAvailable?: IHandler<string>
}

export function ProviderIntervalDropdown(
	config: IProviderIntervalDropdownConfig
) {
	const intervals = useHandler(config.availableIntervals)
	const noDataAvailable = useHandler(config.noDataAvailable)
	config.loader?.refetchFunction()
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
