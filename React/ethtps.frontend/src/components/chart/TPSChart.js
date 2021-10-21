import * as React from 'react';
import IntervalSelector from './IntervalSelector';
import ScaleSelector from './ScaleSelector';
import globalApi from '../../services/common';

class TPSChart extends React.Component {
    constructor(props){
        super(props);

        this.api = globalApi;
    }

    intervals;

    render(){
        return <>
        <div>
            <IntervalSelector intervals={this.intervals}></IntervalSelector>
            <div>

            </div>
            <ScaleSelector></ScaleSelector>
        </div>
        </>;
    }

    async componentDidMount(){
        this.intervals = await this.api.getIntervals();
        console.log(await this.api.getIntervals())
        this.update();
      }
  
      componentWillUnmount() {
          
      }
  
      shouldComponentUpdate(nextProps, nextState){
          this.update();
          return true;
      }

      update(){
      }
}    

export default TPSChart;