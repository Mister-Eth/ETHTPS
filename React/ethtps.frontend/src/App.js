import logo from './logo.svg';
import './App.css';
import TPSStat from './components/TPSStat';
import TPSChart from './components/chart/TPSChart';
import ProviderTable from './components/ProviderTable';
import githubIcon from './assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';

function App() {
  return (
    <>
    <ul>
      <li>
        <a href="https://github.com/WhoEvenAmI/ETHTPS">
          <img className={"small-img"} src={githubIcon}>
          </img>
        </a>
      </li>
      <li>
        <a href="https://discord.gg/jWPcsTzpCT">
          <img className={"small-img"} src={discordIcon}>
          </img>
        </a>
      </li>
      <li>
        <a href="https://twitter.com/ethtps">
          <img className={"small-img"} src={twitterIcon}>
          </img>
        </a>
      </li>
    </ul>
    <center>
      <TPSStat></TPSStat>
    </center>

    <div>
      <TPSChart></TPSChart>
    </div>
    
    <div className={"container"}>
     <ProviderTable/>
    </div>
   <br></br>
   <div className={"container"}>
    <p>
    Brought to you by Mister_Eth
    </p>
    <p>
      Donate: 0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482
    </p>
   </div>
    </>
  );
}

export default App;
