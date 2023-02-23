import { useState } from 'react'
import { ConditionalRender } from '../../Types'
import { SimpleDesktopFeedbackExperiment } from './desktop/SimpleDesktopFeedbackExperiment'
import {
	IRequestHandler,
	store,
	handleException,
	useAppSelector,
	setExperiments,
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
		store.dispatch(setExperiments(result))
	} catch (e) {
		handleException(e)
	}
	return (
		<React.Fragment>
			{ConditionalRender(
				<SimpleDesktopFeedbackExperiment />,
				currentExperiments?.some((x) => x === 2)
			)}
		</React.Fragment>
	)
}
