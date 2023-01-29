import "./App.css"
import { Route, Routes } from "react-router"
import { FourOhFour } from "./pages/FourOhFour"
import { About } from "./pages/About"
import MainPage from "./pages/MainPage"
import { Fragment } from "react"
import { RecaptchaAPIKeyAndDataLoader } from "./components/RecaptchaAPIKeyAndDataLoader"

export default function App(): JSX.Element {
  return (
    <Fragment>
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/About"} element={<About />} />
        <Route path={"*"} element={<FourOhFour />} />
      </Routes>
      <RecaptchaAPIKeyAndDataLoader />
    </Fragment>
  )
}
