import 'fix-date';
import * as React from "react";
import { globalGPSApi, globalTPSApi, globalGasAdjustedTPSApi, globalGeneralApi } from '../../services/common'
import IntervalSelector from "./IntervalSelector";
import InfoTypeSelector from './InfoTypeSelector';
import ScaleSelector from './ScaleSelector';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Line } from "react-chartjs-2";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

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
          ],
          allIntervals: [],
          years: [],
          selectedYear: 0,
          loading: true
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
        case '1y':
          return 'OneYear';
        case 'All':
          return 'All';
        default:
          return 'OneMonth';
      }
    }

    reverseTransformIntervalName(interval){
      switch(interval){
        case 'OneHour':
          return '1h';
        case 'OneDay':
          return '1d';
        case 'OneWeek':
          return '1w';
        case 'OneMonth':
          return '1m';
        case 'OneYear':
          return '1y';
        case 'All':
          return 'All';
        default:
          return 'OneMonth';
      }
    }

    componentDidMount(){
      this.updateChart(this.state);
      if (this.state.provider !== "All"){
        globalGeneralApi.aPIV2GetIntervalsWithDataGet({provider: this.state.provider}, (err,data,res) => {
          if (data != null){
            this.setState({allIntervals: data.map(this.reverseTransformIntervalName)});
          }
        });
        globalGeneralApi.aPIV2GetUniqueDataYearsGet({provider: this.state.provider, network: this.state.network}, (err, data, res) => {
          if (data != null){
            if (data.length > 1){
              this.setState({years: data});
            }
          }
        });
      } 
    }

    updateChart(state){
      this.updateChartFromModel(state.provider, state.interval, state.selectedYear, state.network, state.mode);
    }

    updateChartFromModel(provider, interval, year, network, mode){
      try{
        this.setState({loading: true});
        switch(mode){
          case 'tps':
              if (year !== 0){
                globalTPSApi.aPITPSGeMonthlyDataByYearGet({provider: provider, year: year, network: network}, (err, data, res)=>{
                  if (data !== null){
                    this.buildDatasets(data);
                  }
                });
              }
              else{
                globalTPSApi.aPITPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
                  if (data !== null){
                    this.buildDatasets(data);
                  }
                });
              }
            break;
          case 'gps':
            if (year !== 0){
              globalGPSApi.aPIGPSGeMonthlyDataByYearGet({provider: provider, year: year, network: network}, (err, data, res)=>{
                if (data !== null){
                  this.buildDatasets(data);
                }
              });
            }
            else{
              globalGPSApi.aPIGPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
                if (data !== null){
                  this.buildDatasets(data);
                }
              });
            }
            break;
          case 'gasAdjustedTPS':
            if (year !== 0){
              globalGasAdjustedTPSApi.aPIGasAdjustedTPSGeMonthlyDataByYearGet({provider: provider, year: year, network: network}, (err, data, res)=>{
                if (data !== null){
                  this.buildDatasets(data);
                }
              });
            }
            else{
              globalGasAdjustedTPSApi.aPIGasAdjustedTPSGetGet({provider: provider, interval: this.transformIntervalName(interval), network: network}, (err,data,res)=>{
                if (data !== null){
                  this.buildDatasets(data);
                }
              });
            }
            break;
        }
      }
      catch(e){
        console.log(e);
      }
    }

    createDataPoint(x){
      return {
        x: x.data[0].date,
        y: x.data[0].value
      }
    }

    monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    extractLabel(x){
     try{
      if (this.state.selectedYear !== 0){
        return this.monthNames[x.getMonth()].substr(0, 3) + " " + x.getFullYear();
      }
      switch(this.state.interval){
        case '1h':
          return x.getHours() + ":" + ((x.getMinutes() < 10)?("0" + x.getMinutes()): x.getMinutes());
        case '1d':
            return x.getHours() + ":00";
        case '1w':
            return x.getHours() + ":00";
        case '1w':
            return this.monthNames[x.getMonth()].substr(0, 3) + " " + (x.getDate()) + " " + x.getHours() + ":00";
        case '1m':
            return this.monthNames[x.getMonth()].substr(0, 3) + " " + (x.getDate());
        case '1y':
            return this.monthNames[x.getMonth()].substr(0, 3)+ " " + x.getFullYear();
        case 'All':
            return this.monthNames[x.getMonth()].substr(0, 3) + " " + x.getFullYear();
        default:
          return x;
      }
     }
     catch{
       return "";
     }
    }

    buildDatasets(data){
      if (data === null)
        return;
      
      let maxLength = Math.max(...Object.keys(data).map(key => data[key].length));
      let labels = [];
      let datasets = [];
      for(let key of Object.keys(data)){
        let d = data[key];
        if (d.length < maxLength){
          let dLength = maxLength - d.length;
          for (let i = 0; i < dLength; i++){
            d = [{
              data: [{
                date: new Date(),
                value: 0
              }
              ]
            }, ...d]
          }
        }
        let l = d.map(x => this.extractLabel(x.data[0].date));
        if (l.length > labels.length){
          labels = l;
        }
        datasets.push({
          label: key,
          data: d.map(x => x.data[0].value),
          borderColor: this.state.colorDictionary[key],
          backgroundColor: this.state.colorDictionary[key] + "11",
          fill:Object.keys(data).length <= 1,
          showLine:true,
          pointHitRadius: 20
        });
      }
      this.setState({datasets: datasets});
      this.setState({labels: labels});
      this.setState({loading: false});
    }

    onInfoTypeChanged(mode){
      this.setState({mode: mode});
      this.updateChartFromModel(this.state.provider, this.state.interval, this.state.selectedYear, this.state.network, mode);
    }

    onScaleChanged(scale){
      this.setState({scale: scale});
    }

    onIntervalChanged(interval){
      this.setState({interval: interval});
      this.setState({selectedYear: 0});
      this.updateChartFromModel(this.state.provider, interval, 0, this.state.network, this.state.mode);
    }

    onYearChanged(year){
      this.setState({selectedYear: year});
      this.updateChartFromModel(this.state.provider, "", year, this.state.network, this.state.mode);
    }

    numberFormat = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3
    });

     render(){
       let linearProgress = <></>;
       if (this.state.loading){
         linearProgress = <LinearProgress />;
       }
        return (
            <div>
                <div>
                    <IntervalSelector 
                      allIntervals={this.state.allIntervals} 
                      interval={this.state.interval} 
                      onChange={this.onIntervalChanged.bind(this)}
                      onYearChange={this.onYearChanged.bind(this)}
                      years={this.state.years}/>
                </div>
            <div>
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
                        display: true
                      },
                      grid:{
                        display: true
                      }
                    },
                    y:{
                      stacked:true,
                      type: this.transformScaleName(this.state.scale),
                      ticks: {
                        callback: function (value) {
                            return this.numberFormat.format(value);
                        }.bind(this)
                      }
                    }
                  }
                }}/>
                {linearProgress}
                </div>
            </div>
              <InfoTypeSelector mode={this.state.mode} onChange={this.onInfoTypeChanged.bind(this)}/>
            <div style={{float:"right"}}>
              <ScaleSelector scale={this.state.scale} onChange={this.onScaleChanged.bind(this)}/>
            </div>
            </div>
          );
     }
}