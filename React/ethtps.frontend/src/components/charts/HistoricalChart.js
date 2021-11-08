import * as React from "react";
import { TPSApi, GPSApi } from "../../services/api-gen/src";
import IntervalSelector from "./IntervalSelector";
import InfoTypeSelector from './InfoTypeSelector';
import ScaleSelector from './ScaleSelector';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Line } from "react-chartjs-2";

export default class HistoricalChart extends React.Component {

    constructor(props){
        super(props);
    }

    data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Second dataset",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#742774"
          }
        ]
      };

     render(){
        return (
            <div>
                <div style={{float:"right"}}>
                    <IntervalSelector/>
                </div>
            <div>
                <Line height={100} data={this.data} />
            </div>
           <InfoTypeSelector/>
            <div style={{float:"right"}}>
                <ScaleSelector/>
            </div>
            </div>
          );
     }
}