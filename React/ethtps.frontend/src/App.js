import logo from './logo.svg';
import './App.css';
import TPSStat from './components/TPSStat';
import TPSChart from './components/chart/TPSChart';
import githubIcon from './assets/600px-Octicons-mark-github.svg.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';

function App() {
  return (
    <>
    <a href="https://github.com/WhoEvenAmI/ETHTPS">
      <img class="small-img" src={githubIcon}>

      </img>
    </a>
    <a href="https://twitter.com/ethtps">
      <img class="small-img" src={twitterIcon}>

      </img>
    </a>
    <a href="https://discord.gg/jWPcsTzpCT">
      <img class="small-img" src={discordIcon}>

      </img>
    </a>
    <center>
      <TPSStat></TPSStat>
    </center>

    <div>
      <TPSChart></TPSChart>
    </div>
   <br></br>
   <center>
   <p>
      We'll be back with more charts soon
    </p>
   </center>
   <footer>
    <p>
    Brought to you by Mister_Eth
    </p>
    <p>
      Donate: 0x466Ef24d68ac9b61670eeE7fC2E001B951aBf482
    </p>
   </footer>
    </>
  );
}

export default App;