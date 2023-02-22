import { TableRow, TableCell } from '@mui/material'
import { centered } from './Cells.Types'
import { Typography } from '@mui/material/'
import { tableHeaderCellTypography } from './all networks/cells/Typography.types'
import React from 'react'

interface ITableHeaderParams {
	text?: string[]
}

export function TableHeader(params: ITableHeaderParams): JSX.Element {
	return (
		<React.Fragment>
			<TableRow>
				{params.text?.map((x, i) => (
					<TableCell
						sx={{ fontWeight: 'bold' }}
						key={i}
						{...centered}>
						<Typography {...tableHeaderCellTypography}>
							{' '}
							{x}
						</Typography>
					</TableCell>
				))}
			</TableRow>
		</React.Fragment>
	)
}
