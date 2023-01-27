import { ETHTPSApi } from "./api/ETHTPSApi"
import { StorageThemeProvider } from "./api/themes/StorageThemeProvider"

console.log(process.env.REACT_APP_API_DEV_ENDPOINT)
export const api = new ETHTPSApi(
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV_ENDPOINT?.toString()
    : process.env.REACT_APP_API_ENDPOINT?.toString(),
)
export const themeProvider = new StorageThemeProvider()
