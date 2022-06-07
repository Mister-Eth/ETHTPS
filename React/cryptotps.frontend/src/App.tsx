import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { ApplicationConfiguration } from './Models/ApplicationConfiguration';
import Header from './Components/Header/Header';
import { HeaderModel } from './Components/Header/HeaderModel';
import { Modes } from './Models/Enums';

const ethtpsConfig = new ApplicationConfiguration("ETHTPS.info", Modes.TPS, 'Ethereum', "Mainnet");
const cryptotpsConfig = new ApplicationConfiguration("CryptoTPS.info", Modes.TPS, 'All', "Mainnet");

function App() {
  return (
    <div className="App">
      <Main {...ethtpsConfig} />
    </div>
  );
}

export default App;
