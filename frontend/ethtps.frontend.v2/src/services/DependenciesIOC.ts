import { QueryClient } from "react-query"
import { StorageThemeProvider } from "./themes/StorageThemeProvider"
import { ETHTPSApi } from "./api/ETHTPSApi"
import { LocalStorageService } from "./LocalStorageService"

var _api_key: string | undefined | null = ""

export const storage: LocalStorageService = new LocalStorageService()
export const api = new ETHTPSApi(
  process.env.REACT_APP_API_DEV_GENERAL_ENDPOINT as string,
)

//export const websocketsService = new WebsocketsService()

export function getAPIKey() {
  if (_api_key === null || _api_key === undefined)
    tryLoadAPIKeyFromLocalStorage()
  return _api_key
}

export function setAPIKey(value: string) {
  try {
    localStorage.setItem("XAPIKey", value)
  } catch {
    console.log("Local storage disabled")
  } finally {
    _api_key = value
  }
}

export function tryLoadAPIKeyFromLocalStorage() {
  try {
    _api_key = localStorage.getItem("XAPIKey")
  } catch {
    console.log("Local storage disabled")
  }
}

export const websocketServiceURL =
  "ws://localhost:2000/LiveData?XAPIKEY=" + getAPIKey()

export const queryClient = new QueryClient()
export const themeProvider = new StorageThemeProvider()
