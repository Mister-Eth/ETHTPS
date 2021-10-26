import * as React from 'react';
import IntervalSelector from './IntervalSelector';
import ScaleSelector from './ScaleSelector';
import StackedLineChart from './StackedLineChart';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../services/theme';

class TPSChart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            scale: "LOG",
            interval: "1w"
        }
    }

    onScaleChanged = event => {
        this.setState({scale: event.target.textContent});
    }

    onIntervalChanged = event => {
        this.setState({interval: event.target.textContent});
    }

    render(){
        return <>
        <ThemeProvider theme={theme}>
                <div className={"flex-right"}>
                    <IntervalSelector onIntervalChanged={(e) => { this.onIntervalChanged(e) }}></IntervalSelector>
                </div>
                <div>
                    <StackedLineChart scale={this.state.scale} interval={this.state.interval}></StackedLineChart>
                </div>
                <div className={"flex-right"}>
                    <ScaleSelector onScaleChanged={(e) => { this.onScaleChanged(e) }}></ScaleSelector>
                </div>
        </ThemeProvider>
        </>;
    }
}    

export default TPSChart;