import {
	setApplicationDataLoaded,
	setStoreAPIKey,
} from '../slices/ApplicationStateSlice'
import { useAppSelector, store } from '../store'
import { websocketActions } from '../slices/WebsocketSubscriptionSlice'
import { wsBaseURL } from '../models/services/DependenciesIOC'

export const useGetApplicationDataLoadedFromAppStore = () => {
	return useAppSelector(
		(state) => state.applicationState.applicationDataLoaded
	)
}

export const useMarkApplicationDataLoaded = () => {
	store.dispatch(setApplicationDataLoaded(true))
}

export const useSetStoreAPIKey = (apiKey?: string) => {
	store.dispatch(setStoreAPIKey(apiKey))
	store.dispatch(websocketActions.setWSURL(wsBaseURL + apiKey))
}
