import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router'
import { About } from './pages/About'
import { FourOhFour } from './pages/FourOhFour'
import { ProviderPage } from './pages/provider/ProviderPage'
import MainPage from './pages/MainPage'
import { RecaptchaTokenLoader, TestTube } from 'ethtps.components'
import { BinaryConditionalRender } from 'ethtps.components.utils'
import { onKeyLoaded } from './stories/AuthenticationFlow'
import { useState, useEffect } from 'react'

export default function App(): JSX.Element {
	const [isHuman, setIsHuman] = useState<boolean>(true)
	return (
		<Fragment>
			<BinaryConditionalRender condition={isHuman} />
			<TestTube />
			<RecaptchaTokenLoader
				onIsHuman={setIsHuman}
				onKeyLoaded={onKeyLoaded}
			/>
			<Routes>
				<Route path={'/'} element={<MainPage />} />
				<Route path={'/Providers/:providerName/*'}>
					<Route path={':subsection/*'} element={<ProviderPage />} />
				</Route>
				<Route path={'/About'} element={<About />} />
				<Route path={'*'} element={<FourOhFour />} />
			</Routes>
		</Fragment>
	)
}
