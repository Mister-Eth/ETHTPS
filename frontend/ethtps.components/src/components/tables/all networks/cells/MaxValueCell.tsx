import { Typography, TableCell, Tooltip } from '@mui/material'
import { DataPoint } from 'ethtps.data'
import { numberFormat, liveDataHooks } from 'ethtps.data'
import { useGetMaxDataForProviderFromAppStore } from 'ethtps.data/dist/hooks/DataHooks'
import moment from 'moment'
import React from 'react'
import { centered } from '../../Cells.Types'
import {
	ICustomCellConfiguration,
	buildClassNames,
} from './ICustomCellConfiguration'
import { tableCellTypographyStandard } from './Typography.types'

function generateMaxHoverMessage(data?: DataPoint): string {
	if (
		data === undefined ||
		(data?.blockNumber === undefined && data?.date === undefined) ||
		data?.blockNumber === 0 ||
		moment(data?.date).year() === undefined ||
		moment(data?.date).year() === 1
	) {
		return ''
	}

	if (data?.blockNumber !== undefined && data?.blockNumber !== 0) {
		return `Seen at block ${numberFormat(
			data?.blockNumber ?? 0
		).toString()}`
	}

	return `Seen ${moment(data?.date)}`
}

function generateMaxTypography(data?: DataPoint) {
	const message = generateMaxHoverMessage(data)
	return message?.length > 0 ? <Typography>{message}</Typography> : undefined
}

export function MaxValueCell(config: ICustomCellConfiguration) {
	const type = liveDataHooks.useGetLiveDataModeFromAppStore()
	const maxData = useGetMaxDataForProviderFromAppStore(
		config.provider?.name as string,
		type
	)
	const tooltipTypography = generateMaxTypography(maxData)
	return (
		<React.Fragment>
			<TableCell
				{...centered}
				{...buildClassNames(config)}
				onClick={() =>
					config.clickCallback !== undefined
						? config.clickCallback(config.provider, 'MaxValue')
						: () => {}
				}>
				<Tooltip arrow placement="top-start" title={tooltipTypography}>
					<Typography
						{...tableCellTypographyStandard}
						sx={{
							textDecoration:
								tooltipTypography !== undefined
									? 'underline'
									: undefined,
						}}>
						{numberFormat(maxData?.value).toString()}
					</Typography>
				</Tooltip>
			</TableCell>
		</React.Fragment>
	)
}
