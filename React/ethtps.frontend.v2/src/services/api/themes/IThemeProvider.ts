import { Theme } from "@mui/material"

export interface IThemeProvider {
  getCurrentTheme(): Theme
  setLightMode(): void
  setDarkMode(): void
}
