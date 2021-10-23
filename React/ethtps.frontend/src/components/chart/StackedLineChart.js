import * as React from 'react';
import IntervalSelector from './IntervalSelector';
import ScaleSelector from './ScaleSelector';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../services/theme';
import { Line } from "react-chartjs-2";

class StackedLineChart extends React.Component {
    constructor(props){
        super(props);
    }

    colors = {
        green: {
          fill: '#e0eadf',
          stroke: '#5eb84d',
        },
        lightBlue: {
          stroke: '#6fccdd',
        },
        darkBlue: {
          fill: '#92bed2',
          stroke: '#3282bf',
        },
        purple: {
          fill: '#8fa8c8',
          stroke: '#75539e',
        },
      };

    loggedIn = [26, 36, 42, 38, 40, 30, 12];
    available = [34, 44, 33, 24, 25, 28, 25];
    availableForExisting = [16, 13, 25, 33, 40, 33, 45];
    unavailable = [5, 9, 10, 9, 18, 19, 20];
    xData = [13, 14, 15, 16, 17, 18, 19];

    render(){
        return <>
        <Line data={{
    labels: this.xData,
    datasets: [{
        label: "Unavailable",
        fill: true,
        backgroundColor: this.colors.purple.fill,
        pointBackgroundColor: this.colors.purple.stroke,
        borderColor: this.colors.purple.stroke,
        pointHighlightStroke: this.colors.purple.stroke,
        borderCapStyle: 'butt',
        data: this.unavailable,
  
      }, {
        label: "Available for Existing",
        fill: true,
        backgroundColor: this.colors.darkBlue.fill,
        pointBackgroundColor: this.colors.darkBlue.stroke,
        borderColor: this.colors.darkBlue.stroke,
        pointHighlightStroke: this.colors.darkBlue.stroke,
        borderCapStyle: 'butt',
        data: this.availableForExisting,
      }, {
        label: "Available",
        fill: true,
        backgroundColor: this.colors.green.fill,
        pointBackgroundColor: this.colors.lightBlue.stroke,
        borderColor: this.colors.lightBlue.stroke,
        pointHighlightStroke: this.colors.lightBlue.stroke,
        borderCapStyle: 'butt',
        data: this.available,
      }, {
        label: "Logged In",
        fill: true,
        backgroundColor: this.colors.green.fill,
        pointBackgroundColor: this.colors.green.stroke,
        borderColor: this.colors.green.stroke,
        pointHighlightStroke: this.colors.green.stroke,
        data: this.loggedIn,
      }]}}
    options={{
        
    }}
/>
        </>;
    }
}    

export default StackedLineChart;