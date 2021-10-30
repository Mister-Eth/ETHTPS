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
                  backgroundColor: this.state.backgroundColors,
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }]
              }}/>
        </>;
    }
}

export default HorizontalBarChart;