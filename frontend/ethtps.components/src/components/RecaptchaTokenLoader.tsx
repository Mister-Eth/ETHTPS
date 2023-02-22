/* eslint-disable react-hooks/rules-of-hooks */
import { createRef } from 'react'
import { ConditionalRender } from '../Types'
import Recaptcha from 'react-google-invisible-recaptcha'
import { LoadingApplicationDataPartial } from './partials/loading/LoadingApplicationDataPartial'
import React from 'react'
import { IOptionalCallback } from 'ethtps.data'
import { useState } from 'react'

export function RecaptchaTokenLoader(props: {
	onKeyLoaded?: IOptionalCallback<any>
	onIsHuman?: IOptionalCallback<boolean>
}) {
	const [ready, setReady] = useState<boolean>(
		JSON.parse(localStorage.getItem('XAPIKey') ?? 'false')
	)
	const refRecaptcha = createRef<any>()
	const handleHumanArrived = () => {
		const tokenData: any = refRecaptcha.current?.callbacks.getResponse()
		if (props.onKeyLoaded?.callback) {
			props.onKeyLoaded?.callback(tokenData)
			if (props.onIsHuman?.callback) props.onIsHuman?.callback(true)
		}
		setReady(true)
	}
	const handlePossiblyABeepBoop = () => {
		if (props.onIsHuman?.callback) props.onIsHuman?.callback(false)
	}
	return (
		//We use recaptcha only for getting an API key, if the user comes back later we don't let google know that
		<React.Fragment>
			{ConditionalRender(
				<Recaptcha
					ref={refRecaptcha}
					onLoaded={() =>
						console.log(refRecaptcha.current?.callbacks.execute())
					}
					sitekey={'6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP'}
					onResolved={handleHumanArrived}
					onError={handlePossiblyABeepBoop}
					onExpired={handlePossiblyABeepBoop}
				/>,
				!ready
			)}
			{ConditionalRender(<LoadingApplicationDataPartial />, ready)}
		</React.Fragment>
	)
}
