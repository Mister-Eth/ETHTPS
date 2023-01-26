import { ETHTPSApi } from "./api/ETHTPSApi"
import { StorageThemeProvider } from "./api/themes/StorageThemeProvider"

export const api = new ETHTPSApi("https://api.ethtps.info")
export const themeProvider = new StorageThemeProvider()
