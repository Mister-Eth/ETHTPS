import MainPage from './components/pages/MainPage/MainPage';
import NetworkPage from './components/pages/networks/NetworkPage';
import TimeWarpPage from './components/pages/TimeWarpPage';
import StatusPage from './components/pages/Status/StatusPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IGlobalDependencies } from './models/dependencies/IGlobalDependencies';

export default function Main(dependencies: IGlobalDependencies): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<MainPage{...dependencies} />}></Route>
    </Routes>
  )
}