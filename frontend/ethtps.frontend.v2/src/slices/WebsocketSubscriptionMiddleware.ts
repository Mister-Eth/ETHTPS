import { Middleware } from "redux"
import { WebsocketEvent, websocketActions } from "./WebsocketSubscriptionSlice"
import websocketSlice from "./WebsocketSubscriptionSlice"
import ReconnectingWebSocket from "reconnecting-websocket"
import { websocketServiceURL } from "../services/DependenciesIOC"
import { setLiveData } from "./LiveDataSlice"

let connect = true
const rws = new ReconnectingWebSocket(websocketServiceURL)

const websocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (!websocketActions.connecting.match(action)) {
    return next(action)
  }

  if (connect) {
    connect = false //Only needs to be done once

    store.dispatch(websocketActions.connecting())

    rws.addEventListener("open", () => {
      console.log("ws connected")
      store.dispatch(websocketActions.connected())
    })

    rws.addEventListener("close", () => {
      console.log("ws closed")
      store.dispatch(websocketActions.disconnected())
      store.dispatch(websocketActions.connecting())
    })

    rws.addEventListener("message", (e) => {
      let obj = JSON.parse(e.data)
      let type: string = obj.Type ?? "unknown"
      switch (type) {
        case WebsocketEvent.LiveDataReceived:
          store.dispatch(setLiveData(obj.Data))
          break
        case WebsocketEvent.KeepAlive:
          rws.send("ack")
          break
        default:
          console.log(`Unhandled event of type "${type}"`)
          break
      }
    })
  }
  next(action)
}

export default websocketMiddleware
