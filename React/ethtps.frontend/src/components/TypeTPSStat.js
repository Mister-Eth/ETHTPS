import { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class TypeTPSStat extends Component{
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
      }

    createDatasets(state){
        if (state.providerData.length === 0 || state.data.length === 0 || state.colorDictionary === undefined)
            return [{}];
        let datasets = [];
        for(let p of state.providerData.filter(x=>state.data[x.name] !== undefined)){
            if (datasets.filter(x => x.label === p.type).length == 0){
                datasets.push({
                    label: p.type,
                    data: [0],
                    backgroundColor: state.colorDictionary[p.type]
                });
            }
            datasets.filter(x => x.label === p.type)[0].data[0] += state.data[p.name][0].tps;
        }
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
        return <>
        <Bar data={{
                labels: ["Network type"],
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

export default TypeTPSStat;