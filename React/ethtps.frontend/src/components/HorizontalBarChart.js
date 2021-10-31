import { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class HorizontalBarChart extends Component{
    constructor(props){
        super(props);

        this.state = {
          labels: [],
          data: [],
          backgroundColors: []
        }
    }

    componentDidUpdate(previousProps, previousState){
      if (previousProps.data !== this.props.data){
        let [labels, data] = this.orderDataDescending(this.props.providerData.map(x => x.name), this.props.providerData.filter(x=>this.props.data[x.name] !== undefined).map(x => this.props.data[x.name][0].tps));
        this.setState({labels: labels})
        this.setState({data: data})
        this.setState({backgroundColors: this.props.providerData.map(x => this.props.colorDictionary[x.name])})
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

    render(){
        return <>
            <Bar data={{
                labels: this.state.labels,
                datasets: [{
                  label: 'Current TPS',
                  data: this.state.data,
                  backgroundColor: this.state.backgroundColors
                }]
              }} 
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