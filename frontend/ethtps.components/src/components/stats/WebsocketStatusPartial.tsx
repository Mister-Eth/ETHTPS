import { useEffect } from 'react'
import { useState } from 'react'
import { Typography } from '@mui/material'
import { MobiledataOff, SyncAlt } from '@mui/icons-material'
import { useAppSelector } from 'ethtps.data'
import React from 'react'

export function WebsocketStatusPartial() {
	const [connected, setConnected] = useState(false)
	const status = useAppSelector((state) => state.websockets.isConnected)
	useEffect(() => {
		setConnected(status)
	}, [status])
	return (
		<React.Fragment>
			<div
				style={{
					position: 'absolute',
					cursor: 'default',
					marginLeft: '1em',
					marginTop: '1em',
				}}
				className={connected ? 'disappear box' : 'appear box'}>
				{connected ? (
					<SyncAlt color={connected ? 'primary' : 'error'} />
				) : (
					<MobiledataOff color={connected ? 'primary' : 'error'} />
				)}
				<Typography
					color={connected ? 'primary' : 'error'}
					className="inline">
					{connected ? 'Connected' : 'Disconnected'}
				</Typography>
			</div>
		</React.Fragment>
	)
}
