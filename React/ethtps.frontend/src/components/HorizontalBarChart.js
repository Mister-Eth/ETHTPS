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
      if (previousProps.providerData !== this.props.providerData){
        this.setState({labels: this.props.providerData.map(x => x.name)})
        this.setState({data: this.props.providerData.filter(x=>this.props.data[x.name] !== undefined).map(x => this.props.data[x.name][0].tps)})
        this.setState({backgroundColors: this.props.providerData.map(x => this.props.colorDictionary[x.name])})
      }
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