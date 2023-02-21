import { Fragment, useState } from 'react'
import { ConditionalRender } from '../../Types'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { EvStation, LocalGasStation, Numbers } from '@mui/icons-material'
import { CurrentViewersIcon } from './CurrentViewersIcon'
import { DataType, useAppSelector } from 'ethtps.data'
import React from 'react'

interface IDataModeButtonGroupConfiguration {
	modeChanged: (mode: DataType) => void
}

export function DataModeButtonGroup(model: IDataModeButtonGroupConfiguration) {
	const [mode, setMode] = useState<DataType>(DataType.Tps)
	const getColorComparedTo = (proposedMode: DataType) =>
		proposedMode == mode ? { color: 'primary' } : undefined
	const triggerChange = (mode: DataType) => {
		setMode(mode)
		model.modeChanged(mode)
	}
	const experimentsAppStoreValue = useAppSelector(
		(state) => state.experiments
	)
	return (
		<Fragment>
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
					<IconButton onClick={() => triggerChange(DataType.Tps)}>
						<Numbers />
					</IconButton>
				</Tooltip>

				<Tooltip
					arrow
					placement={'top'}
					{...getColorComparedTo(DataType.Gps)}
					title={<Typography>Gas per second</Typography>}>
					<IconButton onClick={() => triggerChange(DataType.Gps)}>
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
						onClick={() => triggerChange(DataType.GasAdjustedTps)}>
						<EvStation />
					</IconButton>
				</Tooltip>
			</Box>
		</Fragment>
	)
}
