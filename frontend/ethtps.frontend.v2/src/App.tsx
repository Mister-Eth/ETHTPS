import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router'
import { About } from './pages/About'
import { FourOhFour } from './pages/FourOhFour'
import { ProviderPage } from './pages/provider/ProviderPage'
import MainPage from './pages/MainPage'

export default function App(): JSX.Element {
	return (
		<Fragment>
			<TestTube />
			<RecaptchaAPIKeyAndDataLoader />
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
