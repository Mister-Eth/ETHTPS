import '../../..//App.css';
import { globalGeneralApi, formatModeName, globalInstantDataService } from '../../../services/common';
import React, { ReactDOM, useState, useEffect } from "react";
import Timeline from '../../Timeline';
import HorizontalBarChart from '../../HorizontalBarChart'
import ProviderTable from '../../ProviderTable';
import DataStatByType from './DataStatByType';
import ModeSelector from '../../ModeSelector';

class MainPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      homePageModel: {
        selectedInstantData: JSON.parse('{"Ethereum":[{"date":"0001-01-01T00:00:00","value":11.167883211678832}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":0.1875}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0.2}],"Polygon":[{"date":"0001-01-01T00:00:00","value":130}],"XDAI":[{"date":"0001-01-01T00:00:00","value":1.7307692307692306}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0.006600660066006601}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0.25096525096525096}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":0.3333333333333333}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.034482758620689655}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.08059023836549375}]}'),
        allInstantData: JSON.parse('{"tps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":24.379562043795623}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":0.14}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0.2}],"Polygon":[{"date":"0001-01-01T00:00:00","value":23.636363636363633}],"XDAI":[{"date":"0001-01-01T00:00:00","value":2.3076923076923075}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0.004329004329004329}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0.19850352112676056}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":0.3333333333333333}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.00931098696461825}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.15157612340710933}]},"gps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":2184024.306569343}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":30913.62}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":4319541.363636363}],"XDAI":[{"date":"0001-01-01T00:00:00","value":329834.42307692306}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":84126}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":953.2402234636871}],"Loopring":[{"date":"0001-01-01T00:00:00","value":2435.669349429913}]}}'),
        colorDictionary: JSON.parse('{"Ethereum":"#490092","Arbitrum One":"#920000","Optimism":"#006ddb","Polygon":"#004949","XDAI":"#ff6db6","ZKSwap":"#c29a2d","ZKSync":"#db6d00","AVAX C-chain":"#22cf22","Boba Network":"#171723","Loopring":"#4a1173"}'),
        providerTypeColorDictionary:JSON.parse('{"Mainnet":"#4a1173","Optimistic rollup":" #3a7311","ZK rollup":"#116b73","Application-specific rollup":"#8ae5d6","Sidechain":"#002d4d"}'),
        providerData: JSON.parse('[{"name":"Ethereum","color":"#490092","type":"Mainnet"},{"name":"Arbitrum One","color":"#920000","type":"Optimistic rollup"},{"name":"Optimism","color":"#006ddb","type":"Optimistic rollup"},{"name":"Polygon","color":"#004949","type":"Sidechain"},{"name":"XDAI","color":"#ff6db6","type":"Sidechain"},{"name":"ZKSwap","color":"#c29a2d","type":"ZK rollup"},{"name":"ZKSync","color":"#db6d00","type":"ZK rollup"},{"name":"AVAX C-chain","color":"#22cf22","type":"Sidechain"},{"name":"Boba Network","color":"#171723","type":"Optimistic rollup"},{"name":"Loopring","color":"#4a1173","type":"ZK rollup"}]'),
        maxData: JSON.parse('{"tps":{"Ethereum":{"date":"2021-11-04T10:34:56","value":98.17518248175183},"Arbitrum One":{"date":"2021-11-06T05:18:56","value":7},"Optimism":{"date":"2021-11-06T08:38:01.66","value":0.8},"Polygon":{"date":"2021-11-06T05:13:17","value":424.99999999999994},"XDAI":{"date":"2021-11-05T10:38:45","value":109.8076923076923},"ZKSwap":{"date":"2021-11-05T08:24:27","value":0.3026315789473684},"ZKSync":{"date":"2021-11-05T08:06:23","value":0.25923997917751174},"AVAX C-chain":{"date":"2021-11-05T09:34:57","value":35},"Boba Network":{"date":"2021-11-05T09:54:11","value":3},"Loopring":{"date":"2021-11-05T07:43:34","value":0.2736992159657876}},"gps":{"Ethereum":{"date":"2021-11-04T10:34:56","value":30012410},"Arbitrum One":{"date":"2021-11-06T05:18:56","value":3750859.6666666665},"Optimism":{"date":"2021-11-06T08:38:01.66","value":0},"Polygon":{"date":"2021-11-06T05:13:17","value":11492332.727272727},"XDAI":{"date":"2021-11-05T10:38:45","value":3268616.7307692305},"ZKSwap":{"date":"2021-11-05T08:24:27","value":0},"ZKSync":{"date":"2021-11-05T08:06:23","value":0},"AVAX C-chain":{"date":"2021-11-05T09:34:57","value":7982021},"Boba Network":{"date":"2021-11-05T09:54:11","value":493022},"Loopring":{"date":"2021-11-05T07:43:34","value":3642.1952957947256}}}')
      },
      network: "Mainnet",
      excludeSidechains: false,
      modifiedInstantTPS: {},
      mode: "tps"
    }
  }

  intervalRef = -1;
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

    globalGeneralApi.aPIV2MaxGet({provider: 'All', network: this.state.network}, (err, data, res) => {
      let homePageModel = this.state.homePageModel;
      homePageModel.maxData = data;
      this.setState({homePageModel: homePageModel});
    });
    globalInstantDataService.periodicallyGetInstantDataForPage('MainPage', this.updateInstantTPS.bind(this));
  }
  
  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({excludeSidechains : value});
  }

  getFilteredInstantData(state){
    if (state.excludeSidechains){
      let filteredInstantTPSData = {};
      for(let p of state.homePageModel.providerData){
        if (state.homePageModel.providerData.filter(x => x.name == p.name && x.type !== 'Sidechain')){
          filteredInstantTPSData[p.name] = state.homePageModel.selectedInstantData[p.name];
        }
      }
      return filteredInstantTPSData;
    }
    else {
      return state.homePageModel.selectedInstantData;
    }
  }

  updateInstantTPS(data){
    let homePageModel = this.state.homePageModel;
    homePageModel.selectedInstantData = data[this.state.mode];
    homePageModel.allInstantData = data;
    this.setState({homePageModel: homePageModel});
  }

  getProviderData(state){
    return (state.excludeSidechains)?state.homePageModel.providerData.filter(x=>x.type !== "Sidechain"):state.homePageModel.providerData
  }

  modeChanged(mode){
    this.setState({mode: mode});
    globalInstantDataService.getAndCallbackInstantData();
  }
 render(){
  return (
    <>
      <ModeSelector defaultMode={this.state.mode} onChange={this.modeChanged.bind(this)}/>
      <h3>
        Current {formatModeName(this.state.mode)} overview
      </h3>
        <DataStatByType 
            excludeSidechains={this.state.excludeSidechains}
            colorDictionary={this.state.homePageModel.colorDictionary}
            data={this.state.homePageModel.selectedInstantData}
            allData={this.state.homePageModel.allInstantData}
            providerData={this.getProviderData(this.state)}
            providerTypeColorDictionary={this.state.homePageModel.providerTypeColorDictionary}
            mode={this.state.mode}
            split="network"/>
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
      data={this.state.homePageModel.selectedInstantData} 
      allData={this.state.homePageModel.allInstantData}
      colorDictionary={this.state.homePageModel.colorDictionary} 
      maxData={this.state.homePageModel.maxData[this.state.mode]}
      mode={this.state.mode}
      providerData={this.getProviderData(this.state)}/>
      <hr/>
      <h3>
        Current {formatModeName(this.state.mode)} distribution
      </h3>
      <p>
        This is an ordered bar chart of each network's throughput.
      </p>
      <Timeline/>
      <HorizontalBarChart 
        data={this.state.homePageModel.selectedInstantData} 
        colorDictionary={this.state.homePageModel.colorDictionary} 
        mode={this.state.mode}
        providerData={this.getProviderData(this.state)}/>
    </>
  );
}
}
export default MainPage;
