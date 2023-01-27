import "./App.css"
import Main from "./Main"
import { ThemeProvider } from "@emotion/react"
import CompactHeader from "./components/partials/headers/CompactHeader"
import { SignatureFooter } from "./components/partials/footers/SignatureFooter"
import { queryClient, themeProvider } from "./services/DependenciesIOC"
import { QueryClientProvider } from "react-query"

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeProvider.getCurrentTheme()}>
        <CompactHeader />
        <Main />
        <SignatureFooter />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
