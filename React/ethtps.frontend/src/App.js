import './App.css';
import githubIcon from './assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';
import blackDiscordIcon from './assets/discord-black-icon-703937.jpg';
import React, { ReactDOM, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Main from './Main';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      mode: "tps"
    }
  }

 render(){
  let main = "Loading..."; 
  try{
      main = <Main/>;
   }
   catch {
     setTimeout(() => {
        window.location.reload(false);
     }, 2000);
   }
   
  return (
    <>
    <center>
    <br></br>
    <center>
        <div  style={{backgroundColor: '#7289da', borderRadius:1, marginBottom: '10px'}}>
        <img className={"small-img"} src={blackDiscordIcon}></img>
        <a style={{color:'white', fontWeight: 'bold', fontSize: 15}} href={'https://discord.gg/jWPcsTzpCT'}>
          Click here to join our Discord channel
        </a>
        <img className={"small-img"} src={blackDiscordIcon}></img>
        </div>
        
        <div  style={{backgroundColor: 'yellow', borderRadius:1, marginBottom: '10px'}}>
          <p style={{color:'black', fontWeight: 'bold', fontSize: 15}}>
            Sorry for the possible poor performance of the website, we did not expect this surge of users
          </p>
        </div>
      </center>

    <Link to="/">
      <div className={"jumpy unselectable"}>ETHTPS.info</div>
    </Link>
    <br></br>
    <br></br>
      <a href="https://github.com/Mister-Eth/ETHTPS">
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
    <hr/>
    <div className={"container"}>
      {main}
    </div>
    <hr/>
    <h1 className={'invisible inline'}>ETHTPS</h1>
    <h1 className={'invisible inline'}>ETHTPS.info</h1>
    <footer>
      <div className={'inline'}>
      Brought to you by 
      <div style={{marginLeft:'5px'}} className={'trick'}>
        <span>
          Mister_Eth
        </span>
      </div>
      <br></br>
        Donate: 
        <p className={'ul-hover inline'} style={{marginLeft:'5px'}}>
          0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482
        </p>
      </div>
    </footer>
    </>
  );
}
}
export default App;
