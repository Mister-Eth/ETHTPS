import App from './App';
import MainPage from './components/pages/MainPage';
import NetworkPage from './components/pages/networks/NetworkPage';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Main = () => {
  return (
    <Switch> 
      <Route exact path='/' component={MainPage}></Route>
      <Route exact path='/Network' component={NetworkPage}></Route>
    </Switch>
  );
}

export default Main;