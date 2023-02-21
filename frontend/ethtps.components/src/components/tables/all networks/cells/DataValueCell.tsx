import {
	ICustomCellConfiguration,
	buildClassNames,
} from './ICustomCellConfiguration'
import { SkeletonWithTooltip } from '../../../partials/SkeletonWithTooltip'
import { TableCell } from '@mui/material'
import { tableCellTypographyStandard } from './Typography.types'
import { centered } from '../../Cells.Types'
import '../../cells.styles.css'
import { AnimatedTypography } from '../../../text/AnimatedTypography'
import { DataType } from 'ethtps.api.client'
import { toShortString, numberFormat } from '../../../../Types'
import React, { Fragment } from 'react'

interface IDataValueCellConficuration extends ICustomCellConfiguration {
	value?: number
	dataType: DataType
}

export function DataValueCell(config: IDataValueCellConficuration) {
	return (
		<Fragment>
			<TableCell
				{...centered}
				{...buildClassNames(config)}
				onClick={() =>
					config.clickCallback !== undefined
						? config.clickCallback(config.provider, 'DataValue')
						: () => {}
				}>
				{config.value === undefined ? (
					<SkeletonWithTooltip
						text={`Loading ${config.provider?.name} ${toShortString(
							config.dataType
						)}...`}
					/>
				) : (
					<AnimatedTypography
						animationClassName="animated-cell"
						standard={tableCellTypographyStandard}
						child={numberFormat(config.value).toString()}
						durationMs={1000}
					/>
				)}
			</TableCell>
		</Fragment>
	)
}
