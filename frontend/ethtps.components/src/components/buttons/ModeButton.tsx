import { Fragment } from 'react'
import { CustomButtonGroup } from './groups/custom/CustomButtonGroup'

export function ModeButton(): JSX.Element {
	return (
		<Fragment>
			<CustomButtonGroup {...{ buttons: ['TPS', 'GPS', 'GTPS'] }} />
		</Fragment>
	)
}
