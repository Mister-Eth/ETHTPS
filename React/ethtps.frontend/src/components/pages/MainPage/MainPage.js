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
    let allinstantData = JSON.parse('{"tps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":5.328467153284672}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":0.13043478260869565}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0.2}],"Polygon":[{"date":"0001-01-01T00:00:00","value":81.81818181818181}],"XDAI":[{"date":"0001-01-01T00:00:00","value":1.923076923076923}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0.05673758865248227}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0.3173854447439353}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":42}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.00510204081632653}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.12759787336877718}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0.08967173738991192}],"Immutable X":[{"date":"0001-01-01T00:00:00","value":0.11666666666666667}]},"gps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":208343.72262773724}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":18171.91304347826}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":9478696.363636363}],"XDAI":[{"date":"0001-01-01T00:00:00","value":348610.9615384615}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":5496415}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":226.07142857142858}],"Loopring":[{"date":"0001-01-01T00:00:00","value":2181.6466892218464}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0}],"Immutable X":[{"date":"0001-01-01T00:00:00","value":0}]},"gasAdjustedTPS":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":9.921129648939868}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":0.8653291925465838}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":451.3664935064935}],"XDAI":[{"date":"0001-01-01T00:00:00","value":16.600521978021977}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":261.7340476190476}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.01076530612244898}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.10388793758199269}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0}],"Immutable X":[{"date":"0001-01-01T00:00:00","value":0}]}}');
    this.state = {
      homePageModel: {
        selectedInstantData: allinstantData[mode],
        allInstantData: allinstantData,
        colorDictionary: JSON.parse('{"Ethereum":"#490092","Arbitrum One":"#920000","Optimism":"#006ddb","Polygon":"#004949","XDAI":"#ff6db6","ZKSwap":"#c29a2d","ZKSync":"#db6d00","AVAX C-chain":"#22cf22","Boba Network":"#171723","Loopring":"#4a1173","Aztec":"#5c65cc","Immutable X":"#1c1e33"}'),
        providerTypeColorDictionary:JSON.parse('{"Mainnet":"#4a1173","Optimistic rollup":" #3a7311","ZK rollup":"#116b73","Application-specific rollup":"#8ae5d6","Sidechain":"#002d4d","Validium":"#8ab0e5"}'),
        maxData: JSON.parse('{"tps":{"Ethereum":{"date":"2021-11-04T10:34:56","value":98.17518248175183},"Arbitrum One":{"date":"2021-11-06T05:18:56","value":7},"Optimism":{"date":"2021-11-06T08:38:01.66","value":0.8},"Polygon":{"date":"2021-11-06T05:13:17","value":424.99999999999994},"XDAI":{"date":"2021-11-05T10:38:45","value":109.8076923076923},"ZKSwap":{"date":"2021-11-05T08:24:27","value":0.5612244897959183},"ZKSync":{"date":"2021-11-05T08:06:23","value":0.3299406276505513},"AVAX C-chain":{"date":"2021-11-05T09:34:57","value":119},"Boba Network":{"date":"2021-11-05T09:54:11","value":3},"Loopring":{"date":"2021-11-05T07:43:34","value":0.2736992159657876},"Aztec":{"date":"2021-11-14T08:05:37","value":0.08967173738991192},"Immutable X":{"date":"2021-11-14T15:48:00","value":3.3333333333333335}},"gps":{"Ethereum":{"date":"2021-11-04T10:34:56","value":30012410},"Arbitrum One":{"date":"2021-11-06T05:18:56","value":3750859.6666666665},"Optimism":{"date":"2021-11-06T08:38:01.66","value":0},"Polygon":{"date":"2021-11-06T05:13:17","value":11492332.727272727},"XDAI":{"date":"2021-11-05T10:38:45","value":3268762.1153846155},"ZKSwap":{"date":"2021-11-05T08:24:27","value":0},"ZKSync":{"date":"2021-11-05T08:06:23","value":0},"AVAX C-chain":{"date":"2021-11-05T09:34:57","value":7997695},"Boba Network":{"date":"2021-11-05T09:54:11","value":493022},"Loopring":{"date":"2021-11-05T07:43:34","value":3642.1952957947256},"Aztec":{"date":"2021-11-14T08:05:37","value":0},"Immutable X":{"date":"2021-11-14T15:48:00","value":0}},"gasAdjustedTPS":{"Ethereum":{"date":"2021-11-04T10:34:56","value":1429.162380952381},"Arbitrum One":{"date":"2021-11-06T05:18:56","value":178.61236507936508},"Optimism":{"date":"2021-11-06T08:38:01.66","value":0},"Polygon":{"date":"2021-11-06T05:13:17","value":547.2539393939394},"XDAI":{"date":"2021-11-05T10:38:45","value":155.65533882783885},"ZKSwap":{"date":"2021-11-05T08:24:27","value":0},"ZKSync":{"date":"2021-11-05T08:06:23","value":0},"AVAX C-chain":{"date":"2021-11-05T09:34:57","value":380.84261904761905},"Boba Network":{"date":"2021-11-05T09:54:11","value":23.477238095238096},"Loopring":{"date":"2021-11-05T07:43:34","value":0.17343787122832027},"Aztec":{"date":"2021-11-14T08:05:37","value":0},"Immutable X":{"date":"2021-11-14T15:48:00","value":0}}}'),
        providerData: JSON.parse('[{"name":"Ethereum","color":"#490092","type":"Mainnet"},{"name":"Arbitrum One","color":"#920000","type":"Optimistic rollup"},{"name":"Optimism","color":"#006ddb","type":"Optimistic rollup"},{"name":"Polygon","color":"#004949","type":"Sidechain"},{"name":"XDAI","color":"#ff6db6","type":"Sidechain"},{"name":"ZKSwap","color":"#c29a2d","type":"ZK rollup"},{"name":"ZKSync","color":"#db6d00","type":"ZK rollup"},{"name":"AVAX C-chain","color":"#22cf22","type":"Sidechain"},{"name":"Boba Network","color":"#171723","type":"Optimistic rollup"},{"name":"Loopring","color":"#4a1173","type":"ZK rollup"},{"name":"Aztec","color":"#5c65cc","type":"ZK rollup"},{"name":"Immutable X","color":"#1c1e33","type":"Validium"}]')
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
