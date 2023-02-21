import { Button, ButtonGroup } from '@mui/material'
import { Fragment } from 'react'
import { ICustomButtonGroupParameters } from './ICustomButtonGroupParameters'
import React from 'react'

export function CustomButtonGroup(params: ICustomButtonGroupParameters) {
	return (
		<Fragment>
			<ButtonGroup
				variant="contained"
				aria-label="outlined primary button group">
				{params?.buttons?.map((x, i) => (
					<Button key={i}>{x}</Button>
				))}
			</ButtonGroup>
		</Fragment>
	)
}
