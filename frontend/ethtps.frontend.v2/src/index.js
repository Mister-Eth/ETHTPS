/* eslint-disable react-hooks/rules-of-hooks */
import React from "react"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import { ETHTPSDataLayer } from "ethtps.data"
import { ThemeProvider } from "@emotion/react"
import CompactHeader from "./components/partials/headers/CompactHeader"
import { SignatureFooter } from "./components/partials/footers/SignatureFooter"
import { queryClient, themeProvider } from "./services/DependenciesIOC"
import { QueryClientProvider } from "react-query"
import { Provider as ReduxQueryProvider } from "redux-query-react"
import { store } from "ethtps.data"
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
