import '../../..//App.css';
import { globalGeneralApi, formatModeName, globalInstantDataService } from '../../../services/common';
import React, { ReactDOM, useState, useEffect } from "react";
import Timeline from '../../Timeline';
import HorizontalBarChart from '../../HorizontalBarChart';
import ProviderTable from './components/ProviderTable';
import DataStatByType from './components/instant-stats/DataStatByType';
import ModeSelector from './ModeSelector';
import * as qs from 'query-string';
import HistoricalChart from '../../charts/HistoricalChart';

class MainPage extends React.Component {

  constructor(props){
    super(props);

    let queryStringMode =  qs.parse(window.location.search).mode;
    let mode = 'tps';
    if (queryStringMode !== undefined){
      if (queryStringMode === "gps" || queryStringMode === "tps" || queryStringMode === "gasAdjustedTPS"){
        mode = queryStringMode;
      }
    }
    let allinstantData = JSON.parse('{"tps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":23.72262773722628}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":0.23255813953488372}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0.2}],"Polygon":[{"date":"0001-01-01T00:00:00","value":8.181818181818182}],"XDAI":[{"date":"0001-01-01T00:00:00","value":1.923076923076923}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0.004761904761904762}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0.31636863823933975}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":4.5}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.008771929824561403}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.1103448275862069}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0.010145846544071021}]},"gps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":2183877.5182481753}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":91576.18604651163}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":9162482.272727272}],"XDAI":[{"date":"0001-01-01T00:00:00","value":316755.76923076925}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":500128.5}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":3460.1988304093566}],"Loopring":[{"date":"0001-01-01T00:00:00","value":2395.226369168357}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0}]},"gasAdjustedTPS":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":103.9941675356274}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":4.360770764119602}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":436.3086796536796}],"XDAI":[{"date":"0001-01-01T00:00:00","value":15.083608058608059}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":23.81564285714286}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.164771372876636}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.11405839853182652}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0}]}}');
    this.state = {
      homePageModel: {
        selectedInstantData: allinstantData[mode],
        allInstantData: allinstantData,
        colorDictionary: JSON.parse('{"Ethereum":"#490092","Arbitrum One":"#920000","Optimism":"#006ddb","Polygon":"#004949","XDAI":"#ff6db6","ZKSwap":"#c29a2d","ZKSync":"#db6d00","AVAX C-chain":"#22cf22","Boba Network":"#171723","Loopring":"#4a1173","Aztec":"#5c65cc"}'),
        providerTypeColorDictionary:JSON.parse('{"Mainnet":"#4a1173","Optimistic rollup":" #3a7311","ZK rollup":"#116b73","Application-specific rollup":"#8ae5d6","Sidechain":"#002d4d"}'),
        providerData: JSON.parse('[{"name":"Ethereum","color":"#490092","type":"Mainnet"},{"name":"Arbitrum One","color":"#920000","type":"Optimistic rollup"},{"name":"Optimism","color":"#006ddb","type":"Optimistic rollup"},{"name":"Polygon","color":"#004949","type":"Sidechain"},{"name":"XDAI","color":"#ff6db6","type":"Sidechain"},{"name":"ZKSwap","color":"#c29a2d","type":"ZK rollup"},{"name":"ZKSync","color":"#db6d00","type":"ZK rollup"},{"name":"AVAX C-chain","color":"#22cf22","type":"Sidechain"},{"name":"Boba Network","color":"#171723","type":"Optimistic rollup"},{"name":"Loopring","color":"#4a1173","type":"ZK rollup"},{"name":"Aztec","color":"#5c65cc","type":"ZK rollup"}]'),
        maxData: JSON.parse('{"tps":{"Ethereum":{"date":"2021-11-06T08:37:37","value":100.80291970802921},"Arbitrum One":{"date":"2021-11-06T08:37:37","value":11},"Optimism":{"date":"2021-11-06T10:37:49.53","value":2.2},"Polygon":{"date":"2021-11-06T08:37:39","value":699.090909090909},"XDAI":{"date":"2021-11-06T10:37:45","value":109.8076923076923},"ZKSwap":{"date":"2021-11-06T07:49:03","value":0.671875},"ZKSync":{"date":"2021-11-06T08:03:32","value":0.37525458248472504},"AVAX C-chain":{"date":"2021-11-13T13:12:10","value":119},"Boba Network":{"date":"2021-11-06T10:34:14","value":7},"Loopring":{"date":"2021-11-06T08:14:30","value":9.846153846153847},"Aztec":{"date":"2021-11-14T08:05:37","value":0.010145846544071021}},"gps":{"Ethereum":{"date":"2021-11-06T08:37:37","value":30012410},"Arbitrum One":{"date":"2021-11-06T08:37:37","value":15897688},"Optimism":{"date":"2021-11-06T10:37:49.53","value":0},"Polygon":{"date":"2021-11-06T08:37:39","value":16852034.09090909},"XDAI":{"date":"2021-11-06T10:37:45","value":3711262.8846153845},"ZKSwap":{"date":"2021-11-06T07:49:03","value":0},"ZKSync":{"date":"2021-11-06T08:03:32","value":0},"AVAX C-chain":{"date":"2021-11-13T13:12:10","value":9265506},"Boba Network":{"date":"2021-11-06T10:34:14","value":1568729},"Loopring":{"date":"2021-11-06T08:14:30","value":116168.79487179487},"Aztec":{"date":"2021-11-14T08:05:37","value":0}},"gasAdjustedTPS":{"Ethereum":{"date":"2021-11-06T08:37:37","value":1429.162380952381},"Arbitrum One":{"date":"2021-11-06T08:37:37","value":757.0327619047619},"Optimism":{"date":"2021-11-06T10:37:49.53","value":0},"Polygon":{"date":"2021-11-06T08:37:39","value":802.4778138528138},"XDAI":{"date":"2021-11-06T10:37:45","value":176.72680402930402},"ZKSwap":{"date":"2021-11-06T07:49:03","value":0},"ZKSync":{"date":"2021-11-06T08:03:32","value":0},"AVAX C-chain":{"date":"2021-11-13T13:12:10","value":441.21457142857145},"Boba Network":{"date":"2021-11-06T10:34:14","value":74.70138095238096},"Loopring":{"date":"2021-11-06T08:14:30","value":5.531847374847375},"Aztec":{"date":"2021-11-14T08:05:37","value":0}}}')
      },
      network: "Mainnet",
      excludeSidechains: false,
      modifiedInstantTPS: {},
      mode: mode
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
  let optionalGasAdjustedText = "";
  if (this.state.mode === "gasAdjustedTPS"){
    optionalGasAdjustedText = "The gas-adjusted TPS value of a network is calculated by dividing the total gas used by the network at any time by 21,000 gas (the gas cost of a simple ETH transfer). In other words, this value represents the theoretical number of transactions per second a network were to do if all transactions were simple ETH transfers.";
  }
  return (
    <>
      <ModeSelector defaultMode={this.state.mode} onChange={this.modeChanged.bind(this)}/>
      <h3>
        Current {formatModeName(this.state.mode)} overview
      </h3>
      <p>
      {optionalGasAdjustedText}
      </p>
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
      allMaxData={this.state.homePageModel.maxData}
      mode={this.state.mode}
      providerData={this.getProviderData(this.state)}/>
      <hr/>
      <h3>
        Historical {formatModeName(this.state.mode)} distribution
      </h3>
      <p>
        This is a stacked line chart of all networks' historical throughput.
      </p>
      <Timeline/>
      <HistoricalChart 
        height={200}
        interval="1h"
        mode={this.state.mode}
        colorDictionary={this.state.homePageModel.colorDictionary} 
        provider="All"
        scale="lin"
        network={this.state.network} />
      {/*
      <HorizontalBarChart 
        data={this.state.homePageModel.selectedInstantData} 
        colorDictionary={this.state.homePageModel.colorDictionary} 
        mode={this.state.mode}
        providerData={this.getProviderData(this.state)}/>
      */}
    </>
  );
}
}
export default MainPage;
