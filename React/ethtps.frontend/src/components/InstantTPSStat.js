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
        if (previousProps.data !== this.props.data){
            this.setState({labels: this.props.providerData.map(x => x.name)})
            let datasets = this.props.providerData.filter(x=>this.props.data[x.name] !== undefined).map(x => this.createDataset(x));
            this.setState({datasets: datasets})
            this.setState({backgroundColors: this.props.providerData.map(x => this.props.colorDictionary[x.name])})
            this.setState({max: datasets.map(x=>x.data[0]).reduce((a, b) => a + b)})
        }
      }

    render(){
        return <>
        <center>
            <h4 className={'tooltip'}>
                Ethereum currently does {parseFloat(this.state.max.toString()).toFixed(2)} TPS
                <span class="tooltiptext">This includes L2s, sidechains (if the box below is checked), validiums etc.</span>
            </h4>
        </center>
        <Bar data={{
                labels: ["TPS"],
                datasets: this.state.datasets
              }} 
              height={25}
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
                    max: this.state.max,
                    ticks:{
                        display:false
                    },
                    grid:{
                        display:false
                    }
                  },
                  y: {
                    stacked: true,
                    ticks:{
                        display:false
                    },
                    grid:{
                        display:false
                    }
                  }
                }
              }}/>
        </>;
    }
}

export default InstantTPSStat;