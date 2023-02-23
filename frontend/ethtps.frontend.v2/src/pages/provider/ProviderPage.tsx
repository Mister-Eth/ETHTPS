import { Tabs, Tab } from '@mui/material'
import { Container, Box } from '@mui/system'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { TabPanel, TabPanelProps, a11yProps } from 'ethtps.components'
import { ProviderOverview } from './ProviderOverview'
import { ProviderAnalysis } from './ProviderAnalysis'

interface IProviderPageModel extends TabPanelProps {
	provider?: string
}
export const providerPageHandler = (url: any) => {
	console.log(url)
}
export const providerPageTabs = ['Overview', 'Details', 'Analysis']

export function ProviderPage() {
	const { providerName, subsection } = useParams()
	const [currentValue, setCurrentValue] = useState(
		providerPageTabs.indexOf(subsection ?? 'Overview')
	)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setCurrentValue(newValue)
		window.history.pushState(
			providerPageTabs[newValue],
			`${providerName} ${providerPageTabs[newValue].toLowerCase()}`,
			`/Providers/${providerName}/${providerPageTabs[newValue]}`
		)
	}

	return (
		<>
			<Container maxWidth={'lg'}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={currentValue}
						onChange={handleChange}
						aria-label="basic tabs example">
						<Tab
							value={0}
							label={
								<Link
									to={`/Providers/${providerName}/Overview`}>
									{providerPageTabs[0]}
								</Link>
							}
							{...a11yProps(0)}
						/>
						<Tab
							value={1}
							label={
								<Link to={`/Providers/${providerName}/Details`}>
									{providerPageTabs[1]}
								</Link>
							}
							{...a11yProps(1)}
						/>
						<Tab
							value={2}
							label={
								<Link
									to={`/Providers/${providerName}/Analysis`}>
									{providerPageTabs[2]}
								</Link>
							}
							{...a11yProps(2)}
						/>
					</Tabs>
				</Box>
				<TabPanel value={currentValue} index={0}>
					<ProviderOverview provider={providerName as string} />
				</TabPanel>
				<TabPanel value={currentValue} index={1}>
					<>Item Two</>
				</TabPanel>
				<TabPanel value={currentValue} index={2}>
					<ProviderAnalysis provider={providerName as string} />
				</TabPanel>
			</Container>
		</>
	)
}
