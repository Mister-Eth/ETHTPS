import { liveDataHooks, toShortString } from 'ethtps.data'
import React from 'react'
import { TableHeader } from '../TableHeader'

export function AllProvidersHeader(): JSX.Element {
	const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
	const modeStr = toShortString(mode)
	return (
		<React.Fragment>
			{' '}
			<TableHeader
				text={['#', 'Name', modeStr, `Max recorded ${modeStr}`, 'Type']}
			/>
		</React.Fragment>
	)
}
