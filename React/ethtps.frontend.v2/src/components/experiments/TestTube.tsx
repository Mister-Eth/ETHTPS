import { Fragment, useEffect } from "react"
import { BrowserView, MobileOnlyView, isDesktop } from "react-device-detect"
import { useState } from "react"
import {
  loadAvailableExperiments,
  useGetExperimentsFromAppStore,
} from "./ExperimentHooks"
import { ConditionalRender } from "../../Types"
import { SimpleDesktopFeedbackExperiment } from "./desktop/SimpleDesktopFeedbackExperiment"

export function TestTube() {
  const [experiments, setExperiments] = useState<number[]>(
    useGetExperimentsFromAppStore(),
  )
  const [fetchedFromServer, setFetchedFromServer] = useState(false)
  if (!fetchedFromServer) {
    loadAvailableExperiments(isDesktop ? "Desktop" : "Mobile").then((x) => {
      setExperiments(x)
      setFetchedFromServer(true)
    })
  }
  useEffect(() => {}, [experiments])
  return (
    <Fragment>
      <BrowserView>
        {ConditionalRender(
          <SimpleDesktopFeedbackExperiment />,
          experiments?.some((x) => x === 2),
        )}
      </BrowserView>
      <MobileOnlyView></MobileOnlyView>
    </Fragment>
  )
}
