import logo from './logo.svg';
import './App.css';
import githubIcon from './assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';
import logo200 from './assets/logo200.png'
import { globalApi } from './services/common';
import React, { useState, useEffect } from "react";

function App() {

  var homePageModel = {};
  var network = "Mainnet";

  useEffect(async() => {
    globalApi.aPIV2HomePageModelGet(network, (err,data,res) => console.log(data))
  });
  return (
    <>
    <center>
     <a href="/">
      <p className={'site-logo'}>
          ethtps.info
      </p>
      </a>
      <a href="https://github.com/WhoEvenAmI/ETHTPS">
          <img className={"small-img"} src={githubIcon}>
          </img>
        </a>
        <a href="https://twitter.com/ethtps">
          <img className={"small-img"} src={twitterIcon}>
          </img>
        </a>
        <a href="https://discord.gg/jWPcsTzpCT">
          <img className={"small-img"} src={discordIcon}>
          </img>
        </a>
    </center>
    <footer>
      <div className={'inline'}>
      Brought to you by 
      <div  style={{marginLeft:'5px'}} className={"tooltip"}>
        <span>
          Mister_Eth
        </span>
      </div>
      <br></br>
        Donate: 
        <p className={'ul inline'} style={{marginLeft:'5px'}}>
          0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482
        </p>
      </div>
    </footer>
    </>
  );
}

export default App;
