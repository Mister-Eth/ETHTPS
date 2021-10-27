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
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({includeSidechains : value});
    if (value){
      await providerExclusionList.includeSidechains();
    }
    else{
      await providerExclusionList.excludeSidechains();
    }
    await this.updateTPS();
    await this.updateTPSContinuously();
  }

  render(){
    return <div className={"tps-stat"}>
     <DoughnutChart tpsData={this.state.tpsData} includeSidechains={this.state.includeSidechains}/>
   <br></br>
      <label className={"small"}>
        Include sidechains?
      <input
            ref={ref=>this.includeSidechainsCheckBox = ref}
            name="includeSidechains" type="checkbox"
            checked={this.state.includeSidechains}
            onChange={this.handleInputChange} />
      </label>
    </div>
  }

  shouldComponentUpdate(nextProps, nextState){
    this.forceUpdate();
    return true;
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
    let totalTPS = tpsData.map(x => (Math.round(x.tps * 100) / 100)).reduce((a,b) => a+b);
    totalTPS = totalTPS.toString();
    totalTPS = totalTPS.substr(0, totalTPS.indexOf('.') + 3);
    this.setState({tps:totalTPS});
    this.forceUpdate();
  }

  async componentDidMount() {
    await this.updateTPSContinuously();
  }
}

export default TPSStat;