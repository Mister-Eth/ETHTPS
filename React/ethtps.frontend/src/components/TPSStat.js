import * as React from 'react';
import DoughnutChart from './DoughnutChart';

class TPSStat extends React.Component{

  intervalRef = {};

  constructor(props){
    super(props);
  }

  render(){
    return <div className={"tps-stat"}>
     <DoughnutChart tpsData={this.props.data}/>
    </div>
  }
}

export default TPSStat;