import { Fragment, useEffect } from "react"
import { useAppSelector } from "../../store"
import { useState } from "react"
import { IconButton, Tooltip, Typography } from "@mui/material"
import { MobiledataOff, SyncAlt } from "@mui/icons-material"
import { ConditionalRender } from "../../Types"

export function WebsocketStatusPartial() {
  const [connected, setConnected] = useState(false)
  const status = useAppSelector((state) => state.websockets.isConnected)
  useEffect(() => {
    setConnected(status)
  }, [status])
  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          cursor: "default",
          marginLeft: "1em",
          marginTop: "1em",
        }}
        className={connected ? "disappear box" : "appear box"}
      >
        {connected ? <SyncAlt /> : <MobiledataOff />}
        <Typography className="inline">
          {connected ? "Connected" : "Connecting..."}
        </Typography>
      </div>
    </Fragment>
  )
}
