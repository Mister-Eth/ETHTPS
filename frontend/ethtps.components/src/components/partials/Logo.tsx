import React from 'react'
import { Link } from 'react-router-dom'

export function Logo() {
	return (
		<React.Fragment>
			<Link
				style={{
					textDecoration: 'none',
				}}
				to="/">
				<br />
				<div
					className={'jumpy unselectable'}
					style={{
						fontSize: 30,
						display: 'inline',
					}}>
					ETHTPS.info
				</div>
			</Link>
		</React.Fragment>
	)
}
