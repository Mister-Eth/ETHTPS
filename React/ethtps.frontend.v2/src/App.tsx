import "./App.css"
import Main from "./Main"
import { ThemeProvider } from "@emotion/react"
import CompactHeader from "./components/partials/headers/CompactHeader"
import { LinksFooter } from "./components/partials/footers/LinksFooter"
import { SignatureFooter } from "./components/partials/footers/SignatureFooter"
import { themeProvider } from "./services/DependenciesIOC"

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={themeProvider.getCurrentTheme()}>
      <CompactHeader />
      <Main />
      <SignatureFooter />
    </ThemeProvider>
  )
}
