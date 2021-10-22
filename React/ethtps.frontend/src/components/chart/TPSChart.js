import * as React from 'react';
import IntervalSelector from './IntervalSelector';
import ScaleSelector from './ScaleSelector';
import globalApi from '../../services/common';

class TPSChart extends React.Component {
    constructor(props){
        super(props);

        this.api = globalApi;
        this.state = {
            intervals: []
        } 
    }

    render(){
        return <>
        <div>
            <IntervalSelector intervals={this.state.intervals}></IntervalSelector>
            <div>

            </div>
            <ScaleSelector></ScaleSelector>
        </div>
        </>;
    }

    componentDidMount(){
        this.setState({intervals: this.api.getIntervals()})
        console.log(this.api)
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