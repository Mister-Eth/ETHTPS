import * as React from "react";
import { globalGPSApi, globalTPSApi, globalGeneralApi } from '../../services/common'
import IntervalSelector from "./IntervalSelector";
import InfoTypeSelector from './InfoTypeSelector';
import ScaleSelector from './ScaleSelector';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Line } from "react-chartjs-2";

export default class HistoricalChart extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
          interval: props.interval,
          infoType: props.infoType,
          scale: props.scale,
          data:[],
          labels: [],
          network: props.network,
          provider: props.provider,
          color: '#0',
          backgroundColor: '#0'
        }
    }

    transformScaleName(scale){
      if (scale === "lin"){
        return 'linear';
      }
      else{
        return 'logarithmic';
      }
    }

    transformIntervalName(interval){
      switch(interval){
        case '1h':
          return 'OneHour';
        case '1d':
          return 'OneDay';
        case '1w':
          return 'OneWeek';
        case '1m':
          return 'OneMonth';
        default:
          return 'OneMonth';
      }
    }

    componentDidMount(){
      this.updateChart(this.state);
      globalGeneralApi.aPIV2ColorDictionaryGet((err,data,res)=>{
        this.setState({color: data[this.state.provider]})
        this.setState({backgroundColor: data[this.state.provider] + '33'})
      });
    }

    updateChart(state){
      this.updateChartFromModel(state.provider, state.interval, state.network, state.infoType);
    }

    updateChartFromModel(provider, interval, network, infoType){
      switch(infoType){
        case 'tps':
            globalTPSApi.aPITPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
              let d = data[provider];
              this.setState({labels: d.map(x => x.data[0].date)});
              this.setState({data: d.map(x => x.data[0].tps)});
            });
          break;
        case 'gps':
          globalGPSApi.aPIGPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
            let d = data[provider];
            this.setState({labels: d.map(x => x.data[0].date)});
            this.setState({data: d.map(x => x.data[0].gps)});
          });
          break;
      }
    }

    onInfoTypeChanged(infoType){
      this.setState({infoType: infoType});
      this.updateChartFromModel(this.state.provider, this.state.interval, this.state.network, infoType);
    }

    onScaleChanged(scale){
      this.setState({scale: scale});
    }

    onIntervalChanged(interval){
      this.setState({interval: interval});
      this.updateChartFromModel(this.state.provider, interval, this.state.network, this.state.infoType);
    }

     render(){
        return (
            <div>
                <div style={{float:"right"}}>
                    <IntervalSelector interval={this.state.interval} onChange={this.onIntervalChanged.bind(this)}/>
                </div>
            <div>
                <Line height={150} data={{
                  labels: this.state.labels,
                  datasets: [
                    {
                      label: this.state.infoType.toUpperCase(),
                      data: this.state.data,
                      fill: true,
                      backgroundColor: this.state.backgroundColor,
                      borderColor: this.state.color
                    }
                  ]
                }} 
                options={{
                  plugins:{
                    legend:{
                      display: false
                    }
                  },
                  elements:{
                    line:{
                      tension: 0.3
                    }
                  },
                  scales:{
                    x:{
                      ticks:{
                        display: false
                      }
                    },
                    y:{
                      type: this.transformScaleName(this.state.scale)
                    }
                  }
                }}/>
            </div>
           <InfoTypeSelector infoType={this.state.infoType} onChange={this.onInfoTypeChanged.bind(this)}/>
            <div style={{float:"right"}}>
                <ScaleSelector scale={this.state.scale} onChange={this.onScaleChanged.bind(this)}/>
            </div>
            </div>
          );
     }
}