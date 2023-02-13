import React from "react"
import { Fragment, useEffect } from "react"
import { StringDictionary } from "../Types.dictionaries"
import { useLiveData } from "../components/instant data animations/hooks"
import { useState } from "react"
import { Typography } from "@mui/material"

export function WSTestPage() {
  const liveData = useLiveData()
  const [text, setText] = useState("ready")
  useEffect(() => {
    setText(JSON.stringify(liveData))
  }, [liveData])
  return (
    <Fragment>
      <Typography>{text}</Typography>
    </Fragment>
  )
}
