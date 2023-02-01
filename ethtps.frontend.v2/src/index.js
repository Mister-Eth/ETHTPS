import React from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@emotion/react"
import CompactHeader from "./components/partials/headers/CompactHeader"
import { SignatureFooter } from "./components/partials/footers/SignatureFooter"
import { queryClient, themeProvider } from "./services/DependenciesIOC"
import { QueryClientProvider } from "react-query"

const container = document.getElementById("root")
const root = createRoot(container) //
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={themeProvider.getCurrentTheme()}>
          <CompactHeader />
          <App />
          <SignatureFooter />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>,
)
reportWebVitals()
