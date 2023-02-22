import React from 'react'
import { ConditionalRender } from '../../../../Types'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { EvStation, LocalGasStation, Numbers } from '@mui/icons-material'
import { CurrentViewersIcon } from '../../CurrentViewersIcon'
import { DataType, useAppSelector, useHandler } from 'ethtps.data'
import { IDataModeButtonGroupConfiguration } from './IDataModeButtonGroupConfiguration'

export function DataModeButtonGroup(model: IDataModeButtonGroupConfiguration) {
	const mode = useHandler(model.modeHandle)
	const getColorComparedTo = (proposedMode: DataType) =>
		proposedMode == mode?.value ? { color: 'primary' } : undefined
	const experimentsAppStoreValue = useAppSelector(
		(state) => state.experiments
	)
	return (
		<React.Fragment>
			<Box sx={{ float: 'right' }}>
				{ConditionalRender(
					<CurrentViewersIcon />,
					experimentsAppStoreValue?.includes(5) && false
				)}
				<Tooltip
					arrow
					placement={'top'}
					{...getColorComparedTo(DataType.Tps)}
					title={<Typography>Transactions per second</Typography>}>
					<IconButton onClick={() => mode?.setter(DataType.Tps)}>
						<Numbers />
					</IconButton>
				</Tooltip>

				<Tooltip
					arrow
					placement={'top'}
					{...getColorComparedTo(DataType.Gps)}
					title={<Typography>Gas per second</Typography>}>
					<IconButton onClick={() => mode?.setter(DataType.Gps)}>
						<LocalGasStation />
					</IconButton>
				</Tooltip>

				<Tooltip
					arrow
					placement={'top'}
					{...getColorComparedTo(DataType.GasAdjustedTps)}
					title={
						<Typography>
							Gas-adjusted transactions per second
						</Typography>
					}>
					<IconButton
						onClick={() => mode?.setter(DataType.GasAdjustedTps)}>
						<EvStation />
					</IconButton>
				</Tooltip>
			</Box>
		</React.Fragment>
	)
}
