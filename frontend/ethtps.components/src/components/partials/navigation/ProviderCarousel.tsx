import React from 'react'
import { LargeProviderHeader } from '../../widgets/LargeProviderHeader'
import { IObjectWithProvider } from 'ethtps.data'
//import { useGetProvidersFromAppStore } from 'ethtps.data/dist/hooks/ProviderHooks'

interface IProviderCarouselConfiguration extends IObjectWithProvider {}

export function ProviderCarousel(config: IProviderCarouselConfiguration) {
	//	const providers = useGetProvidersFromAppStore()
	return (
		<React.Fragment>
			<LargeProviderHeader provider={config.provider} />
		</React.Fragment>
	)
}
