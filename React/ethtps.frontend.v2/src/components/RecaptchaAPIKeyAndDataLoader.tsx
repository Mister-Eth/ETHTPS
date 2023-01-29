import { Fragment, createRef, useState, useEffect } from "react"
import { ConditionalRender } from "../Types"
import Recaptcha, { Callbacks } from "react-google-invisible-recaptcha"
import { LoadingApplicationDataPartial } from "./partials/loading/LoadingApplicationDataPartial"
import { api } from "../services/DependenciesIOC"
import { useQuery } from "react-query"
import { options } from "./instant data animations/SimpleInstantBar"

export function RecaptchaAPIKeyAndDataLoader() {
  const [hasAPIKey, setHasAPIKey] = useState(api.apiKey !== undefined)
  const [ready, setReady] = useState(hasAPIKey)
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
        x.json()
          .then((o) => {
            const key = o.key
            console.log(`Got API key ${key}`)
            localStorage.setItem("XAPIKey", key)
            api.apiKey = key
            api.resetConfig()
            setHasAPIKey(true)
          })
          .catch(retryHandler)
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
