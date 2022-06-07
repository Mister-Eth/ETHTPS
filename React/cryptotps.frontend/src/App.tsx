import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { ApplicationConfiguration } from './Models/ApplicationConfiguration';
import Header from './Components/Header/Header';
import { HeaderModel } from './Components/Header/HeaderModel';

const config = new ApplicationConfiguration("ETHTPS.info");

function App() {
  return (
    <div className="App">
      <Main {...config}/>

    </div>
  );
}

export default App;
