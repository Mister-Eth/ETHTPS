import { Middleware } from "redux";
import { WebsocketEvent, websocketActions } from "./WebsocketSubscriptionSlice";
import websocketSlice from "./WebsocketSubscriptionSlice";
import ReconnectingWebSocket from "reconnecting-websocket";
import { setLiveData } from "./LiveDataSlice";
import { InstantDataResponseModel } from "../Types.dictionaries";

let connect = true;
const rws = new ReconnectingWebSocket("ws://localhost:2000");

const websocketMiddleware: Middleware = (store) => (next) => (action) => {
  if (!websocketActions.connecting.match(action)) {
    return next(action);
  }

  if (connect) {
    connect = false; //Only needs to be done once

    store.dispatch(websocketActions.connecting());

    rws.addEventListener("open", () => {
      store.dispatch(websocketActions.connected());
    });

    rws.addEventListener("close", () => {
      store.dispatch(websocketActions.disconnected());
      store.dispatch(websocketActions.connecting());
    });

    rws.addEventListener("message", (e) => {
      try {
        let obj = JSON.parse(e.data);
        let type: string = obj.Type ?? "unknown";
        switch (type) {
          case WebsocketEvent.LiveDataReceived:
            store.dispatch(setLiveData(obj.Data as InstantDataResponseModel));
            break;
          case WebsocketEvent.KeepAlive:
            rws.send("ack");
            break;
          default:
            console.log(`Unhandled event of type "${type}"`);
            break;
        }
      } catch (e) {
        console.log("WS Error: " + e);
      }
    });
  }
  next(action);
};

export default websocketMiddleware;
