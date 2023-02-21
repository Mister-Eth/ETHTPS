import React from 'react'
import { Link } from 'react-router-dom'
import Fragment from 'react'

export function Logo() {
	return (
		<Fragment>
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
		</Fragment>
	)
}
