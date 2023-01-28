import "./App.css"
import { Route, Routes, Router } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { FourOhFour } from "./pages/FourOhFour"
import { About } from "./pages/About"
import MainPage from "./pages/MainPage"

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/About"} element={<About />} />
      <Route path={"*"} element={<FourOhFour />} />
    </Routes>
  )
}
