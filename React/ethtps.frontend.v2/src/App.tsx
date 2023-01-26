import "./App.css"
import { ETHTPSApi } from "./services/api/ETHTPSApi"
import Main from "./Main"
import { StorageThemeProvider } from "./services/api/themes/StorageThemeProvider"
import { ThemeProvider } from "@emotion/react"
import CompactHeader from "./components/partials/headers/CompactHeader"
import { LinksFooter } from "./components/partials/footers/LinksFooter"
import { SignatureFooter } from "./components/partials/footers/SignatureFooter"

const apiClient = new ETHTPSApi("https://api.ethtps.info")
const themeProvider = new StorageThemeProvider()
const deps = {
  apiClient,
  themeProvider,
}
export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={deps.themeProvider.getCurrentTheme()}>
      <CompactHeader />
      <Main {...deps} />
      <LinksFooter />
      <SignatureFooter />
    </ThemeProvider>
  )
}
