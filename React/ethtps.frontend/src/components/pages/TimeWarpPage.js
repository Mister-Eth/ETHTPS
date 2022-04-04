import React, {setState} from 'react';
import HorizontalBarChart from '../HorizontalBarChart';
import { globalInstantDataService, formatModeName, capitalizeFirstLetter, globalTimeWarpApi, isEmpty } from '../../services/common';
import { allInstantData, colorDictionary, providerData } from '../../services/defaultData';
import ModeSelector from './MainPage/ModeSelector';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';
import IntervalSlider from '../IntervalSlider';
import Slider from '@mui/material/Slider';
import CompactHeader from '../Headers/CompactHeader';

export default class TimeWarpPage extends React.Component{
    constructor(props){
        super(props);

        let mode = 'tps';
        let now = (new Date()).getTime();
        this.state = {
            data: allInstantData[mode],
            backgroundColors: [],
            colorDictionary: colorDictionary,
            providerData: providerData,
            mode: mode,
            offline: false,
            minTimestamp: 0,
            maxTimestamp: now,
            currentTimestamp: now,
            smoothing: "Instant",
            bufferSize: 10
        }
    }

    componentDidMount(){
        globalInstantDataService.periodicallyGetInstantDataForPage('TimeWarpPage', this.updateInstantTPS.bind(this));
        globalTimeWarpApi.aPITimeWarpGetEarliestDateGet((err, data, res) => {
          if (data !== null){
            let ts = data.getTime();
            if (ts > this.state.currentTimestamp){
              ts = this.state.maxTimestamp;
            }
            this.setState({minTimestamp: ts});
          }
        });
    }

    modeChanged(mode){
        this.setState({mode: mode});
        globalInstantDataService.getAndCallbackInstantData();
      }

    updateInstantTPS(data){
        if (this.state.currentTimestamp !== this.state.maxTimestamp)
          return;

        try{
          this.setState({data: data[this.state.mode]});
        if (this.state.offline){
          this.setState({offline: false});
        }
      }
      catch (e){
        if (!this.state.offline){
          this.setState({offline: true});
        }
        console.log(e)
      }
      }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.data !== this.props.data){
          this.setState({data: this.props.data})
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary){
          this.setState({colorDictionary: this.props.colorDictionary});
        }
        if (previousProps.excludeSidechains !== this.props.excludeSidechains){
          this.setState({excludeSidechains: this.props.excludeSidechains});
        }
        if (previousProps.providerData !== this.props.providerData){
          this.setState({providerData: this.props.providerData});
        }
        if (previousProps.mode !== this.props.mode){
          this.setState({mode: this.props.mode});
        }
      }

      lastTimestampChangeTime = new Date();
      timestampChangeDeltaMs = 500;
      selectedTimestamp = 0;
      timstampChanged(event, d){
        if (this.selectedTimestamp === d)
          return;

        this.selectedTimestamp = d;
        let currentDate = new Date();
        if (currentDate.getTime() - this.lastTimestampChangeTime.getTime() >= this.timestampChangeDeltaMs) { //Only update date if user stops moving the bar for 500ms
          this.updateTimestampAndRefreshChart(d);
          this.lastTimestampChangeTime = currentDate;
        }
      }

      timestampChangeCommitted(){
        if (this.selectedTimestamp !== 0 && this.selectedTimestamp === this.state.maxTimestamp)
          return;
          
        this.updateTimestampAndRefreshChart(this.selectedTimestamp);
      }

      updateTimestampAndRefreshChart() { this.updateTimestampAndRefreshChart(this.state.currentTimestamp); }
      updateTimestampAndRefreshChart(timestamp){
        this.setState({currentTimestamp: timestamp});
        let method = globalTimeWarpApi.aPITimeWarpGetTPSAtGet;
        switch(this.state.mode){
          case 'gps':
              method = globalTimeWarpApi.aPITimeWarpGetGPSAtGet;
            break;
          case 'gasAdjustedTPS':
              method = globalTimeWarpApi.aPITimeWarpGetGasAdjustedTPSAtGet;
            break;
        }

        method.bind(globalTimeWarpApi)({
          smoothing: this.state.smoothing,
          network: this.state.network,
          timestamp: timestamp,
          count: this.state.bufferSize
        }, (err, data, res) => {
          if (data !== null){
            this.setState({data: data});
          }
        });
      }

    speedSliderChanged(value){
      this.setState({smoothing: value});
      this.updateTimestampAndRefreshChart();
    }

    render(){
        return <>
        <CompactHeader/>
            <Helmet>
                <title>
                    ETHTPS.info - Time warp
                </title>
            </Helmet>
            <div style={{display:'inline-block'}}>
                <h2 style={{display:'inline'}}>
                    {capitalizeFirstLetter(formatModeName(this.state.mode))} time warp ({this.state.minTimestamp} &gt;= {this.state.currentTimestamp} &lt;= {this.state.maxTimestamp})
                </h2>
            </div>
            <ModeSelector defaultMode={this.state.mode} onChange={this.modeChanged.bind(this)}/>
              <center>
            <Box style={{width: '90%'}}>
                    <Slider
                    aria-label="Timestamp"
                    defaultValue={this.state.maxTimestamp}
                    min={this.state.minTimestamp}
                    max={this.state.maxTimestamp}
                    onChange={this.timstampChanged.bind(this)}
                    onChangeCommitted={this.timestampChangeCommitted.bind(this)}
                />
            </Box>
              </center>
            <HorizontalBarChart 
                height={350}
                data={this.state.data} 
                colorDictionary={this.state.colorDictionary} 
                providerData={this.state.providerData}
                mode={this.state.mode}/>
            <h5>
                Speed
            </h5>
            <center>
               <IntervalSlider isTimeWarp={true} onChange={this.speedSliderChanged.bind(this)}/>
            </center>
            <p>
                This is an experimental feature. How did you even get here?
            </p>
        </>;
    }
}