import { QueryClient } from "react-query"
import { StorageThemeProvider } from "./themes/StorageThemeProvider"
import { ETHTPSApi } from "./api/ETHTPSApi"

var _api_key: string | undefined | null = ""

export const BASE_PATH = "http://10.2.0.24:10202"
/*
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV_ENDPOINT?.toString()
    : process.env.REACT_APP_API_ENDPOINT?.toString()*/
export const api = new ETHTPSApi(BASE_PATH)

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

export const queryClient = new QueryClient()

export const themeProvider = new StorageThemeProvider()
