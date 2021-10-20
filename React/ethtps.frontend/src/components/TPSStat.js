import * as React from 'react';
import API from '../services/api'
import DoughnutChart from './DoughnutChart';

class TPSStat extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      tps: 0,
      includeSidechains: false,
      tpsData: []
    };

    this.api = new API("http://localhost:10202/API/v2");
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
    this.updateTPS();
  }

  render(){
    return <div class="tps-stat">
      <DoughnutChart tpsData={this.state.tpsData} includeSidechains={this.state.includeSidechains}/>
      <label class="small">
        Include sidechains?
      <input
            name="includeSidechains" type="checkbox"
            checked={this.state.includeSidechains}
            onChange={this.handleInputChange} />
      </label>
    </div>
  }

  updateTPSContinuously(){
    setInterval(()=>{this.updateTPS()}, 2000);
  }

  async updateTPS(){
    let tpsData = await this.api.getTPS("Any", "Instant", "Mainnet", this.state.includeSidechains);
    this.state.tpsData = tpsData;
    let totalTPS = tpsData.map(x => (Math.round(x.tps * 100) / 100)).reduce((a,b) => a+b) / 2;
    totalTPS = totalTPS.toString();
    totalTPS = totalTPS.substr(0, totalTPS.indexOf('.') + 3);
    this.setState({tps:totalTPS});
  }

  componentDidMount() {
    this.updateTPS();
    this.updateTPSContinuously();
  }
}

export default TPSStat;