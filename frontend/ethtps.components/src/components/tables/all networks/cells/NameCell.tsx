import { TableCell, Tooltip, Typography } from '@mui/material'
import {
	ICustomCellConfiguration,
	buildClassNames,
} from './ICustomCellConfiguration'

import { centered } from '../../Cells.Types'
import { tableCellTypographyStandard } from './Typography.types'
import { useEffect } from 'react'
import { ConditionalRender } from '../../../../Types'
import * as icons from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useGetProviderColorDictionaryFromAppStore } from 'ethtps.data/dist/hooks/ColorHooks'
import React from 'react'

export function NameCell(config: ICustomCellConfiguration) {
	const colorDictionary = useGetProviderColorDictionaryFromAppStore()
	const name = config.provider?.name ?? ''
	let color: string = config.provider?.color ?? 'primary'
	useEffect(() => {
		if (colorDictionary) {
			color = colorDictionary[name]
		}
	}, [colorDictionary])
	const hasIssues =
		(config.provider?.status?.isUnreliable ?? false) &&
		(config.provider?.status?.isProbablyDown ?? false)
	const noDataProvider = config.provider?.status === undefined
	return (
		<React.Fragment>
			<Tooltip
				arrow
				placement="right"
				title={
					<Typography>{`Click to read more about ${name}`}</Typography>
				}>
				<TableCell
					{...centered}
					{...buildClassNames(config)}
					onClick={() =>
						config.clickCallback !== undefined
							? config.clickCallback(config.provider, 'Name')
							: () => {}
					}>
					<>
						<div className={'box'}>
							<Link
								to={`/Providers/${
									config.provider?.name as string
								}/Overview`}>
								<div>
									<img
										alt={`${config.provider?.name} icon`}
										src={`provider-icons/${config.provider?.name}.png`}
										className={'tiny-img inline'}
										style={{ marginRight: '15px' }}></img>
									<Typography
										className={`inline ${
											config.clickCallback !== undefined
												? 'pointable'
												: ''
										}`}
										color={color}
										{...tableCellTypographyStandard}>
										{config.provider?.name}
									</Typography>
								</div>
							</Link>
							{ConditionalRender(
								<>
									<Tooltip
										arrow
										placement="top"
										className="spaced-horizontally"
										title={
											<Typography>
												There are issues getting data
												for {config.provider?.name}
											</Typography>
										}>
										<icons.CloudOff className="inline small centered-vertically" />
									</Tooltip>
								</>,
								hasIssues && !noDataProvider
							)}
							{ConditionalRender(
								<>
									<Tooltip
										arrow
										placement="top"
										title={
											<Typography>
												There is no data provider for{' '}
												{config.provider?.name} :/
											</Typography>
										}>
										<icons.Warning className="spaced-horizontally" />
									</Tooltip>
								</>,
								noDataProvider
							)}
						</div>
					</>
				</TableCell>
			</Tooltip>
		</React.Fragment>
	)
}
