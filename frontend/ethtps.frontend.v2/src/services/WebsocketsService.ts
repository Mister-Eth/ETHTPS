import { WebSocketEventListenerMap } from "reconnecting-websocket/dist/events"
import { LiveData } from "../components/instant data animations/hooks"
import ReconnectingWebSocket from "reconnecting-websocket"

export class WebsocketsService {
  private _url: string
  public ws?: ReconnectingWebSocket

  constructor(url: string) {
    this._url = url
    this.ws = new ReconnectingWebSocket(url)
    this.ws.addEventListener("message", (e: any) => {
      console.log("message")
      console.log(e.source)
    })
    this.ws.addEventListener("open", (e: any) => {
      console.log("open")
      this.ws?.send("test")
    })
    this.ws.addEventListener("close", (event: any) => {
      console.log("close")
    })
    this.ws.addEventListener("error", (e: any) => {
      console.log("error")
    })
  }
}
