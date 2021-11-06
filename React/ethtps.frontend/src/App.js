import './App.css';
import githubIcon from './assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from './assets/1486053611-twitter_79195.png';
import discordIcon from './assets/discord-mascot.png';
import { globalGeneralApi, globalGPSApi, globalTPSApi } from './services/common';
import React, { useState, useEffect } from "react";
import InstantTPSStat from './components/InstantTPSStat';
import TypeTPSStat from './components/TypeTPSStat';
import Timeline from './components/Timeline';
import HorizontalBarChart from './components/HorizontalBarChart'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ProviderTable from './components/ProviderTable';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      homePageModel: {
        instantTPS: [],
        colorDictionary: {},
        providerTypeColorDictionary:{},
        providerData: [],
        maxTPS: []
      },
      network: "Mainnet",
      excludeSidechains: false,
      modifiedInstantTPS: {},
      mode: "TPS"
    }
  }
  
  //const [isDarkMode, setIsDarkMode] = useState(() => false);

  /*
  
  <DarkModeToggle
  className={'modeSwitchToggle'}
    onChange={setIsDarkMode}
    checked={isDarkMode}
    size={80}
  />
  */

componentDidMount(){

  globalGeneralApi.aPIV2ProvidersGet((err, data, res) => {
    let homePageModel = this.state.homePageModel;
    homePageModel.providerData = data;
    this.setState({homePageModel: homePageModel});
  });

  globalGeneralApi.aPIV2ColorDictionaryGet((err, data, res) => {
    let homePageModel = this.state.homePageModel;
    homePageModel.colorDictionary = data;
    this.setState({homePageModel: homePageModel});
  });

  globalGeneralApi.aPIV2ProviderTypesColorDictionaryGet((err, data, res) => {
    let homePageModel = this.state.homePageModel;
    homePageModel.providerTypeColorDictionary = data;
    this.setState({homePageModel: homePageModel});
  });

  globalTPSApi.aPITPSMaxGet({provider: 'All', network: this.state.network}, (err, data, res) => {
    let homePageModel = this.state.homePageModel;
    homePageModel.maxTPS = data;
    this.setState({homePageModel: homePageModel});
  });
  this.updateInstantTPS();
  setInterval(this.updateInstantTPS.bind(this), 5000);

}

handleInputChange(event){
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({excludeSidechains : value});
}

getFilteredInstantTPSData(state){
  if (state.excludeSidechains){
    let filteredInstantTPSData = {};
    for(let p of state.homePageModel.providerData){
      if (state.homePageModel.providerData.filter(x => x.name == p.name && x.type !== 'Sidechain')){
        filteredInstantTPSData[p.name] = state.homePageModel.instantTPS[p.name];
      }
    }
    return filteredInstantTPSData;
  }
  else {
    return state.homePageModel.instantTPSData;
  }
}

updateInstantTPS(){
  globalTPSApi.aPITPSInstantGet(true, (err, data, res)=>{
    let homePageModel = this.state.homePageModel;
    homePageModel.instantTPS = data;
    this.setState({homePageModel: homePageModel});
  });
}

getProviderData(state){
  return (state.excludeSidechains)?state.homePageModel.providerData.filter(x=>x.type !== "Sidechain"):state.homePageModel.providerData
}

 render(){
  return (
    <>
    <center>
    <br></br>
    <div className={"jumpy unselectable"}>ETHTPS.info</div>
    <br></br>
    <br></br>
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
    <div className={"container"}>
      <hr/>
      <h3>
        Current TPS overview
      </h3>
      <p>
        Each section of the bar below represents the throughput of a network. Data gets updated automatically.
      </p>
      <InstantTPSStat 
        data={this.state.homePageModel.instantTPS} 
        colorDictionary={this.state.homePageModel.colorDictionary} 
        providerData={this.getProviderData(this.state)}/>
    <p>
        Each section of the bar below represents the throughput of a network type.
      </p>
      <TypeTPSStat 
        data={this.state.homePageModel.instantTPS} 
        colorDictionary={this.state.homePageModel.providerTypeColorDictionary} 
        providerData={this.getProviderData(this.state)}/>

      <label className={"small"}>
      <input
            ref={ref=>this.excludeSidechainsCheckBox = ref}
            name="excludeSidechains" type="checkbox"
            checked={this.state.excludeSidechains}
            onChange={this.handleInputChange.bind(this)}/>
            Exclude sidechains?
      </label>

      <hr/>
      

    <h3>
      Networks
    </h3>
    <ProviderTable
      instantTPSData={this.state.homePageModel.instantTPS} 
      colorDictionary={this.state.homePageModel.colorDictionary} 
      maxTPS={this.state.homePageModel.maxTPS}
      providerData={this.getProviderData(this.state)}/>
      <hr/>
      <h3>
        Current TPS distribution
      </h3>
      <p>
        This is an ordered bar chart of each network's throughput.
      </p>
      <Timeline/>
      <HorizontalBarChart 
        data={this.state.homePageModel.instantTPS} 
        colorDictionary={this.state.homePageModel.colorDictionary} 
        providerData={this.getProviderData(this.state)}/>
    <hr/>
    </div>
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
