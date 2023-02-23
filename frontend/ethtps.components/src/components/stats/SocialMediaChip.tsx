import { Web } from '@mui/icons-material'
import { Chip, Link, Typography } from '@mui/material'
import React from 'react'
import { groupBy, WithObjectType } from 'groupby-js'
import { IProviderExternalWebsite } from 'ethtps.data'

interface ISocialMediaChipConfiguration {
	href?: string | null
	websiteName?: string | null
}

const getIconForWebsite = (website: string) => {
	switch (website.toUpperCase()) {
		default:
			return <Web />
	}
}

const formatUrl = (url: string | undefined | null) => {
	if (!url?.startsWith('http://')) url = 'http://' + url
	return url
}

export function SocialMediaChipCollection(config: {
	links?: IProviderExternalWebsite[] | undefined
}) {
	const links = groupBy<IProviderExternalWebsite, WithObjectType>(
		'category',
		config.links as IProviderExternalWebsite[]
	)
	if (links === undefined || links.length === 0)
		return (
			<React.Fragment>
				<Chip
					className="spaced-vertically"
					label={
						<Typography
							sx={{
								fontWeight: 'bold',
								fontSize: '1.25em',
							}}>
							No data available
						</Typography>
					}
					variant="outlined"
					color="primary"
				/>
			</React.Fragment>
		)

	return (
		<React.Fragment>
			{links.flatMap((group, i) => {
				return (
					<React.Fragment key={i}>
						<Chip
							label={
								<Typography
									sx={{
										fontWeight: 'bold',
									}}>
									{group.title}
								</Typography>
							}
						/>
						{group.items.map((x, i) => (
							<SocialMediaChip
								key={i}
								href={x.url}
								websiteName={x.name}
							/>
						))}
					</React.Fragment>
				)
			})}
		</React.Fragment>
	)
}

export function SocialMediaChip(config: ISocialMediaChipConfiguration) {
	return (
		<React.Fragment>
			<Chip
				className="spaced-vertically"
				icon={getIconForWebsite(config.websiteName as string)}
				label={
					<Typography fontSize={'1em'} color="primary.text">
						<Link
							href={formatUrl(config.href)}
							underline={'hover'}
							color="inherit"
							sx={{
								fontWeight: 'bold',
								fontSize: '1.25em',
							}}
							variant="h6"
							rel="noopener">
							{config.websiteName}
						</Link>
					</Typography>
				}
				//variant="outlined"
				color="primary"
				sx={{
					marginTop: '1em',
				}}
			/>
		</React.Fragment>
	)
}
