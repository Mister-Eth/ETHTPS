/* eslint-disable react-hooks/rules-of-hooks */
import { Fragment, createRef, useState, useEffect } from "react"
import { ConditionalRender } from "../Types"
import Recaptcha from "react-google-invisible-recaptcha"
import { LoadingApplicationDataPartial } from "./partials/loading/LoadingApplicationDataPartial"
import { api, setAPIKey } from "../services/DependenciesIOC"
import { getAPIKey } from "../services/DependenciesIOC"
import {
  store,
  setStoreAPIKey,
  useAppDispatch,
  useSetStoreAPIKey,
} from "ethtps.data"

export function RecaptchaAPIKeyAndDataLoader() {
  const [hasAPIKey, setHasAPIKey] = useState(
    getAPIKey() !== undefined && getAPIKey() !== null,
  )
  const [ready, setReady] = useState(hasAPIKey)
  if (hasAPIKey) {
    api.resetConfig()
  }
  useEffect(() => {
    setReady(hasAPIKey)
  }, [hasAPIKey])
  const refRecaptcha = createRef<any>()
  const handleHumanArrived = () => {
    const retryHandler = (err: any) => {
      console.log(`Failed for some reason (${err})`)
      setTimeout(() => {
        handleHumanArrived()
      }, 2500)
    }
    const token: string = refRecaptcha.current?.callbacks.getResponse()
    console.log(`Human with token ${token} is here. Getting new API key...`)
    api
      .getNewAPIKey(token)
      .then((x) => {
        console.log(`Got API key ${JSON.stringify(x)}`)
        if (x !== undefined) {
          setAPIKey(x.key as string)
          setHasAPIKey(true)
          useSetStoreAPIKey(x.key as string)
          api.resetConfig()
        }
      })
      .catch(retryHandler)
  }
  const handlePossiblyABeepBoop = () => {}
  return (
    //We use recaptcha only for getting an API key, if the user comes back later we don't let google know that
    <Fragment>
      {ConditionalRender(
        <Recaptcha
          ref={refRecaptcha}
          onLoaded={() =>
            console.log(refRecaptcha.current?.callbacks.execute())
          }
          sitekey={"6Le_XTUkAAAAAJKXCh8Cvq6UFvokPtjfTLCp1JAP"}
          onResolved={handleHumanArrived}
          onError={handlePossiblyABeepBoop}
          onExpired={handlePossiblyABeepBoop}
        />,
        !ready,
      )}
      {ConditionalRender(<LoadingApplicationDataPartial />, ready)}
    </Fragment>
  )
}
