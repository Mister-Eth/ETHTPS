import React, { Fragment } from 'react'
import { CustomButtonGroup } from './CustomButtonGroup'

export function ModeButton(): JSX.Element {
	return (
		<Fragment>
			<CustomButtonGroup {...{ buttons: ['TPS', 'GPS', 'GTPS'] }} />
		</Fragment>
	)
}
