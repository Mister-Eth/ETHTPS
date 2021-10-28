import logo from './logo.svg';
import './App.css';
import githubIcon from './assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';
import logo200 from './assets/logo200.png'
import { useEffect } from 'react';
import { globalApi } from './services/common';

function App() {

  var homePageModel = {};
  var network = "Mainnet";

  useEffect(async() => {
    globalApi.aPIV2HomePageModelGet(network, (err,data,res) => console.log(data))
  });

  return (
    <>
    <footer>
      <p className={'inline'}>
      Brought to you by Mister_Eth
      <br></br>
        Donate: 
        <p className={'ul inline'} style={{marginLeft:'5px'}}>
          0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482
        </p>
      </p>
    </footer>
    </>
  );
}

export default App;
