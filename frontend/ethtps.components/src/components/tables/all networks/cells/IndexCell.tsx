import { IconButton, TableCell } from '@mui/material'
import {
	ICustomCellConfiguration,
	buildClassNames,
} from './ICustomCellConfiguration'
import { ArrowRight } from '@mui/icons-material'
import { ConditionalRender } from '../../../../Types'
import React from 'react'

interface IIndexCellConfiguration extends ICustomCellConfiguration {
	index: number
	showTick?: boolean
}

export function IndexCell(config: IIndexCellConfiguration) {
	return (
		<React.Fragment>
			<TableCell
				{...buildClassNames(config)}
				onClick={() =>
					config.clickCallback !== undefined
						? config.clickCallback(config.provider, 'Index')
						: () => {}
				}>
				<IconButton
					children={
						<>
							{ConditionalRender(<ArrowRight />, config.showTick)}
							{config.index}
						</>
					}
					sx={{
						fontSize: '13px',
						height: '1rem',
						width: '2rem',
						fontWeight: config.showTick ? 'bold' : undefined,
					}}
				/>
			</TableCell>
		</React.Fragment>
	)
}
