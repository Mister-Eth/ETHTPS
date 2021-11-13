import App from './App';
import MainPage from './components/pages/MainPage/MainPage';
import NetworkPage from './components/pages/networks/NetworkPage';
import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default class Main extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Switch> 
        <Route exact path='/' component={MainPage}></Route>
        <Route exact path='/Network' component={NetworkPage}></Route>
      </Switch>
    );
  }
}