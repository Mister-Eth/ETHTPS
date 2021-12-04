import { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { formatModeName, capitalizeFirstLetter } from '../../../../../../services/common';

class InstantDataStat extends Component{
    constructor(props){
        super(props);

        this.state = {
            labels: [],
            datasets: [{
                data: [1]
            }],
            backgroundColors: [],
            max: 1,
            data: props.data,
            providerData: props.providerData,
            mode: props.mode,
            colorDictionary: props.colorDictionary
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
        if (previousProps.mode !== this.props.mode){
            this.setState({mode: this.props.mode});
        }
      }

    createDataset(x, data, colorDictionary){
        return{
            label: x.name,
            data: [data[x.name][0].value],
            backgroundColor: colorDictionary[x.name],
        }
    }

    createDatasets(state){
        if (state.data === undefined || state.providerData === undefined ||state.providerData.length === 0 || state.data.length === 0 || state.colorDictionary === undefined)
            return [{}];
        let datasets = state.providerData.filter(x=>state.data[x.name] !== undefined && state.data[x.name][0] !== null).map(x => this.createDataset(x, state.data, state.colorDictionary));
        return datasets;
    }

    calculateTotalData(state){
        if (state.data === undefined || state.data.length === 0)
            return 20;
        
        let t = state.providerData.filter(x=>state.data[x.name] !== undefined  && state.data[x.name][0] !== null).map(x=>state.data[x.name][0].value);
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
        <Bar data={{
                labels: [""],
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
                    max: this.calculateTotalData(this.state),
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

export default InstantDataStat;