import {
	ICustomCellConfiguration,
	buildClassNames,
} from './ICustomCellConfiguration'
import { TableCell } from '@mui/material'
import { tableCellTypographyStandard } from './Typography.types'
import { centered } from '../../Cells.Types'
import '../../cells.styles.css'
import { AnimatedTypography } from '../../../text/AnimatedTypography'
import { DataType } from 'ethtps.data'
import { toShortString, numberFormat } from 'ethtps.data'
import React from 'react'
import { SkeletonWithTooltip } from '../../../partials/skeletons/SkeletonWithTooltip'

interface IDataValueCellConficuration extends ICustomCellConfiguration {
	value?: number
	dataType: DataType
}

export function DataValueCell(config: IDataValueCellConficuration) {
	return (
		<React.Fragment>
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
		</React.Fragment>
	)
}
