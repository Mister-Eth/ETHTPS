import { Paper, Container } from '@mui/material'
import { ProviderModel } from 'ethtps.api.client'
import { toShortString, useSetSidechainsIncluded } from 'ethtps.data'
import { useGetMaxDataFromAppStore } from 'ethtps.data/dist/hooks/DataHooks'
import { liveDataHooks } from 'ethtps.data'
import { useGetProvidersFromAppStore } from 'ethtps.data/dist/hooks/ProviderHooks'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams, createSearchParams } from 'react-router-dom'
import { useGet1mTPS, useGet1mGPS, useGet1mGTPS } from '../hooks/hooks'
import {
	DiscordBanner,
	SidechainToggleButton,
	DataModeButtonGroup,
	CustomVISXStreamgraph,
	AllProvidersTable,
} from 'ethtps.components'

export default function MainPage(): JSX.Element {
	const providers = useGetProvidersFromAppStore()
	const max = useGetMaxDataFromAppStore()
	const sidechainsIncluded =
		liveDataHooks.useGetSidechainsIncludedFromAppStore()
	const mode = liveDataHooks.useGetLiveDataModeFromAppStore()
	const [_1mtps, _1mgps, _1mgtps] = [
		useGet1mTPS(),
		useGet1mGPS(),
		useGet1mGTPS(),
	]
	const useHandleCellClick = (
		provider?: ProviderModel,
		cellName?: string
	) => {}
	let [searchParams, setSearchParams] = useSearchParams()
	useEffect(() => {
		const params = new URLSearchParams([
			['sidechainsIncluded', sidechainsIncluded.toString()],
			['mode', toShortString(mode)],
		])
		setSearchParams(createSearchParams(params))
	}, [sidechainsIncluded, mode])
	const [containerWidth, setContainerWidth] = useState(0)
	const containerRef = useRef<any>(null)
	useEffect(() => {
		setContainerWidth(
			containerRef.current ? containerRef.current.offsetWidth : 0
		)
	}, [containerRef.current])
	return (
		<>
			<Paper elevation={0}>
				<DiscordBanner />
				<>
					<br />
					<Container maxWidth={'md'}>
						<Paper elevation={1}>
							{/*<MultiProviderVSIXChart />*/}
						</Paper>
						<Paper elevation={1}>
							<SidechainToggleButton
								toggled={useSetSidechainsIncluded}
								defaultIncluded={sidechainsIncluded}
							/>
							<DataModeButtonGroup
								modeChanged={useSetDataModeMutation}
							/>
						</Paper>
						<Paper ref={containerRef} elevation={1}>
							{/*<Streamgraph width={containerWidth} height={500} />*/}
							{
								<CustomVISXStreamgraph
									width={containerWidth}
									height={500}
								/>
							}
						</Paper>
						<Paper elevation={1}>
							<AllProvidersTable
								providerData={providers}
								maxData={max}
								maxRowsBeforeShowingExpand={20}
								clickCallback={useHandleCellClick}
							/>
						</Paper>
					</Container>
				</>
			</Paper>
		</>
	)
}
