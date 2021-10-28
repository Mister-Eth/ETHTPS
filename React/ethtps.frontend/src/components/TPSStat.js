import * as React from 'react';
import { globalApi, providerExclusionList, liveTPSObservable } from '../services/common';
import DoughnutChart from './DoughnutChart';

class TPSStat extends React.Component{

  intervalRef = {};

  constructor(props){
    super(props);

    this.state = {
      tps: 0,
      includeSidechains: true,
      tpsData: []
    };

    this.api = globalApi;

    providerExclusionList.registerOnProviderExcluded(async providerName =>{
      await this.updateTPSContinuously();
      await this.updateTPS();
      
    });

    providerExclusionList.registerOnProviderIncluded(async providerName =>{
      await this.updateTPSContinuously();
      await this.updateTPS();

    });
  }

  render(){
    return <div className={"tps-stat"}>
     <DoughnutChart tpsData={this.state.tpsData} includeSidechains={this.state.includeSidechains}/>
    </div>
  }

  async updateTPSContinuously(){
    clearInterval(this.intervalRef);
    await this.updateTPS(this.state.includeSidechains);
    this.intervalRef = setInterval(async()=>{await this.updateTPS(this.state.includeSidechains)}, 5000);
  }

  async updateTPS(includeSidechains){
    let tpsData = await this.api.getInstantTPS(includeSidechains);
    liveTPSObservable.tpsChanged(tpsData);
    this.setState({tpsData: tpsData})
  }

  async componentDidMount() {
    await this.updateTPSContinuously();
  }
}

export default TPSStat;