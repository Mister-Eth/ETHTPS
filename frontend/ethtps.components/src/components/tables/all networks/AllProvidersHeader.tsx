import { TableHeader } from '../TableHeader'
import { toShortString } from '../../../Types'
import { liveDataHooks } from 'ethtps.data'
import React from 'react'
import React from 'react'

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
