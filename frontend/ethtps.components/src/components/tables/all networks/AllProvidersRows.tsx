import { TableCell, TableRow } from '@mui/material'
import { range } from 'd3-array'
import {
	IProviderTableModel,
	extractData,
	getModeData,
	liveDataHooks,
} from 'ethtps.data'
import React, { useEffect, useState } from 'react'
import { IndexCell } from './cells/IndexCell'
import { NameCell } from './cells/NameCell'
import { DataValueCell } from './cells/DataValueCell'
import { MaxValueCell } from './cells/MaxValueCell'
import { ProviderTypeCell } from './cells/ProviderTypeCell'
import { SkeletonWithTooltip } from '../../partials/skeletons/SkeletonWithTooltip'

export function AllProvidersRows(model: IProviderTableModel): JSX.Element {
	const hasData = (model.providerData?.length as number) > 0
	const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
	const liveData = liveDataHooks.useGetLiveDataFromAppStore()
	const [data, setData] = useState(getModeData(liveData ?? {}, mode))
	useEffect(() => {
		setData(getModeData(liveData ?? {}, mode))
	}, [mode, liveData])
	return (
		<React.Fragment>
			{hasData ? (
				<>
					{model.providerData
						?.slice(
							0,
							Math.min(
								model.providerData?.length,
								model.maxRowsBeforeShowingExpand as number
							)
						)
						?.map((x, i) => (
							<TableRow key={i}>
								<IndexCell
									clickCallback={model.clickCallback}
									index={i + 1}
								/>
								<NameCell
									clickCallback={model.clickCallback}
									provider={x}
								/>
								<DataValueCell
									clickCallback={model.clickCallback}
									provider={x}
									dataType={mode}
									value={extractData(data, x.name)}
								/>
								<MaxValueCell
									clickCallback={model.clickCallback}
									provider={x}
								/>
								<ProviderTypeCell
									clickCallback={model.clickCallback}
									provider={x}
								/>
							</TableRow>
						))}
				</>
			) : (
				range(0, 4 + 1).map((y) => {
					return (
						<TableRow key={y}>
							{range(0, 5).map((x) => (
								<TableCell key={x}>
									<SkeletonWithTooltip
										randomDelay
										rectangular={false}
									/>
								</TableCell>
							))}
						</TableRow>
					)
				})
			)}
		</React.Fragment>
	)
}
