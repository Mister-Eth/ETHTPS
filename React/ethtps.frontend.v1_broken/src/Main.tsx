import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IGlobalDependencies } from './models/dependencies/IGlobalDependencies';
import MainPage from './pages/MainPage';

export default function Main(dependencies: IGlobalDependencies): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<MainPage{...dependencies} />}></Route>
    </Routes>
  )
}