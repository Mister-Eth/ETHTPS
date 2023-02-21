import { Fragment } from 'react'
import './Spinning hourglass.css'
import { Autorenew } from '@mui/icons-material'
import React from 'react'

export function SpinningArrows() {
	return (
		<Fragment>
			<Autorenew className="rotation-animation" />
		</Fragment>
	)
}
