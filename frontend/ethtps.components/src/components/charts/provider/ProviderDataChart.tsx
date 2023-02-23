import { DoNotDisturbAlt } from '@mui/icons-material'
import { Paper, Chip, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { DataType, DatedXYDataPoint } from 'ethtps.data'
import React, { useState, useEffect, useRef } from 'react'
import { DataModeButtonGroup } from '../../buttons/groups/data-mode-group/DataModeButtonGroup'
import { DateRangeSelectorDropdown } from '../../dropdowns/concrete/DateRangeSelectorDropdown'
import { SpinningArrows } from '../../icons/spinning hourglass/SpinningArrows'
import { BrushChart } from '../brush/BrushChart'
import { IChartConfigurationModel } from '../IChartConfigurationModel'
import { useHandler, IOptionalCallback } from 'ethtps.data'
import { useQuery } from 'react-query'
import { ProviderIntervalDropdown } from '../../dropdowns/concrete/ProviderIntervalDropdown'
import { NetworksDropdown } from '../../dropdowns/concrete/NetworksDropdown'
import { ConditionalRender } from '../../../Types'

export function ProviderDataChart(config: IChartConfigurationModel) {
	const displayNetworksDropdown =
		false && config.provider?.provider?.toUpperCase() === 'ETHEREUM'
	const intervalHandler = useHandler<string>(config.interval)
	const modeHandler = useHandler<DataType>(config.mode)
	const networkHandler = useHandler<string>(config.network)
	const [noData, setNoData] = useState(false)
	const [usesDatePicker] = useState(false)
	const [points, setPoints] = useState<DatedXYDataPoint[]>([])

	useQuery(`${config.provider} ${config.mode} ${config.interval} data`, () =>
		config.request?.refetchFunction()
	)

	useEffect(() => {
		if (config.request?.fetchInfo?.isSuccess) {
			if (config.data) {
				if (config.data?.data)
					setPoints(
						config.data?.data?.dataPoints
							?.filter((x: DatedXYDataPoint) => x !== undefined)
							?.map(
								(x: DatedXYDataPoint) =>
									(x ?? {
										x: new Date(),
										y: 0,
									}) as DatedXYDataPoint
							) ?? []
					)
			}
			setNoData(false)
		}
	}, [config.data])

	useEffect(() => {
		if (!config.request?.fetchInfo?.isSuccess) {
			config.request?.refetchFunction()
		}
	}, [config.request?.fetchInfo?.isSuccess])

	useEffect(() => {
		config.request?.refetchFunction()
	}, [intervalHandler?.value, networkHandler?.value, modeHandler?.value])
	const [containerWidth, setContainerWidth] = useState(0)
	const containerRef = useRef<any>(null)
	useEffect(() => {
		setContainerWidth(
			containerRef.current ? containerRef.current.offsetWidth : 0
		)
	}, [containerRef.current])
	return (
		<React.Fragment>
			<Container
				sx={{
					borderThickness: '1px',
					borderColor: 'primary',
					borderBlockColor: 'primary',
				}}>
				<Paper
					elevation={1}
					sx={{ display: noData ? 'none' : undefined }}>
					{displayNetworksDropdown ? (
						<NetworksDropdown
							changed={
								networkHandler as IOptionalCallback<
									string | undefined
								>
							}
						/>
					) : (
						<></>
					)}
					{ConditionalRender(
						<DateRangeSelectorDropdown hidden={!usesDatePicker} />,
						usesDatePicker
					)}
					<div style={{ float: 'right' }}>
						<ProviderIntervalDropdown
							hidden={noData}
							noDataAvailable={config.onNoDataAvailable}
							changed={
								config.interval
									?.callback as IOptionalCallback<string>
							}
							provider={config.provider?.provider}
						/>
						<DataModeButtonGroup
							modeHandle={modeHandler?.convertToIHandler()}
						/>
					</div>
				</Paper>
				<br />
				<Paper elevation={1}>
					<div className="parent" ref={containerRef}>
						<BrushChart
							dataPoints={points}
							width={containerWidth}
							height={containerWidth / 1.4142}
						/>
						{ConditionalRender(
							<Chip
								label={
									<Typography sx={{ fontWeight: 'bold' }}>
										Loading...
									</Typography>
								}
								color="primary"
								className="appear-delayed child"
								avatar={<SpinningArrows />}
								variant="filled"
							/>,
							config.request?.fetchInfo?.isFetching
						)}
						{ConditionalRender(
							<Chip
								className="appear child"
								label="No data available"
								avatar={<DoNotDisturbAlt />}
								variant="filled"
								style={{ opacity: '100%' }}
							/>,
							noData && !config.request?.fetchInfo?.isFetching
						)}
					</div>
				</Paper>
			</Container>
		</React.Fragment>
	)
}
