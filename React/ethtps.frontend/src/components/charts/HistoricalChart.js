import * as React from "react";
import { globalGPSApi, globalTPSApi, globalGasAdjustedTPSApi } from '../../services/common'
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
          mode: props.mode,
          scale: props.scale,
          data:[],
          labels: [],
          network: props.network,
          provider: props.provider,
          color: '#0',
          backgroundColor: '#0',
          colorDictionary: props.colorDictionary,
          datasets: [
            {
              label: "",
              data: [],
              fill: true,
              pointHitRadius: 20
            }
          ]
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

    componentDidUpdate(previousProps, previousState){
      if (previousProps.interval !== this.props.interval){      
          this.onIntervalChanged(this.props.interval);
      }
      if (previousProps.mode !== this.props.mode){     
          this.onInfoTypeChanged(this.props.mode);
      }
      if (previousProps.scale !== this.props.scale){      
          this.setState({scale: this.props.scale})
      }
      if (previousProps.network !== this.props.network){      
          this.setState({network: this.props.network})
      }
      if (previousProps.provider !== this.props.provider){      
          this.setState({provider: this.props.provider})
      }
      if (previousProps.colorDictionary !== this.props.colorDictionary){      
          this.setState({colorDictionary: this.props.colorDictionary})
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
    }

    updateChart(state){
      this.updateChartFromModel(state.provider, state.interval, state.network, state.mode);
    }

    updateChartFromModel(provider, interval, network, mode){
      console.log(mode)
      switch(mode){
        case 'tps':
            globalTPSApi.aPITPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
              this.buildDatasets(data);
            });
          break;
        case 'gps':
          globalGPSApi.aPIGPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
            this.buildDatasets(data);
          });
          break;
        case 'gasAdjustedTPS':
          globalGasAdjustedTPSApi.aPIGasAdjustedTPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
            this.buildDatasets(data);
          });
          break;
      }
    }

    createDataPoint(x){
      return {
        x: x.data[0].date,
        y: x.data[0].value
      }
    }

    buildDatasets(data){
      let labels = [];
      let datasets = [];
      for(let key of Object.keys(data)){
        let d = data[key];
        let l = d.map(x => x.data[0].date);
        if (l.length > labels.length){
          labels = l;
        }
        datasets.push({
          label: key,
          data: d.map(x => x.data[0].value),
          borderColor: this.state.colorDictionary[key],
          backgroundColor: this.state.colorDictionary[key] + "33",
          fill:true,
          showLine:true,
          pointHitRadius: 20
        });
      }
      this.setState({datasets: datasets});
      this.setState({labels: labels});
    }

    onInfoTypeChanged(mode){
      this.setState({mode: mode});
      this.updateChartFromModel(this.state.provider, this.state.interval, this.state.network, mode);
    }

    onScaleChanged(scale){
      this.setState({scale: scale});
    }

    onIntervalChanged(interval){
      this.setState({interval: interval});
      this.updateChartFromModel(this.state.provider, interval, this.state.network, this.state.mode);
    }

     render(){
        return (
            <div>
                <div style={{float:"right"}}>
                    <IntervalSelector interval={this.state.interval} onChange={this.onIntervalChanged.bind(this)}/>
                </div>
            <div>
                <Line height={this.props.height} data={{
                  labels: this.state.labels,
                  datasets: this.state.datasets
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
                    },
                    point:{
                      radius: 0
                    }
                  },
                  scales:{
                    x:{
                      ticks:{
                        display: false
                      },
                      grid:{
                        display: false
                      }
                    },
                    y:{
                      type: this.transformScaleName(this.state.scale)
                    }
                  }
                }}/>
            </div>
           <InfoTypeSelector mode={this.state.mode} onChange={this.onInfoTypeChanged.bind(this)}/>
            <div style={{float:"right"}}>
                <ScaleSelector scale={this.state.scale} onChange={this.onScaleChanged.bind(this)}/>
            </div>
            </div>
          );
     }
}