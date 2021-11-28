import { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { formatModeName } from '../services/common'

class HorizontalBarChart extends Component{
    constructor(props){
        super(props);

        let height = props.height;
        this.state = {
          labels: [],
          data: props.data,
          backgroundColors: [],
          colorDictionary: props.colorDictionary,
          providerData: props.providerData,
          mode: props.mode,
          height: (height !== undefined)?height:250
        }
    }
    /*
    
        let [labels, data] = this.orderDataDescending(this.props.providerData.map(x => x.name), this.props.providerData.filter(x=>this.props.data[x.name] !== undefined).map(x => this.props.data[x.name][0].value));
        this.setState({labels: labels})
    */
    componentDidUpdate(previousProps, previousState){
      if (previousProps.data !== this.props.data){
        this.setState({data: this.props.data})
      }
      if (previousProps.colorDictionary !== this.props.colorDictionary){
        this.setState({colorDictionary: this.props.colorDictionary});
      }
      if (previousProps.excludeSidechains !== this.props.excludeSidechains){
        this.setState({excludeSidechains: this.props.excludeSidechains});
      }
      if (previousProps.providerData !== this.props.providerData){
        this.setState({providerData: this.props.providerData});
      }
      if (previousProps.mode !== this.props.mode){
        this.setState({mode: this.props.mode});
      }
    }

    orderDataDescending(arrayLabel, arrayData){
      let arrayOfObj = arrayLabel.map(function(d, i) {
        return {
          label: d,
          data: arrayData[i] || 0
        };
      });
      
      let sortedArrayOfObj = arrayOfObj.sort(function(a, b) {
        return b.data>a.data;
      });
      
      let newArrayLabel = [];
      let newArrayData = [];
      sortedArrayOfObj.forEach(function(d){
        newArrayLabel.push(d.label);
        newArrayData.push(d.data);
      });
      return [newArrayLabel, newArrayData];
    }

    /**
     * 
     * @param {{
                labels: this.state.labels,
                datasets: [{
                  label: 'Current TPS',
                  data: this.state.data,
                  backgroundColor: this.state.backgroundColors
                }]
              }} state 
     */
    createChartData(state){
      if (state.data.length == 0) 
        return {
          labels: [],
          datasets: [{
            label: 'Current ' + formatModeName(this.state.mode),
            data: [],
            backgroundColor: []
          }]
        }

      let labels = state.providerData.map(x => x.name);
      let data = [];
      for(let label of labels){
        let t = state.data[label];
        if (t === undefined)
          continue;
        data.push(t[0].value);
      }
      let [orderedLabels, orderedData] = this.orderDataDescending(labels, data);
      let colors = [];
      for(let label of orderedLabels){
        colors.push(state.colorDictionary[label]);
      }
      return {
        labels: orderedLabels,
        datasets: [{
          label: 'Current ' + formatModeName(this.state.mode),
          data: orderedData,
          backgroundColor: colors
        }]
      };
    }

    render(){
        return <>
            <Bar data={this.createChartData(this.state)} 
            height={this.state.height}
              options={{
                indexAxis: 'y',
                plugins:{
                  legend:{
                    display:false
                  }
                }
              }}/>
        </>;
    }
}

export default HorizontalBarChart;