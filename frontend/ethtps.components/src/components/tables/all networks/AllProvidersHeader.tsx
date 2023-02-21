import { TableHeader } from '../TableHeader'
import { toShortString } from '../../../Types'
import { liveDataHooks } from 'ethtps.data'
import { Fragment } from 'react'
import React from 'react'

export function AllProvidersHeader(): JSX.Element {
	const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
	const modeStr = toShortString(mode)
	return (
		<Fragment>
			{' '}
			<TableHeader
				text={['#', 'Name', modeStr, `Max recorded ${modeStr}`, 'Type']}
			/>
		</Fragment>
	)
}
