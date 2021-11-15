import './App.css';
import githubIcon from './assets/600px-Octicons-mark-github.svg - inv.png';
import lightGithubIcon from './assets/600px-Octicons-mark-github.svg.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';
import React, { ReactDOM, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Main from './Main';
import { ThemeProvider } from 'styled-components';
import { GlobalLightStyles, GlobalDarkStyles, setDarkMode, isDarkMode } from './services/themes';
import DarkModeToggle from "react-dark-mode-toggle";

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      mode: "tps",
      isDarkMode: false
    }
  }

setIsDarkMode(value){
  setDarkMode(value);
  this.setState({isDarkMode: value});
}


 render(){

  let theme = <GlobalLightStyles/>;
  if (this.state.isDarkMode){
    theme = <GlobalDarkStyles/>;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        {theme}
        <div className={'c'}>
          <DarkModeToggle
            className={'float-right'}
            onChange={this.setIsDarkMode.bind(this)}
            checked={this.state.isDarkMode}
            size={80}
          />
        </div>
          <center>
            <br></br>
            <Link to="/">
              <div className={"jumpy unselectable"}>ETHTPS.info</div>
            </Link>
            <br></br>
            <br></br>
              <a href="https://github.com/WhoEvenAmI/ETHTPS">
                  <img className={"small-img inverted"} src={githubIcon}>
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
              <Main/>
            </div>
            <hr/>
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
      </ThemeProvider>
    </>
  );
}
}
export default App;
