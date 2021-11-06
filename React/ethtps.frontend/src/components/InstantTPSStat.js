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
            max: 1,
            data: [],
            providerData: []
          }
    }


    componentDidUpdate(previousProps, previousState){
        if (previousProps.data !== this.props.data){
            this.setState({data: this.props.data})
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary){
            this.setState({colorDictionary: this.props.colorDictionary});
        }
        if (previousProps.providerData !== this.props.providerData){
            this.setState({providerData: this.props.providerData});
        }
      }

    createDataset(x, data, colorDictionary){
        return{
            label: x.name,
            data: [data[x.name][0].tps],
            backgroundColor: colorDictionary[x.name],
        }
    }

    createDatasets(state){
        if (state.providerData.length === 0 || state.data.length === 0 || state.colorDictionary === undefined)
            return [{}];
        let datasets = state.providerData.filter(x=>state.data[x.name] !== undefined).map(x => this.createDataset(x, state.data, state.colorDictionary));
        return datasets;
    }

    calculateTotalTPS(state){
        if (state.data === undefined || state.data.length === 0)
            return 20;
        
        let t = state.providerData.filter(x=>state.data[x.name] !== undefined).map(x=>state.data[x.name][0].tps);
        if (t.length === 0){
            return 0;
        }
        return t.reduce((a, b) => a + b);
    }

    render(){
        if (this.state.data === null){
            return<></>
        }
        return <>
        <center>
            <h4 className={'tooltip'}>
                Ethereum currently does {parseFloat(this.calculateTotalTPS(this.state).toString()).toFixed(2)} TPS
                <span className={'tooltiptext'}>This includes L2s, sidechains (if the box below is unchecked), ZK rollups, validiums etc.</span>
            </h4>
        </center>
        <Bar data={{
                labels: ["TPS"],
                datasets: this.createDatasets(this.state)
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
                    max: this.calculateTotalTPS(this.state),
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