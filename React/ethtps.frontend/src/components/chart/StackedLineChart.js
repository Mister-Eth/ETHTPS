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
            scale: props.scale,
            interval: props.interval,
            loadingPercentage: 10,
            datasets: [],
            xData: []
        }
        this.buildDatasets(props.interval);
    }

    buildDataPoint(x){
        return {
            label: x[0].provider,
            fill: true,
            backgroundColor: x[0].color,
            pointBackgroundColor: "#ffffff",
            pointHighlightStroke: x[0].color,
            borderCapStyle: 'butt',
            data: x.map(y => y.tps)
        }
    }
    
    async buildDatasets(interval){
        let data = await globalApi.getAllTPS(globalApi.toLongName(interval), 'Mainnet', true);
        console.log(data);
        let datasets = data.filter(x => x.length > 0).map(this.buildDataPoint);
        this.setState({xData: data[0].map(x => x.date)});
        this.setState({datasets: datasets});
        this.setState({loadingPercentage: 0});
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({scale: nextProps.scale});
        this.setState({interval: nextProps.interval});
        await this.buildDatasets(nextProps.interval);
    }

    render(){
        return <>
        <Line data={{
                labels: this.state.xData,
                datasets: this.state.datasets
              }}
              options={{
                
              }}/>
        </>;
    }
}    

export default StackedLineChart;