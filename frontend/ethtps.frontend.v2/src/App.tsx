import "./App.css"
import { Route, Routes } from "react-router"
import { FourOhFour } from "./pages/FourOhFour"
import { About } from "./pages/About"
import MainPage from "./pages/MainPage"
import { Fragment } from "react"
import { RecaptchaAPIKeyAndDataLoader } from "./components/RecaptchaAPIKeyAndDataLoader"
import {
  ProviderPage,
  providerPageHandler,
  providerPageTabs,
} from "./pages/provider/ProviderPage"
import { TestTube } from "./components/experiments/TestTube"
import { WSTestPage } from "./pages/WSTestPage"
import { ProviderOverview } from "./pages/provider/ProviderOverview"
import { TabPanel } from "./components/partials/TabPanel"

export default function App(): JSX.Element {
  return (
    <Fragment>
      <TestTube />
      <RecaptchaAPIKeyAndDataLoader />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/Providers/:providerName/*"}>
          <Route
            path={":subsection/*"}
            element={<ProviderPage />}
            handle={providerPageHandler}
          />
        </Route>
        <Route path={"/About"} element={<About />} />
        <Route path={"/WSTest"} element={<WSTestPage />} />
        <Route path={"*"} element={<FourOhFour />} />
      </Routes>
    </Fragment>
  )
}
