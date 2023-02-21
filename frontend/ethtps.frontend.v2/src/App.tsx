/* eslint-disable react-hooks/rules-of-hooks */
import "./App.css"
import { Route, Routes } from "react-router"
import { FourOhFour } from "./pages/FourOhFour"
import { About } from "./pages/About"
import MainPage from "./pages/MainPage"
import { Fragment } from "react"
import { RecaptchaAPIKeyAndDataLoader } from "./components/RecaptchaAPIKeyAndDataLoader"
import { ProviderPage } from "./pages/provider/ProviderPage"
import { TestTube } from "./components/experiments/TestTube"

export default function App(): JSX.Element {
  return (
    <Fragment>
      <TestTube />
      <RecaptchaAPIKeyAndDataLoader />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/Providers/:providerName/*"}>
          <Route path={":subsection/*"} element={<ProviderPage />} />
        </Route>
        <Route path={"/About"} element={<About />} />
        <Route path={"*"} element={<FourOhFour />} />
      </Routes>
    </Fragment>
  )
}
