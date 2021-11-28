import React, {setState} from 'react';
import HorizontalBarChart from '../HorizontalBarChart';
import { globalInstantDataService, formatModeName, capitalizeFirstLetter } from '../../services/common';
import { allInstantData, colorDictionary, providerData } from '../../services/defaultData';
import ModeSelector from './MainPage/ModeSelector';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default class TimeWarpPage extends React.Component{
    constructor(props){
        super(props);

        let mode = 'tps';
        this.state = {
            data: allInstantData[mode],
            backgroundColors: [],
            colorDictionary: colorDictionary,
            providerData: providerData,
            mode: mode,
            offline: false
        }
    }

    componentDidMount(){
        globalInstantDataService.periodicallyGetInstantDataForPage('TimeWarpPage', this.updateInstantTPS.bind(this));
    }

    modeChanged(mode){
        this.setState({mode: mode});
        globalInstantDataService.getAndCallbackInstantData();
      }

    updateInstantTPS(data){
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

      marks = [
        {
          value: 1,
          label: '1 min/s',
        },
        {
          value: 25,
          label: '1 h/s',
        },
        {
            value: 50,
            label: '1 d/s',
        },
        {
            value: 75,
            label: '1 w/s',
        },
        {
            value: 100,
            label: '1 m/s',
        },
      ];
      
      valuetext(value) {
        return `${value}min/s`;
      }
      
      valueLabelFormat(value) {
        return this.marks.findIndex((mark) => mark.value === value) + 1;
      }

    render(){
        return <>
            <div style={{display:'inline-block'}}>
                <h2 style={{display:'inline'}}>
                    {capitalizeFirstLetter(formatModeName(this.state.mode))} time warp
                </h2>
            </div>
            <ModeSelector defaultMode={this.state.mode} onChange={this.modeChanged.bind(this)}/>
            <Box>
                <Slider
                    aria-label="Temperature"
                    defaultValue={100}
                    valueLabelDisplay="auto"
                    min={10}
                    max={100}
                />
            </Box>
            <HorizontalBarChart 
                data={this.state.data} 
                colorDictionary={this.state.colorDictionary} 
                providerData={this.state.providerData}
                mode={this.state.mode}/>
            <h5>
                Speed
            </h5>
            <Slider
                aria-label="Restricted values"
                defaultValue={1}
                valueLabelFormat={this.valueLabelFormat.bind(this)}
                getAriaValueText={this.valuetext.bind(this)}
                step={null}
                valueLabelDisplay="auto"
                marks={this.marks}
                max={100}
            />
        </>;
    }
}