import { Typography } from '@mui/material'
import { IObjectWithProvider, inline, uniform } from 'ethtps.data'
import React from 'react'

interface ILargeProviderHeaderConfiguration extends IObjectWithProvider {}

export function LargeProviderHeader(config: ILargeProviderHeaderConfiguration) {
	return (
		<React.Fragment>
			<div className={'box'} style={{ float: 'left' }}>
				<img
					alt={`${config.provider?.name} image`}
					src={`/provider-icons/${config.provider?.name}.png`}
					{...inline}
					{...uniform('2em')}></img>
				<Typography
					{...inline}
					sx={{
						fontWeight: 'bold',
						fontSize: '2em',
						marginLeft: '0.2em',
					}}>
					{config.provider?.name}
				</Typography>
			</div>
		</React.Fragment>
	)
}
