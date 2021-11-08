import '../../App.css';
import githubIcon from '../../assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from '../../assets/1486053611-twitter_79195.png';
import discordIcon from '../../assets/discord-mascot.png';
import { globalGeneralApi, globalGPSApi, globalTPSApi } from '../../services/common';
import React, { ReactDOM, useState, useEffect } from "react";
import InstantTPSStat from '../InstantTPSStat';
import TypeTPSStat from '../TypeTPSStat';
import Timeline from '../Timeline';
import HorizontalBarChart from '../HorizontalBarChart'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ProviderTable from '../ProviderTable';
import TreemapInstantTPSStat from '../TreemapInstantTPSStat';
import {BrowserView, MobileView} from 'react-device-detect';

class MainPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      homePageModel: {
        instantTPS: JSON.parse('{"Ethereum":[{"date":"0001-01-01T00:00:00","tps":14.379562043795621}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","tps":0.4117647058823529}],"Optimism":[{"date":"0001-01-01T00:00:00","tps":0.2}],"Polygon":[{"date":"0001-01-01T00:00:00","tps":24.09090909090909}],"XDAI":[{"date":"0001-01-01T00:00:00","tps":1.346153846153846}],"ZKSwap":[{"date":"0001-01-01T00:00:00","tps":0.00019286403085824494}],"ZKSync":[{"date":"0001-01-01T00:00:00","tps":0.12750205648478202}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","tps":2.5}],"Boba Network":[{"date":"0001-01-01T00:00:00","tps":0.002074688796680498}],"Loopring":[{"date":"0001-01-01T00:00:00","tps":0.191904047976012}]}'),
        colorDictionary: JSON.parse('{"Ethereum":"#490092","Arbitrum One":"#920000","Optimism":"#006ddb","Polygon":"#004949","XDAI":"#ff6db6","ZKSwap":"#c29a2d","ZKSync":"#db6d00","AVAX C-chain":"#22cf22","Boba Network":"#171723","Loopring":"#4a1173"}'),
        providerTypeColorDictionary:JSON.parse('{"Mainnet":"#4a1173","Optimistic rollup":" #3a7311","ZK rollup":"#116b73","Application-specific rollup":"#8ae5d6","Sidechain":"#002d4d"}'),
        providerData: JSON.parse('[{"name":"Ethereum","color":"#490092","type":"Mainnet"},{"name":"Arbitrum One","color":"#920000","type":"Optimistic rollup"},{"name":"Optimism","color":"#006ddb","type":"Optimistic rollup"},{"name":"Polygon","color":"#004949","type":"Sidechain"},{"name":"XDAI","color":"#ff6db6","type":"Sidechain"},{"name":"ZKSwap","color":"#c29a2d","type":"ZK rollup"},{"name":"ZKSync","color":"#db6d00","type":"ZK rollup"},{"name":"AVAX C-chain","color":"#22cf22","type":"Sidechain"},{"name":"Boba Network","color":"#171723","type":"Optimistic rollup"},{"name":"Loopring","color":"#4a1173","type":"ZK rollup"}]'),
        maxTPS: JSON.parse('[{"name":"Ethereum","color":"#490092","type":"Mainnet"},{"name":"Arbitrum One","color":"#920000","type":"Optimistic rollup"},{"name":"Optimism","color":"#006ddb","type":"Optimistic rollup"},{"name":"Polygon","color":"#004949","type":"Sidechain"},{"name":"XDAI","color":"#ff6db6","type":"Sidechain"},{"name":"ZKSwap","color":"#c29a2d","type":"ZK rollup"},{"name":"ZKSync","color":"#db6d00","type":"ZK rollup"},{"name":"AVAX C-chain","color":"#22cf22","type":"Sidechain"},{"name":"Boba Network","color":"#171723","type":"Optimistic rollup"},{"name":"Loopring","color":"#4a1173","type":"ZK rollup"}]')
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
      <h3>
        Current TPS overview
      </h3>
      <p>
        Each section of the bar below represents the throughput of a network. Data gets updated automatically.
      </p>
      <MobileView>
          <InstantTPSStat
          data={this.state.homePageModel.instantTPS} 
          colorDictionary={this.state.homePageModel.colorDictionary} 
          providerData={this.getProviderData(this.state)}/>  
      </MobileView>
      <BrowserView>
          <TreemapInstantTPSStat
              data={this.state.homePageModel.instantTPS} 
              colorDictionary={this.state.homePageModel.colorDictionary} 
              providerData={this.getProviderData(this.state)}/>  
      </BrowserView>
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
    </>
  );
}
}
export default MainPage;
