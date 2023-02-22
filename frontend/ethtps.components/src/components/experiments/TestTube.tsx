import { BrowserView, MobileOnlyView } from 'react-device-detect'
import { useState } from 'react'
import { ConditionalRender } from '../../Types'
import { SimpleDesktopFeedbackExperiment } from './desktop/SimpleDesktopFeedbackExperiment'
import {
	IRequestHandler,
	store,
	handleException,
	useAppSelector,
} from 'ethtps.data'
import React from 'react'

export async function TestTube(
	request: IRequestHandler<{ isDesktop: boolean }, number[]>,
	params: {
		isDesktop: boolean
	}
): Promise<JSX.Element> {
	const [currentExperiments, setCurrentExperiments] = useState<number[]>(
		useAppSelector((state) => state.experiments) || []
	)
	/*
	const [fetchedFromServer, setFetchedFromServer] = useState(false)
	if (!fetchedFromServer) {
		loadAvailableExperiments(isDesktop ? 'Desktop' : 'Mobile').then((x) => {
			setCurrentExperiments(x)
			store.dispatch(setExperiments(x))
			setFetchedFromServer(true)
		})
	}*/
	try {
		const result = await request.dataGetter(params)
		setCurrentExperiments(result)
		store.dispatch(setCurrentExperiments(result))
	} catch (e) {
		handleException(e)
	}
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
