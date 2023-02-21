import { TableCell, Typography } from '@mui/material'
import {
	ICustomCellConfiguration,
	buildClassNames,
} from './ICustomCellConfiguration'
import React from 'react'
import { centered } from '../../Cells.Types'
import { tableCellTypographyStandard } from './Typography.types'
import { useGetProviderTypeColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks'

export function ProviderTypeCell(config: ICustomCellConfiguration) {
	const colorDictionary = useGetProviderTypeColorDictionaryFromAppStore()
	const name = config.provider?.type ?? ''
	const color: string =
		colorDictionary !== undefined ? colorDictionary[name] : 'primary'
	return (
		<React.Fragment>
			<TableCell
				{...centered}
				{...buildClassNames(config)}
				sx={{ color: color }}
				onClick={() =>
					config.clickCallback !== undefined
						? config.clickCallback(config.provider, 'ProviderType')
						: () => {}
				}>
				<Typography {...tableCellTypographyStandard}>
					{config.provider?.type}
				</Typography>
			</TableCell>
		</React.Fragment>
	)
}
