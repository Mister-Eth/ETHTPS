import { Route, Routes } from "react-router-dom"

import MainPage from "./pages/MainPage"

export default function Main(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>
  )
}
