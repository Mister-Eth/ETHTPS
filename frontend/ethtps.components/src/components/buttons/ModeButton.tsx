import React from 'react'
import { CustomButtonGroup } from './groups/custom/CustomButtonGroup'

export function ModeButton(): JSX.Element {
	return (
		<React.Fragment>
			<CustomButtonGroup {...{ buttons: ['TPS', 'GPS', 'GTPS'] }} />
		</React.Fragment>
	)
}
