import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import API from '../services/api'

class TPSStat extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      tps: 0,
      includeSidechains: false
    };

    this.api = new API("http://localhost:10202/API");
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  render(){
    return <div class="tps-stat">
      <p class="small">
        Ethereum currently does
      </p>
      <p>
        {this.state.tps} TPS
      </p>
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
    let tpsData = await this.api.getTPS("Any", "Instant");
    if (!this.state.includeSidechains){
      let dd = await this.api.getProviderTypes();
      console.log(dd)
      let sidechainID = (dd).filter(x=>x.name==="Sidechain").first().id;
      let providers = await this.api.getProviders();
      tpsData = tpsData.filter(x=>providers.any(y=>y.name==x.name && y.type!=sidechainID));
    }
    let totalTPS = tpsData.map(x => (Math.round(x.tps * 100) / 100)).reduce((a,b) => a+b);
    this.setState({tps:totalTPS});
  }

  componentDidMount() {
    this.updateTPS();
    this.updateTPSContinuously();
  }
}

export default TPSStat;