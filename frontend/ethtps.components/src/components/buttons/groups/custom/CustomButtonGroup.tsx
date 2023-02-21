import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { ICustomButtonGroupParameters } from './ICustomButtonGroupParameters'

export function CustomButtonGroup(params: ICustomButtonGroupParameters) {
	return (
		<React.Fragment>
			<ButtonGroup
				variant="contained"
				aria-label="outlined primary button group">
				{params?.buttons?.map((x, i) => (
					<Button key={i}>{x}</Button>
				))}
			</ButtonGroup>
		</React.Fragment>
	)
}
