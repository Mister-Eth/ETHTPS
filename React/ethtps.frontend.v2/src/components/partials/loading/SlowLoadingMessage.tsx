import { Fragment, useEffect } from "react"
import { useGetApplicationDataLoadedFromAppStore } from "../../../hooks/ApplicationStateHooks"
import { useState } from "react"
import { ConditionalRender } from "../../../Types"
import LinearWithValueLabel from "./LinearWithValueLabel"
import { useGetDataLoadProgress } from "../../../hooks/ColorHooks"
import { setApplicationDataLoaded } from "../../../slices/ApplicationStateSlice"
import { store } from "../../../store"
import { Paper, Typography } from "@mui/material"

export function SlowLoadingMessage() {
  const [display, setDisplay] = useState(false)
  const dataLoaded = useGetApplicationDataLoadedFromAppStore()
  const [timerRef, setTimerRef] = useState<NodeJS.Timeout | undefined>()

  useEffect(() => {
    if (dataLoaded) {
      clearInterval(timerRef)
      setTimerRef(undefined)
      setDisplay(false)
    }
  }, [dataLoaded])

  setTimeout(() => {
    if (!dataLoaded && !display) {
      setDisplay(true)
    }
  }, 2500)

  const [percentage, setPercentage] = useState(0)

  const progress = useGetDataLoadProgress()
  const [loadeeNames, setLoadeeNames] = useState<string[]>()

  const [loadingMessage, setLoadingMessage] = useState("Loading...")
  useEffect(() => {
    setLoadingMessage(`Loading ${loadeeNames?.join(", ").toLowerCase()}...`)
  }, [loadeeNames])
  useEffect(() => {
    if (progress?.loadees !== undefined) {
      setPercentage(
        ((progress?.loadees.filter((x) => x.completed)?.length as number) *
          100) /
          progress.loadees.length,
      )
    }
    setLoadeeNames(
      progress?.loadees?.filter((x) => !x.completed)?.map((x) => x.name),
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
            <Typography align="center" sx={{ fontWeight: 100 }}>
              {loadingMessage}
            </Typography>
          </Paper>
        </Fragment>,
        !dataLoaded && display,
      )}
    </>
  )
}
