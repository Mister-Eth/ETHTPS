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
    }

    onScaleChanged = event => {
        console.log(event.target.textContent);
    }

    onIntervalChanged = event => {
        console.log(event.target.textContent);
    }

    render(){
        return <>
        <ThemeProvider theme={theme}>
           <Container>
                <div class="flex-right">
                    <IntervalSelector onIntervalChanged={(e) => { this.onIntervalChanged(e) }}></IntervalSelector>
                </div>
                <div class="min-300">
                    <StackedLineChart></StackedLineChart>
                </div>
                <div class="flex-right">
                    <ScaleSelector onScaleChanged={(e) => { this.onScaleChanged(e) }}></ScaleSelector>
                </div>
           </Container>
        </ThemeProvider>
        </>;
    }
}    

export default TPSChart;