import { Paper, Container, Box, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'

import {
	ProviderDataChart,
	SocialMediaLinks,
	ConditionalSkeletonRender,
} from 'ethtps.components'
import { api } from '../../services/DependenciesIOC'
import { IProviderPageModel, useGetQueryWithAutoRefetch } from 'ethtps.data'

export function ProviderOverview(model: IProviderPageModel) {
	const markdown = useGetQueryWithAutoRefetch(
		`${model.provider} markdown`,
		() => api.getMarkdownInfoPageFor(model.provider as string)
	)
	return (
		<>
			<Paper sx={{ marginTop: '20px' }} elevation={1}>
				<ProviderDataChart provider={model.provider as string} />
				<Box className={'flexbox flex-horizontal spaced-vertically'}>
					<SocialMediaLinks providerName={model.provider as string} />
					<Paper
						key={'markdown section'}
						elevation={1}
						sx={{
							padding: '20px',
							marginRight: '20px',
							width: '90%',
						}}>
						{markdown?.length === 0 ? (
							<>
								<Typography
									sx={{
										fontWeight: 'bold',
									}}>
									No data available for {model.provider}
								</Typography>
								<Typography>
									If you want to help, click the edit button
									and suggest some changes. Any help is
									greatly appreciated :)
								</Typography>
							</>
						) : (
							ConditionalSkeletonRender(
								<ReactMarkdown
									children={
										markdown
											?.map((x) => x.rawMarkdown)
											.join('\r\n') as string
									}
								/>,
								markdown !== undefined
							)
						)}
					</Paper>
				</Box>
			</Paper>
		</>
	)
}
