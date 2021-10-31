import { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class InstantTPSStat extends Component{
    constructor(props){
        super(props);

        this.state = {
            labels: [],
            datasets: [{
                data: [1]
            }],
            backgroundColors: [],
            max: 1
          }
    }

    createDataset(x){
        return{
            label: x.name,
            data: [this.props.data[x.name][0].tps],
            backgroundColor: this.props.colorDictionary[x.name],
        }
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.providerData !== this.props.providerData){
            this.setState({labels: this.props.providerData.map(x => x.name)})
            this.setState({datasets: this.props.providerData.filter(x=>this.props.data[x.name] !== undefined).map(x => this.createDataset(x))})
            this.setState({backgroundColors: this.props.providerData.map(x => this.props.colorDictionary[x.name])})
        }
      }

    render(){
        return <>
        <Bar data={{
                labels: ["TPS"],
                datasets: this.state.datasets
              }} 
              options={{
                indexAxis: 'y',
                plugins:{
                  legend:{
                    display:false
                  }
                },
                scales: {
                  x: {
                    stacked: true,
                    max: this.state.datasets.map(x=>x.data[0]).reduce((a, b) => a + b)
                  },
                  y: {
                    stacked: true,
                    ticks:{
                        display:false
                    }
                  }
                }
              }}/>
        </>;
    }
}

export default InstantTPSStat;