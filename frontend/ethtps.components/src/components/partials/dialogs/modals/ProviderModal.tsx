import { Alert, AlertTitle, Box, Modal, Paper } from '@mui/material'
import { ProviderDataChart } from '../../../charts/provider/ProviderDataChart'
import { ConditionalRender } from '../../../../Types'
import { INoDataAvailableEvent } from '../../../INoDataAvailableEvent'
import { useState } from 'react'
import React from 'react'
import { ProviderModel } from 'ethtps.data'
import { createHandlerFromCallback, IOptionalCallback } from 'ethtps.data'

interface IProviderModalConfiguration extends INoDataAvailableEvent {
	open: boolean
	provider?: ProviderModel
	onClose: () => void
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	bgcolor: 'background.paper',
	border: '2px line #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
}

const generateNoDataAvailableString = (provider?: string) =>
	`There is no data available for ${provider}. If you're seeing this, it probably means there is no chain explorer integration available for ${provider} or that we haven't yet synchronized the data for ${provider} after the update. Please try again later. If you still don't see any data after a while, drop us a message on `

export function ProviderModal(config: IProviderModalConfiguration) {
	const [noData, setNoData] = useState(false)
	const noDataHandler = createHandlerFromCallback((newValue?: string) => {
		setNoData(true)
		console.debug('No data available for ' + newValue)
	})

	return (
		<React.Fragment>
			<Modal
				keepMounted={false}
				open={config.open}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
				onClose={() => {
					setNoData(false)
					config.onClose()
				}}>
				<Box sx={{ ...style }}>
					<Paper elevation={1}>
						<Paper elevation={2}>
							{ConditionalRender(
								<ProviderDataChart
									onNoDataAvailable={
										noDataHandler as IOptionalCallback<
											string | undefined
										>
									}
									provider={{
										provider: config.provider
											?.name as string,
									}}
								/>,
								config.provider !== undefined
							)}
						</Paper>
						{ConditionalRender(
							<>
								<Alert severity="warning">
									<AlertTitle>No data available</AlertTitle>
									{generateNoDataAvailableString(
										config.provider?.name ?? ''
									)}
									<a href="https://discord.com/invite/jWPcsTzpCT">
										Discord
									</a>
									.
									<br />
									<a href="https://github.com/Mister-Eth/ETHTPS/tree/dev/ETHTPS.API/ETHTPS.Services.Ethereum">
										See a list of available integrations
										here
									</a>
									.
								</Alert>
							</>,
							noData
						)}
					</Paper>
				</Box>
			</Modal>
		</React.Fragment>
	)
}
