import App from './App';
import MainPage from './components/pages/MainPage';
import TestPage from './components/pages/TestPage';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Main = () => {
  return (
    <Switch> 
      <Route exact path='/' component={MainPage}></Route>
      <Route exact path='/test' component={TestPage}></Route>
    </Switch>
  );
}

export default Main;