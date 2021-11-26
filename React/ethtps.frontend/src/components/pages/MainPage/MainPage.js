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
    let allinstantData = JSON.parse('{"tps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":32.33576642335767}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":0.12195121951219512}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0.4}],"Polygon":[{"date":"0001-01-01T00:00:00","value":63.63636363636363}],"XDAI":[{"date":"0001-01-01T00:00:00","value":1.1538461538461537}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0.05}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0.4026275115919629}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":2}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":0.17721518987341772}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.3240506329113924}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0.005854066485469371}],"Immutable X":[{"date":"0001-01-01T00:00:00","value":0.5666666666666667}],"Metis":[{"date":"0001-01-01T00:00:00","value":0.011111111111111112}]},"gps":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":1775988.1021897811}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":25596.447154471545}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":9083686.363636363}],"XDAI":[{"date":"0001-01-01T00:00:00","value":338372.5}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":236564.66666666666}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":119540.15189873418}],"Loopring":[{"date":"0001-01-01T00:00:00","value":4471.926582278481}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0}],"Immutable X":[{"date":"0001-01-01T00:00:00","value":62383.333333333336}],"Metis":[{"date":"0001-01-01T00:00:00","value":4867.333333333333}]},"gasAdjustedTPS":{"Ethereum":[{"date":"0001-01-01T00:00:00","value":84.5708620090372}],"Arbitrum One":[{"date":"0001-01-01T00:00:00","value":1.2188784359272165}],"Optimism":[{"date":"0001-01-01T00:00:00","value":0}],"Polygon":[{"date":"0001-01-01T00:00:00","value":432.5564935064935}],"XDAI":[{"date":"0001-01-01T00:00:00","value":16.11297619047619}],"ZKSwap":[{"date":"0001-01-01T00:00:00","value":0}],"ZKSync":[{"date":"0001-01-01T00:00:00","value":0}],"AVAX C-chain":[{"date":"0001-01-01T00:00:00","value":11.264984126984126}],"Boba Network":[{"date":"0001-01-01T00:00:00","value":5.692388185654009}],"Loopring":[{"date":"0001-01-01T00:00:00","value":0.21294888487040387}],"Aztec":[{"date":"0001-01-01T00:00:00","value":0}],"Immutable X":[{"date":"0001-01-01T00:00:00","value":2.9706349206349207}],"Metis":[{"date":"0001-01-01T00:00:00","value":0.23177777777777778}]}}');
    this.state = {
      homePageModel: {
        selectedInstantData: allinstantData[mode],
        allInstantData: allinstantData,
        colorDictionary: JSON.parse('{"Ethereum":"#490092","Arbitrum One":"#920000","Optimism":"#006ddb","Polygon":"#004949","XDAI":"#ff6db6","ZKSwap":"#c29a2d","ZKSync":"#db6d00","AVAX C-chain":"#22cf22","Boba Network":"#171723","Loopring":"#4a1173","Aztec":"#5c65cc","Immutable X":"#1c1e33","Metis": "#992699"}'),
        providerTypeColorDictionary:JSON.parse('{"Mainnet":"#4a1173","Optimistic rollup":" #3a7311","ZK rollup":"#116b73","Application-specific rollup":"#8ae5d6","Sidechain":"#002d4d","Validium":"#8ab0e5"}'),
        maxData: JSON.parse('{"tps":{"Ethereum":{"date":"2021-11-06T08:37:37","value":100.80291970802921},"Arbitrum One":{"date":"2021-11-06T08:37:37","value":49},"Optimism":{"date":"2021-11-06T10:37:49.53","value":2.4},"Polygon":{"date":"2021-11-06T08:37:39","value":699.090909090909},"XDAI":{"date":"2021-11-06T10:37:45","value":109.8076923076923},"ZKSwap":{"date":"2021-11-06T07:49:03","value":1.0377358490566038},"ZKSync":{"date":"2021-11-06T08:03:32","value":3.4893617021276597},"AVAX C-chain":{"date":"2021-11-13T13:12:10","value":180},"Boba Network":{"date":"2021-11-06T10:34:14","value":43},"Loopring":{"date":"2021-11-06T08:14:30","value":9.846153846153847},"Aztec":{"date":"2021-11-14T08:05:37","value":0.08967173738991192},"Immutable X":{"date":"2021-11-14T16:22:00","value":28.316666666666666},"Metis":{"date":"2021-11-26T04:47:18","value":0.011111111111111112}},"gps":{"Ethereum":{"date":"2021-11-06T08:37:37","value":30012410},"Arbitrum One":{"date":"2021-11-06T08:37:37","value":20710518},"Optimism":{"date":"2021-11-06T10:37:49.53","value":0},"Polygon":{"date":"2021-11-06T08:37:39","value":16852034.09090909},"XDAI":{"date":"2021-11-06T10:37:45","value":3711262.8846153845},"ZKSwap":{"date":"2021-11-06T07:49:03","value":0},"ZKSync":{"date":"2021-11-06T08:03:32","value":0},"AVAX C-chain":{"date":"2021-11-13T13:12:10","value":15966634},"Boba Network":{"date":"2021-11-06T10:34:14","value":15783583},"Loopring":{"date":"2021-11-06T08:14:30","value":116168.79487179487},"Aztec":{"date":"2021-11-14T08:05:37","value":0},"Immutable X":{"date":"2021-11-14T16:22:00","value":4247500},"Metis":{"date":"2021-11-26T04:47:18","value":4867.333333333333}},"gasAdjustedTPS":{"Ethereum":{"date":"2021-11-06T08:37:37","value":1429.162380952381},"Arbitrum One":{"date":"2021-11-06T08:37:37","value":986.2151428571428},"Optimism":{"date":"2021-11-06T10:37:49.53","value":0},"Polygon":{"date":"2021-11-06T08:37:39","value":802.4778138528138},"XDAI":{"date":"2021-11-06T10:37:45","value":176.72680402930402},"ZKSwap":{"date":"2021-11-06T07:49:03","value":0},"ZKSync":{"date":"2021-11-06T08:03:32","value":0},"AVAX C-chain":{"date":"2021-11-13T13:12:10","value":760.3159047619048},"Boba Network":{"date":"2021-11-06T10:34:14","value":751.5991904761905},"Loopring":{"date":"2021-11-06T08:14:30","value":5.531847374847375},"Aztec":{"date":"2021-11-14T08:05:37","value":0},"Immutable X":{"date":"2021-11-14T16:22:00","value":202.26190476190476},"Metis":{"date":"2021-11-26T04:47:18","value":0.23177777777777778}}}'),
        providerData: JSON.parse('[{"name":"Ethereum","color":"#490092","theoreticalMaxTPS":1428,"type":"Mainnet"},{"name":"Arbitrum One","color":"#920000","theoreticalMaxTPS":40000,"type":"Optimistic rollup"},{"name":"Optimism","color":"#006ddb","theoreticalMaxTPS":20000,"type":"Optimistic rollup"},{"name":"Polygon","color":"#004949","theoreticalMaxTPS":7200,"type":"Sidechain"},{"name":"XDAI","color":"#ff6db6","theoreticalMaxTPS":7000,"type":"Sidechain"},{"name":"ZKSwap","color":"#c29a2d","theoreticalMaxTPS":10000,"type":"ZK rollup"},{"name":"ZKSync","color":"#db6d00","theoreticalMaxTPS":2000,"type":"ZK rollup"},{"name":"AVAX C-chain","color":"#22cf22","theoreticalMaxTPS":380,"type":"Sidechain"},{"name":"Boba Network","color":"#171723","theoreticalMaxTPS":523,"type":"Optimistic rollup"},{"name":"Loopring","color":"#4a1173","theoreticalMaxTPS":2050,"type":"ZK rollup"},{"name":"Aztec","color":"#5c65cc","theoreticalMaxTPS":300,"type":"ZK rollup"},{"name":"Immutable X","color":"#1c1e33","theoreticalMaxTPS":9000,"type":"Validium"},{"name":"Metis","color":"#992699","theoreticalMaxTPS":20000,"type":"Optimistic rollup"}]')
      },
      network: "Mainnet",
      excludeSidechains: false,
      modifiedInstantTPS: {},
      mode: mode
    }
  }

  intervalRef = -1;
  componentDidMount(){

    try{
      globalGeneralApi.aPIV2ProvidersGet((err, data, res) => {
        if (data !== null){
          let homePageModel = this.state.homePageModel;
          homePageModel.providerData = data;
          this.setState({homePageModel: homePageModel});
        }
      });
  
      globalGeneralApi.aPIV2ColorDictionaryGet((err, data, res) => {
        if (data !== null){
          let homePageModel = this.state.homePageModel;
          homePageModel.colorDictionary = data;
          this.setState({homePageModel: homePageModel});
        }
      });
  
      globalGeneralApi.aPIV2ProviderTypesColorDictionaryGet((err, data, res) => {
        if (data !== null){
          let homePageModel = this.state.homePageModel;
          homePageModel.providerTypeColorDictionary = data;
          this.setState({homePageModel: homePageModel});
        }
      });
  
      globalGeneralApi.aPIV2MaxGet({provider: 'All', network: this.state.network}, (err, data, res) => {
        if (data !== null){
          let homePageModel = this.state.homePageModel;
          homePageModel.maxData = data;
          this.setState({homePageModel: homePageModel});
        }
      });
    }
    catch{
      window.location.reload();
    }

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
    try{
      let homePageModel = this.state.homePageModel;
      homePageModel.selectedInstantData = data[this.state.mode];
      homePageModel.allInstantData = data;
      this.setState({homePageModel: homePageModel});
    }
    catch{
      
    }
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
