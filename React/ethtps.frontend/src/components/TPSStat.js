import * as React from 'react';
import API from '../services/api'
import DoughnutChart from './DoughnutChart';

class TPSStat extends React.Component{

  intervalRef = {};

  constructor(props){
    super(props);

    this.state = {
      tps: 0,
      includeSidechains: false,
      tpsData: []
    };

    this.api = new API("https://api.ethtps.info/API/v2");
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  async handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log('input changed to ' + value)
    this.setState({includeSidechains : value});
    await this.updateTPSContinuously();
  }

  render(){
    return <div class="tps-stat">
      <DoughnutChart tpsData={this.state.tpsData} includeSidechains={this.state.includeSidechains}/>
      <label class="small">
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
    console.log('Cleared interval ref #' + this.intervalRef)
    await this.updateTPS(this.state.includeSidechains);
    this.intervalRef = setInterval(async()=>{await this.updateTPS(this.state.includeSidechains)}, 5000);
    console.log('Created interval ref #' + this.intervalRef)
  }

  async updateTPS(includeSidechains){
    let tpsData = await this.api.getTPS("Any", "Instant", "Mainnet", includeSidechains);
    this.state.tpsData = tpsData;
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