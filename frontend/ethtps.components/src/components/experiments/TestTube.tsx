import { Fragment, useEffect } from 'react'
import { BrowserView, MobileOnlyView, isDesktop } from 'react-device-detect'
import { useState } from 'react'
import { ConditionalRender } from '../../Types'
import { SimpleDesktopFeedbackExperiment } from './desktop/SimpleDesktopFeedbackExperiment'
import { setExperiments } from 'ethtps.data/dist/slices/ExperimentSlice'
import { store, useAppSelector } from 'ethtps.data'
import React from 'react'

export function TestTube() {
	const [currentExperiments, setCurrentExperiments] = useState<number[]>(
		useAppSelector((state) => state.experiments) || []
	)
	const [fetchedFromServer, setFetchedFromServer] = useState(false)
	if (!fetchedFromServer) {
		loadAvailableExperiments(isDesktop ? 'Desktop' : 'Mobile').then((x) => {
			setCurrentExperiments(x)
			store.dispatch(setExperiments(x))
			setFetchedFromServer(true)
		})
	}
	useEffect(() => {}, [currentExperiments])
	return (
		<React.Fragment>
			<BrowserView>
				{ConditionalRender(
					<SimpleDesktopFeedbackExperiment />,
					currentExperiments?.some((x) => x === 2)
				)}
			</BrowserView>
			<MobileOnlyView></MobileOnlyView>
		</React.Fragment>
	)
}
