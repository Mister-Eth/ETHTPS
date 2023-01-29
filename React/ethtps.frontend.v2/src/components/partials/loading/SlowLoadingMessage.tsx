import { Fragment, useEffect } from "react"
import {
  useGetApplicationDataLoadedFromAppStore,
  useMarkApplicationDataLoaded,
} from "../../../hooks/ApplicationStateHooks"
import { useState } from "react"
import { ConditionalRender } from "../../../Types"
import LinearWithValueLabel from "./LinearWithValueLabel"
import { useGetProvidersFromAppStore } from "../../../hooks/ProviderHooks"
import {
  useGetNetworksFromAppStore,
  useGetMaxTPSDataFromAppStore,
  useGetMaxGPSDataFromAppStore,
  useGetMaxGTPSDataFromAppStore,
} from "../../../hooks/DataHooks"
import { useGetIntervalsFromAppStore } from "../../../hooks/IntervalHooks"
import {
  useGetProviderColorDictionaryFromAppStore,
  useGetProviderTypeColorDictionaryFromAppStore,
  useGetDataLoadProgress,
} from "../../../hooks/ColorHooks"
import { setApplicationDataLoaded } from "../../../slices/ApplicationStateSlice"
import { store } from "../../../store"
import { Paper, Typography } from "@mui/material"

export function SlowLoadingMessage() {
  const [display, setDisplay] = useState(false)
  const dataLoaded = useGetApplicationDataLoadedFromAppStore()
  let timerRef: NodeJS.Timeout | undefined

  const clearHoverAwayTimeout = () => {
    clearInterval(timerRef)
  }
  const startTimer = () => {
    if (timerRef === undefined) {
      timerRef = setTimeout(() => {
        if (!dataLoaded && !display) {
          setDisplay(true)
        }
      }, 2500)
    }
  }

  useEffect(() => {
    if (timerRef === undefined) {
      startTimer()
    }
  }, [timerRef])

  useEffect(() => {
    if (dataLoaded) {
      clearHoverAwayTimeout()
      setDisplay(false)
    }
  }, [dataLoaded])

  startTimer()

  const [percentage, setPercentage] = useState(0)

  const progress = useGetDataLoadProgress()
  const [loadeeNames, setLoadeeNames] = useState(
    progress.loadees.filter((x) => !x.completed)?.map((x) => x.name),
  )
  useEffect(() => {
    setPercentage(
      ((progress.loadees.filter((x) => x.completed)?.length as number) * 100) /
        progress.loadees.length,
    )
    setLoadeeNames(
      progress.loadees.filter((x) => !x.completed)?.map((x) => x.name),
    )
    if (Math.round(percentage) === 100) {
      setDisplay(false)
      store.dispatch(setApplicationDataLoaded(true))
    }
  }, [progress])

  return (
    <>
      {ConditionalRender(
        <Fragment>
          <Paper elevation={1}>
            <LinearWithValueLabel progress={percentage} />
            <Typography
              align="center"
              sx={{ fontWeight: 100 }}
            >{`Loading ${loadeeNames.join(", ")}...`}</Typography>
          </Paper>
        </Fragment>,
        !dataLoaded && display,
      )}
    </>
  )
}
