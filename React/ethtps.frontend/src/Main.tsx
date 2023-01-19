import MainPage from './components/pages/MainPage/MainPage';
import NetworkPage from './components/pages/networks/NetworkPage';
import TimeWarpPage from './components/pages/TimeWarpPage';
import StatusPage from './components/pages/Status/StatusPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingPage from './components/pages/loading/LoadingPage';

export default function Main(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={LoadingPage}></Route>
      <Route path='/Network/' element={NetworkPage}></Route>
      <Route path='/TimeWarp/' element={TimeWarpPage}></Route>
      <Route path='/Status/' element={StatusPage}></Route>
    </Routes>
  )
}