import React from "react"
import { Fragment } from "react"
import { getAPIKey } from "../services/DependenciesIOC"
import { StringDictionary } from "../Types.dictionaries"

let specificStatusCodeMappings: StringDictionary = {
  "1000": "Normal Closure",
  "1001": "Going Away",
  "1002": "Protocol Error",
  "1003": "Unsupported Data",
  "1004": "(For future)",
  "1005": "No Status Received",
  "1006": "Abnormal Closure",
  "1007": "Invalid frame payload data",
  "1008": "Policy Violation",
  "1009": "Message too big",
  "1010": "Missing Extension",
  "1011": "Internal Error",
  "1012": "Service Restart",
  "1013": "Try Again Later",
  "1014": "Bad Gateway",
  "1015": "TLS Handshake",
}

function getStatusCodeString(code: number) {
  if (code >= 0 && code <= 999) {
    return "(Unused)"
  } else if (code >= 1016) {
    if (code <= 1999) {
      return "(For WebSocket standard)"
    } else if (code <= 2999) {
      return "(For WebSocket extensions)"
    } else if (code <= 3999) {
      return "(For libraries and frameworks)"
    } else if (code <= 4999) {
      return "(For applications)"
    }
  }
  if (typeof specificStatusCodeMappings[code.toString()] !== "undefined") {
    return specificStatusCodeMappings[code.toString()]
  }
  return "(Unknown)"
}
export function WSTestPage() {
  const ws = new WebSocket("ws://localhost:2000/LiveData")
  ws.addEventListener("message", (e) => {
    console.log("message")
    console.log(e.source)
  })
  ws.addEventListener("open", (e) => {
    console.log("open")
    ws.send("test")
  })
  ws.addEventListener("close", (event) => {
    console.log(getStatusCodeString(event.code))
  })
  ws.addEventListener("error", (e) => {
    console.log("error")
  })
  return <Fragment>ws</Fragment>
}
