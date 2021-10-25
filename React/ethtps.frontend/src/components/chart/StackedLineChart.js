import * as React from 'react';
import IntervalSelector from './IntervalSelector';
import ScaleSelector from './ScaleSelector';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../services/theme';
import { Line } from "react-chartjs-2";
import Stack from '@mui/material/Stack';
import globalApi from '../../services/common';
import CircularProgress from '@mui/material/CircularProgress';

class StackedLineChart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            scale: this.transformScale(props.scale),
            interval: props.interval,
            loadingPercentage: 10,
            datasets: [],
            xData: [],
            min: 0.01,
            max: 100
        }
        this.buildDatasets(props.interval);
    }

    transformScale(scale){
        switch (scale){
            case "LOG":
                return "logarithmic";
            default:
                return "linear";
        }
    }

    buildDataPoint(x){
        return {
            label: x[0].provider,
            fill: true,
            borderColor: x[0].color,
            //backgroundColor: x[0].color,
            pointBackgroundColor: x[0].color,
            pointHighlightStroke: x[0].color,
            borderCapStyle: 'butt',
            data: x.filter(y => y.tps > 0.01).map(y => y.tps),
            tension: 0.3,
            pointRadius: 2,
            backgroundColor: 'transparent',
            pointHitRadius: 10
        }
    }

    setMinAndMax(data){
        let tps = data.filter(x => x.length > 0).map(x => x.filter(y => y.tps > 0.01).map(y => y.tps)).flat(1);
        this.setState({min:Math.min.apply(Math, tps)});
        this.setState({max:Math.max.apply(Math, tps)});
    }
    
    async buildDatasets(interval){
        let data = await globalApi.getAllTPS(globalApi.toLongName(interval), 'Mainnet', true);
        let datasets = data.filter(x => x.length > 0).map(this.buildDataPoint);
        //this.setMinAndMax(data);
        this.setState({xData: data[0].map(x => x.date)});
        this.setState({datasets: datasets});
        this.setState({loadingPercentage: 0});
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({scale: this.transformScale(nextProps.scale)});
        if (this.state.interval !== nextProps.interval){
            this.setState({interval: nextProps.interval});
            await this.buildDatasets(nextProps.interval);
        }
    }

    render(){
        return <>
        <Line data={{
                labels: this.state.xData,
                datasets: this.state.datasets
              }}
              height={400}
              options={{
                maintainAspectRatio: false,
                plugins:{
                    legend:{
                        position: 'bottom',
                        display: true
                    }
                },
                scales: {
                    x: {
                      ticks: {
                        display: false,
                        callback: function(value, index, values) {
                            return value;
                        }
                      },
                    grid: {
                            display:false
                        }
                    },
                    y: {
                        type: this.state.scale,
                        ticks: {
                            min: this.state.min, //minimum tick
                            max: this.state.max, //maximum tick
                            callback: function (value, index, values) {
                                return Number(value.toString());//pass tick values as a string into Number function
                            }
                       },
                       grid: {
                            display:false
                        }
                    }
                  }
              }}/>
        </>;
    }
}    

export default StackedLineChart;