import { Fragment, useEffect } from "react"
import { BrowserView, MobileOnlyView, isDesktop } from "react-device-detect"
import { useState } from "react"
import {
  loadAvailableExperiments,
  useGetExperimentsFromAppStore,
} from "./ExperimentHooks"
import { ConditionalRender } from "../../Types"
import { SimpleDesktopFeedbackExperiment } from "./desktop/SimpleDesktopFeedbackExperiment"
import { store } from "../../store"
import { setExperiments } from "../../slices/ExperimentSlice"

export function TestTube() {
  const [currentExperiments, setCurrentExperiments] = useState<number[]>(
    useGetExperimentsFromAppStore(),
  )
  const [fetchedFromServer, setFetchedFromServer] = useState(false)
  if (!fetchedFromServer) {
    loadAvailableExperiments(isDesktop ? "Desktop" : "Mobile").then((x) => {
      setCurrentExperiments(x)
      store.dispatch(setExperiments(x))
      setFetchedFromServer(true)
    })
  }
  useEffect(() => {}, [currentExperiments])
  return (
    <Fragment>
      <BrowserView>
        {ConditionalRender(
          <SimpleDesktopFeedbackExperiment />,
          currentExperiments?.some((x) => x === 2),
        )}
      </BrowserView>
      <MobileOnlyView></MobileOnlyView>
    </Fragment>
  )
}
