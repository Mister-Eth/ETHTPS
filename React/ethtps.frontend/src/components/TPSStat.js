import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

class TPSStat extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div>
      {this.props.tps} TPS
    </div>
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('https://api.ethtps.info/API/GetTPS?provider=Any&interval=Instant')
        .then(response => response.json())
        .then(data => this.setState({ tps: data.map(x => x.tps).sum() }));
}
}

export default TPSStat;