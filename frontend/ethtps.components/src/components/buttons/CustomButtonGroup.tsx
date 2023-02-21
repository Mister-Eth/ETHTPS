import { Button, ButtonGroup } from '@mui/material'
import React from 'react'
import { Fragment } from 'react'

interface ICustomButtonGroupParameters {
	buttons?: string[]
}

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
