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
      tps: 0
    };

    this.api = new API("http://localhost:10202/API");
  }

  render(){
    return <div>
      {this.state.tps} TPS
    </div>
  }

  updateTPSContinuously(){
    setInterval(()=>{this.updateTPS()}, 1000);
  }

  async updateTPS(){
    let tpsData = await this.api.getTPS("Any", "Instant");
    let totalTPS = tpsData.map(x=>x.tps).reduce((a,b)=>a+b);
    this.setState({tps:totalTPS});
  }

  componentDidMount() {
    this.updateTPS();
    this.updateTPSContinuously();
  }
}

export default TPSStat;