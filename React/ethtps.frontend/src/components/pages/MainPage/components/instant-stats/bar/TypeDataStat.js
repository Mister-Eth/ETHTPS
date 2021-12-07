import { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { formatModeName, capitalizeFirstLetter } from '../../../../../../services/common';

class TypeDataStat extends Component{
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
            mode: props.mode,
            providerData: props.providerData,
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

    createDatasets(state){
        if (state.providerData === undefined || state.data === undefined || state.colorDictionary === undefined){
            return [{}];
        }
        if (state.providerData.length === 0 || state.data.length === 0)
            return [{}];
        let datasets = [];
        for(let p of state.providerData.filter(x=>state.data[x.name] !== undefined && state.data[x.name][0] !== null)){
            if (datasets.filter(x => x.label === p.type).length == 0){
                datasets.push({
                    label: p.type,
                    data: [0],
                    backgroundColor: state.colorDictionary[p.type]
                });
            }
            datasets.filter(x => x.label === p.type)[0].data[0] += state.data[p.name][0].value;
        }
        return datasets;
    }

    calculateTotalData(state){
        if (state.data === undefined || state.data.length === 0)
            return 20;
        
        let t = state.providerData.filter(x=>state.data[x.name] !== undefined && state.data[x.name][0] !== null).map(x=>state.data[x.name][0].value);
        if (t.length === 0){
            return 0;
        }
        return t.reduce((a, b) => a + b);
    }

    render(){
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

export default TypeDataStat;