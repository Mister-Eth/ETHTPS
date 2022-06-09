import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { ApplicationConfiguration } from './Models/ApplicationConfiguration';
import Header from './Components/Header/Header';
import { HeaderModel } from './Components/Header/HeaderModel';
import { Modes } from './Models/Enums';
import { WebsiteSocialMediaLinks } from './Models/WebsiteSocialMediaLinks';

const ethtpsConfig = new ApplicationConfiguration("ETHTPS.info", Modes.TPS, 'Ethereum', "Mainnet", new WebsiteSocialMediaLinks("https://github.com/Mister-Eth/ETHTPS", "https://twitter.com/ethtps", "https://discord.gg/jWPcsTzpCT"));
const cryptotpsConfig = new ApplicationConfiguration("CryptoTPS.info", Modes.TPS, 'All', "Mainnet", new WebsiteSocialMediaLinks("https://github.com/Mister-Eth/ETHTPS", "https://twitter.com/cryptotpsinfo", "https://discord.gg/KvTarTDaMg"));

function App() {
  return (
    <div className="App">
      <Main {...ethtpsConfig} />
    </div>
  );
}

export default App;
